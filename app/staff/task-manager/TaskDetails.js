"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import { 
  X, 
  Trash2, 
  Calendar, 
  Clock, 
  Flag, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Save,
  FileText
} from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function TaskDetailModal({ task, onClose, onUpdated }) {
  const editorRef = useRef(null);
  const editorHolder = useRef(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* ---------- LOCAL STATE ---------- */
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [startDate, setStartDate] = useState(task.start_date_time);
  const [dueDate, setDueDate] = useState(task.due_date_time);
  const [isActive, setIsActive] = useState(task.is_active);

  /* ---------- INIT EDITOR ---------- */
  useEffect(() => {
    if (!editorHolder.current) return;

    editorRef.current = new EditorJS({
      holder: editorHolder.current,
      placeholder: "Add task description, notes, and details...",
      data: task.description || { blocks: [] },
      inlineToolbar: true,
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        quote: Quote,
        warning: Warning,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        table: Table,
        code: CodeTool,
        marker: Marker,
        underline: Underline,
      },
    });

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [task.id]);

  /* ---------- UPDATE TASK ---------- */
  const handleSave = async () => {
    try {
      setSaving(true);
      const description = await editorRef.current.save();

      const res = await authFetch(`employee-task-viewset/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          priority,
          status,
          start_date_time: startDate,
          due_date_time: dueDate,
          is_active: isActive,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- DELETE TASK ---------- */
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task? This action cannot be undone.")) return;

    try {
      setDeleting(true);
      const res = await authFetch(`employee-task-viewset/${task.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-zinc-950 to-gray-950 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold w-full bg-transparent text-white placeholder-blue-200 border-none focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg px-3 py-2 -ml-3"
                placeholder="Task title..."
              />
              <div className="flex items-center gap-3 mt-3 ml-1">
                <StatusBadgeInline status={status} />
                <PriorityBadgeInline priority={priority} />
                <AssignedBadge priority={`${task.assigned_by?.first_name} ${task.assigned_by?.last_name}`} />
              </div>
            </div>
            <button 
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* BODY - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* META SECTION */}
          <div className="bg-gradient-to-br from-gray-50 to-zinc-50 rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
              <FileText size={16} />
              Task Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Priority */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Flag size={16} className="text-gray-500" />
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle2 size={16} className="text-gray-500" />
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all font-medium"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in_progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              {/* Active Toggle */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <AlertCircle size={16} className="text-gray-500" />
                  Task State
                </label>
                <label className="flex items-center gap-3 w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white cursor-pointer hover:border-blue-500 transition-all">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-5 h-5 text-gray-600 rounded focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="font-medium text-gray-700">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* DATES SECTION */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
              <Calendar size={16} />
              Timeline
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Clock size={16} className="text-gray-500" />
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={toInputDate(startDate)}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all font-medium"
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <AlertCircle size={16} className="text-gray-500" />
                  Due Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={toInputDate(dueDate)}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all font-medium"
                />
              </div>
            </div>

            {/* Time Difference Display */}
            <div className="bg-white/50 rounded-lg p-3 border-l-4 border-gray-400">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Duration:</span> {calculateDuration(startDate, dueDate)}
              </p>
            </div>
          </div>

          {/* EDITOR SECTION */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
              <FileText size={16} />
              Description & Notes
            </h3>
            <div
              ref={editorHolder}
              className="border-2 border-gray-200 rounded-xl p-6 bg-white min-h-[350px] focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200 transition-all"
            />
          </div>
        </div>

        {/* FOOTER - Fixed */}
        <div className="border-t-2 border-gray-100 bg-gray-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Delete Task
                </>
              )}
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-zinc-950 to-gray-950 text-white rounded-lg font-semibold hover:from-zinc-900 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STATUS BADGE (Header) ---------- */
function StatusBadgeInline({ status }) {
  const getStyle = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-100 border-green-300/30";
      case "in_progress":
      case "in progress":
        return "bg-yellow-500/20 text-yellow-100 border-yellow-300/30";
      case "pending":
        return "bg-red-500/20 text-red-100 border-red-300/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getStyle()}`}>
      {status || "Pending"}
    </span>
  );
}

/* ---------- PRIORITY BADGE (Header) ---------- */
function PriorityBadgeInline({ priority }) {
  const getStyle = () => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-100 border-red-300/30";
      case "medium":
        return "bg-amber-500/20 text-amber-100 border-amber-300/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-100 border-emerald-300/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getStyle()}`}>
      {priority || "Medium"} Priority
    </span>
  );
}
function AssignedBadge({ priority }) {
  const getStyle = () => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-100 border-red-300/30";
      case "medium":
        return "bg-amber-500/20 text-amber-100 border-amber-300/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-100 border-emerald-300/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getStyle()}`}>
      {priority}
    </span>
  );
}

/* ---------- HELPERS ---------- */
function toInputDate(date) {
  return new Date(date).toISOString().slice(0, 16);
}

function calculateDuration(start, end) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const diff = endTime - startTime;
  
  if (diff < 0) return "Invalid duration";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''}`;
}