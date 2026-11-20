"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { hasPermission } from "@/app/lib/checkPermission";
import Toast from "@/components/Toast";

const PERF = "Performance Score";
const OTHER = "__other__";
const INTERNAL_NAMES = ["Mid Term", "Simulation", "Viva", "Presentation", "Assignment", "Case Study", PERF];
const EPS = 0.001;

export default function CreateComponents() {
    const router = useRouter();
    const subID = useSearchParams().get("subID");
    const hasadd = hasPermission("b22e5de9bd04a4792a9c285e08ee07a9d66ac8129ab7fdc9d789e9174e647506");

    const [mapping, setMapping] = useState(null);
    const [existing, setExisting] = useState([]);
    const [mode, setMode] = useState(null); // "INTERNAL" | "EXTERNAL"
    const [rows, setRows] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const notify = (text, ms = 4000) => {
        setMessage(text);
        setShowToast(true);
        setTimeout(() => setShowToast(false), ms);
    };

    const load = async () => {
        const [mRes, cRes] = await Promise.all([
            authFetch(`subject-mapping-viewset/${subID}`),
            authFetch(`component-subject-wise/${subID}`),
        ]);
        const m = await mRes.json();
        const c = await cRes.json();
        setMapping(m.data);
        setExisting(Array.isArray(c.data) ? c.data : []);
    };

    useEffect(() => {
        if (!hasadd) { router.replace("/unauthorized"); return; }
        if (subID) load();
    }, [subID]);

    if (!hasadd) return null;
    if (!subID) return <p className="p-10 text-red-700">Open this page from a subject's details page.</p>;
    if (!mapping) return <p className="p-10">Loading...</p>;

    const weightage = {
        INTERNAL: Number(mapping.weightage_internal) || 0,
        EXTERNAL: Number(mapping.weightage_external) || 0,
    };
    const existingTotal = (t) =>
        existing.filter((c) => c.type === t).reduce((s, c) => s + Number(c.max_marks), 0);

    const limit = mode ? weightage[mode] : 0;
    const rowName = (r) => (r.select === OTHER ? r.custom.trim() : r.select);
    const rowsTotal = rows.reduce((s, r) => s + (Number(r.max_marks) || 0), 0);
    const total = mode ? existingTotal(mode) + rowsTotal : 0;
    const remaining = limit - total;
    const existingNames = existing.map((c) => c.name.toLowerCase());

    const availableNames = (row) =>
        INTERNAL_NAMES.filter(
            (n) =>
                n === row.select ||
                (!existingNames.includes(n.toLowerCase()) && !rows.some((r) => r.select === n))
        );

    const rowError = (r) => {
        const n = rowName(r);
        if (!n) return "Choose or type a name";
        if (!(Number(r.max_marks) > 0)) return "Enter marks";
        if (r.select === OTHER) {
            const lower = n.toLowerCase();
            if (existingNames.includes(lower)) return "Name already exists";
            if (rows.some((o) => o.key !== r.key && rowName(o).toLowerCase() === lower)) return "Duplicate name";
            if (lower === "performance score" || lower === "final") return "Reserved name";
        }
        return "";
    };

    const addRow = () =>
        setRows((p) => [...p, { key: Date.now() + Math.random(), select: "", custom: "", max_marks: "", has_sub: false }]);
    const updateRow = (key, patch) => setRows((p) => p.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    const removeRow = (key) => setRows((p) => p.filter((r) => r.key !== key));

    const onNameChange = (row, value) => {
        if (value === PERF) updateRow(row.key, { select: value, custom: "", max_marks: "10", has_sub: false });
        else updateRow(row.key, { select: value, custom: "", max_marks: row.select === PERF ? "" : row.max_marks });
    };

    const chooseMode = (m) => {
        setMode(m);
        setRows([]);
    };

    const externalDone = existingTotal("EXTERNAL") > 0;
    const internalLeft = weightage.INTERNAL - existingTotal("INTERNAL");
    const externalLeft = weightage.EXTERNAL - existingTotal("EXTERNAL");

    const items =
        mode === "EXTERNAL"
            ? [{ key: "final", name: "Final", max_marks: externalLeft, has_sub: false }]
            : rows.map((r) => ({ key: r.key, name: rowName(r), max_marks: Number(r.max_marks), has_sub: r.has_sub }));

    const canSubmit =
        mode &&
        !submitting &&
        (mode === "EXTERNAL"
            ? !externalDone && externalLeft > 0
            : rows.length > 0 && rows.every((r) => !rowError(r)) && Math.abs(remaining) < EPS);

    const handleSubmit = async () => {
        setSubmitting(true);
        const created = [];
        const subIds = [];
        try {
            for (const it of items) {
                const res = await authFetch("component-viewset", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        subject_mapping: String(subID),
                        type: mode,
                        name: it.name,
                        max_marks: it.max_marks,
                        has_subcomponents: String(it.has_sub),
                        is_submission: "false",
                        description: it.name,
                    }),
                });
                const data = await res.json();
                if (!res.ok || data.code !== 200) {
                    throw new Error(Array.isArray(data.message) ? data.message[0] : data.message || "Failed to create component");
                }
                created.push(it.key);
                if (it.has_sub) subIds.push(data.data.id);
            }
            notify("Components created successfully", 2000);
            setTimeout(() => {
                if (subIds.length) router.replace(`/exam-components/create-subcomponent?componentId=${subIds[0]}`);
                else router.replace(`/subjects/details/${subID}`);
            }, 1500);
        } catch (e) {
            // keep only the rows that were NOT saved, and refresh what exists now
            setRows((p) => p.filter((r) => !created.includes(r.key)));
            await load();
            notify(`${e.message}${created.length ? " (earlier rows were saved)" : ""}`, 6000);
        } finally {
            setSubmitting(false);
        }
    };

    const overWeight = ["INTERNAL", "EXTERNAL"].filter((t) => existingTotal(t) > weightage[t] + EPS);

    return (
        <div className="max-w-3xl mx-auto py-10 px-3">
            {showToast && <Toast message={message} />}
            <div className="border border-gray-300 rounded-sm shadow-sm">
                <h4 className="py-4 text-center bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">
                    Create Component
                </h4>
                <div className="p-5 space-y-4">
                    {overWeight.map((t) => (
                        <p key={t} className="bg-red-50 border border-red-300 text-red-800 text-sm p-2 rounded-sm">
                            Warning: {t.toLowerCase()} components total {existingTotal(t)} but the limit is {weightage[t]}. Delete and recreate to fix.
                        </p>
                    ))}

                    <div className="flex gap-3">
                        {weightage.INTERNAL > 0 && (
                            <button type="button" onClick={() => chooseMode("INTERNAL")}
                                className={`flex-1 py-2 rounded-sm border ${mode === "INTERNAL" ? "bg-red-700 text-white" : "bg-white text-red-800 border-red-700"}`}>
                                Create Internal Component ({weightage.INTERNAL})
                            </button>
                        )}
                        {weightage.EXTERNAL > 0 && (
                            <button type="button" onClick={() => chooseMode("EXTERNAL")}
                                className={`flex-1 py-2 rounded-sm border ${mode === "EXTERNAL" ? "bg-red-700 text-white" : "bg-white text-red-800 border-red-700"}`}>
                                Create External Component ({weightage.EXTERNAL})
                            </button>
                        )}
                    </div>

                    {mode === "EXTERNAL" && (
                        <p className="text-sm">
                            {externalDone
                                ? "The external component already exists for this subject."
                                : `This will create "Final" with ${externalLeft} marks.`}
                        </p>
                    )}

                    {mode === "INTERNAL" && (
                        <>
                            <p className="text-sm font-semibold">
                                Already created: {existingTotal("INTERNAL")} | New: {rowsTotal} | Total: {total} / {limit}
                                <span className={Math.abs(remaining) < EPS ? "text-green-700" : "text-red-700"}>
                                    {" "}({Math.abs(remaining) < EPS ? "complete" : remaining > 0 ? `${remaining} left` : `${-remaining} over`})
                                </span>
                            </p>

                            {rows.map((r) => (
                                <div key={r.key} className="flex flex-wrap gap-2 items-center border p-2 rounded-sm">
                                    <select value={r.select} onChange={(e) => onNameChange(r, e.target.value)}
                                        className="border p-2 text-sm w-44">
                                        <option value="">Select name</option>
                                        {availableNames(r).map((n) => <option key={n} value={n}>{n}</option>)}
                                        <option value={OTHER}>Other...</option>
                                    </select>
                                    {r.select === OTHER && (
                                        <input type="text" value={r.custom} placeholder="Component name"
                                            onChange={(e) => updateRow(r.key, { custom: e.target.value })}
                                            className="border p-2 text-sm w-44" />
                                    )}
                                    <input type="number" min="0" step="0.5" value={r.max_marks} placeholder="Marks"
                                        disabled={r.select === PERF}
                                        onChange={(e) => updateRow(r.key, { max_marks: e.target.value })}
                                        className="border p-2 text-sm w-24 disabled:bg-gray-100" />
                                    <label className="text-sm flex items-center gap-1">
                                        <input type="checkbox" checked={r.has_sub} disabled={r.select === PERF}
                                            onChange={(e) => updateRow(r.key, { has_sub: e.target.checked })} />
                                        Has sub component
                                    </label>
                                    <button type="button" onClick={() => removeRow(r.key)} className="text-red-700 text-sm ml-auto">Remove</button>
                                    {r.select && rowError(r) && <p className="w-full text-xs text-red-600">{rowError(r)}</p>}
                                </div>
                            ))}

                            {internalLeft > EPS ? (
                                <button type="button" onClick={addRow} className="text-sm border border-gray-400 px-3 py-1 rounded-sm">
                                    + Add component
                                </button>
                            ) : (
                                <p className="text-sm text-green-700">Internal marks are already complete for this subject.</p>
                            )}
                        </>
                    )}

                    <button type="button" onClick={handleSubmit} disabled={!canSubmit}
                        className="w-full bg-red-700 py-2 text-white rounded-sm disabled:opacity-40 disabled:cursor-not-allowed">
                        {submitting ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}