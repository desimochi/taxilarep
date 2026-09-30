"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { PencilIcon, EyeIcon, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import FullWidthLoader from "./Loaader";
import Toast from "./Toast";
import AssignedSubjectFilters from "./ui/FiltersSub";

export default function AssignedSubject({ editt, url, title }) {
  const [isDel, setIsDel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkedState, setCheckedState] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);

  const [assignedSub, setAssignedSub] = useState([]);

  const [term, setTerm] = useState([]);
  const [batch, setBatch] = useState([]);
  const [course, setCourse] = useState([]);

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ---------------------------------------------
  // SELECTED FILTERS
  // These are what the dropdowns currently show
  // ---------------------------------------------

  const [selectedTerm, setselectedTerm] = useState("");
  const [selectedBatch, setselectedBatch] = useState("");
  const [selectedCourse, setselectedCourse] = useState("");

  // ---------------------------------------------
  // APPLIED FILTERS
  // These are the filters actually submitted
  // ---------------------------------------------

  const [appliedFilters, setAppliedFilters] = useState({
    batch: "",
    term: "",
    course: "",
  });

  // ---------------------------------------------
  // SEARCH
  // ---------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  // =================================================
  // FETCH BATCHES / COURSES / TERMS
  // This runs only once
  // =================================================

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [coursesResponse, batchesResponse, termsResponse] =
          await Promise.all([
            authFetch(`courses-list`),
            authFetch(`batches-list`),
            authFetch(`terms-list`),
          ]);

        if (!coursesResponse.ok) {
          throw new Error(`Courses Error: ${coursesResponse.status}`);
        }

        if (!batchesResponse.ok) {
          throw new Error(`Batches Error: ${batchesResponse.status}`);
        }

        if (!termsResponse.ok) {
          throw new Error(`Terms Error: ${termsResponse.status}`);
        }

        const coursesData = await coursesResponse.json();

        const batchesData = await batchesResponse.json();

        const termsData = await termsResponse.json();

        setCourse(coursesData.data || []);
        setBatch(batchesData.data || []);
        setTerm(termsData.data || []);
      } catch (err) {
        setError(err.message || "Failed to load filter data.");
      }
    };

    fetchFilterData();
  }, []);

  // =================================================
  // FETCH ASSIGNED SUBJECTS
  //
  // IMPORTANT:
  // This now depends on:
  // - currentPage
  // - appliedFilters
  //
  // Therefore pagination NEVER loses the filters.
  // =================================================

  useEffect(() => {
    const fetchAssignedSubjects = async () => {
      setLoading(true);
      setError(false);

      try {
        const params = new URLSearchParams();

        // -----------------------------------------
        // ALWAYS SEND CURRENT PAGE
        // -----------------------------------------

        params.set("page", String(currentPage));

        // -----------------------------------------
        // ONLY ADD FILTERS THAT ARE APPLIED
        // -----------------------------------------

        if (appliedFilters.batch) {
          params.set("batch", appliedFilters.batch);
        }

        if (appliedFilters.term) {
          params.set("term", appliedFilters.term);
        }

        if (appliedFilters.course) {
          params.set("course", appliedFilters.course);
        }

        const response = await authFetch(
          `subject-mapping-viewset?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        setAssignedSub(Array.isArray(data.data) ? data.data : []);

        setTotalPages(Number(data.extra?.total) || 1);
      } catch (err) {
        setError(err.message || "Failed to fetch assigned subjects.");

        setAssignedSub([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedSubjects();
  }, [currentPage, appliedFilters]);

  // =================================================
  // SEARCH
  // =================================================

  const filteredSubjects = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return Array.isArray(assignedSub) ? assignedSub : [];
    }

    return Array.isArray(assignedSub)
      ? assignedSub.filter((item) =>
          item.subject?.name?.toLowerCase().includes(search),
        )
      : [];
  }, [assignedSub, searchTerm]);

  // =================================================
  // CHECKBOX INITIAL STATE
  // =================================================

  useEffect(() => {
    const initialChecked = {};

    filteredSubjects.forEach((subject) => {
      initialChecked[subject.id] = subject.is_active;
    });

    setCheckedState(initialChecked);
  }, [filteredSubjects]);

  // =================================================
  // CHECKBOX CHANGE
  // =================================================

  const handleCheckboxChange = (id) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // =================================================
  // APPLY FILTER
  //
  // IMPORTANT:
  // We DO NOT make the API request here.
  //
  // We only save the filters and reset to page 1.
  //
  // The useEffect above then makes the correct request.
  // =================================================

  function handlesearch() {
    setCurrentPage(1);

    setAppliedFilters({
      batch: selectedBatch || "",
      term: selectedTerm || "",
      course: selectedCourse || "",
    });
  }

  // =================================================
  // CLEAR FILTERS
  // =================================================

  function handleClearFilters() {
    setselectedBatch("");
    setselectedTerm("");
    setselectedCourse("");

    setAppliedFilters({
      batch: "",
      term: "",
      course: "",
    });

    setCurrentPage(1);
  }

  // =================================================
  // EDIT / SAVE
  // =================================================

  function handlesaves() {
    setEdit(false);
    setIsDel(true);
  }

  // =================================================
  // SAVE STATUS
  // =================================================

  const handleSubmitAll = async () => {
    const subject_mapping_ids = Object.entries(checkedState).map(
      ([id, is_active]) => [parseInt(id), is_active],
    );

    setEdit(false);

    const payload = {
      subject_mapping_ids,
    };

    try {
      const response = await authFetch("subject-mapping-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed To Change Status");
      }

      setMessage("Successfully Updated Status");

      setShowToast(true);

      setTimeout(() => {
        setMessage("");
        setShowToast(false);

        // Keep your existing behavior
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDel(false);
    }
  };

  // =================================================
  // PAGINATION
  // =================================================

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // =================================================
  // RENDER
  // =================================================

  return (
    <>
      <div className="py-4 px-5">
        {showToast && <Toast message={message} />}

        {/* ------------------------------------- */}
        {/* HEADER */}
        {/* ------------------------------------- */}

        <div className="py-8 sm:px-12">
          <div className="flex justify-between items-center gap-2">
            <div className="w-3/5">
              <h5 className="text-2xl font-bold">{title}</h5>

              <span className="text-sm text-gray-400">
                Taxila Business School
              </span>
            </div>

            <div className="w-1/5">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md p-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <hr className="border border-b-2 mt-4 mb-6" />

          {/* --------------------------------- */}
          {/* FILTERS */}
          {/* --------------------------------- */}

          <AssignedSubjectFilters
            course={course}
            batch={batch}
            term={term}
            selectedCourse={selectedCourse}
            selectedBatch={selectedBatch}
            selectedTerm={selectedTerm}
            setselectedCourse={setselectedCourse}
            setselectedBatch={setselectedBatch}
            setselectedTerm={setselectedTerm}
            handleSearch={handlesearch}
          />

          {/* --------------------------------- */}
          {/* OPTIONAL CLEAR FILTER BUTTON */}
          {/* --------------------------------- */}

          {(appliedFilters.batch ||
            appliedFilters.term ||
            appliedFilters.course) && (
            <div className="mt-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm text-red-700 border border-red-700 bg-red-50 hover:bg-red-700 hover:text-white px-3 py-2 rounded-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------- */}
        {/* EDIT BUTTON */}
        {/* ------------------------------------- */}

        {editt &&
          (edit ? (
            <button
              onClick={handlesaves}
              className="mx-12 tx-sm flex items-center gap-1 justify-center bg-green-50 border border-green-700 text-green-800 hover:bg-green-800 hover:text-white px-4 py-2 rounded-sm"
            >
              <UploadCloud className="h-4 w-4" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="sm:mx-12 tx-sm flex items-center gap-1 justify-center bg-red-50 border border-red-700 text-red-800 hover:bg-red-800 hover:text-white px-4 py-2 rounded-sm"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </button>
          ))}

        {/* ------------------------------------- */}
        {/* ERROR */}
        {/* ------------------------------------- */}

        {error && <p className="mx-12 text-sm text-red-800">{error}</p>}

        {/* ------------------------------------- */}
        {/* TABLE */}
        {/* ------------------------------------- */}

        {loading ? (
          <FullWidthLoader />
        ) : (
          <div className="sm:px-12">
            <div className="relative overflow-x-auto rounded-xl border border-gray-200 mt-4 mb-2 shadow-sm">
              <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                  <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                      {edit && (
                        <th scope="col" className="p-4 whitespace-nowrap w-4">
                          -
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3 whitespace-nowrap w-px">
                        S.No.
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Course Name
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Batch Name
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Term
                      </th>
                      <th scope="col" className="px-6 py-3 min-w-[200px]">
                        Assigned Subject
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Assigned Faculty
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap w-px">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSubjects && filteredSubjects.length > 0 ? (
                      filteredSubjects.map((subjectMapping, index) => (
                        <tr
                          key={subjectMapping.id}
                          className="bg-white border-b hover:bg-gray-50 text-black transition-colors"
                        >
                          {/* CHECKBOX */}
                          {edit && (
                            <td className="p-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                                checked={checkedState[subjectMapping.id] || false}
                                onChange={() => handleCheckboxChange(subjectMapping.id)}
                              />
                            </td>
                          )}

                          {/* S.NO */}
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {index + 1}
                          </td>

                          {/* COURSE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {subjectMapping.course?.map((cor) => (
                              <span key={cor.id} className="block">
                                {cor.name}
                              </span>
                            ))}
                          </td>

                          {/* BATCH */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {subjectMapping.batch?.name}
                          </td>

                          {/* TERM */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {subjectMapping.term?.name}
                          </td>

                          {/* SUBJECT */}
                          <td className="px-6 py-4 text-gray-700">
                            {subjectMapping.subject?.name}
                          </td>

                          {/* TYPE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {subjectMapping.type === "main" ? (
                              <span className="text-xs font-medium text-green-800 bg-green-100 rounded px-2.5 py-0.5 border border-green-200">
                                main
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-red-800 bg-red-100 rounded px-2.5 py-0.5 border border-red-200">
                                {subjectMapping.type}
                              </span>
                            )}
                          </td>

                          {/* FACULTY */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {subjectMapping.faculty
                              ? `${subjectMapping.faculty.first_name || ""} ${
                                  subjectMapping.faculty.last_name || ""
                                }`
                              : ""}
                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`${url}${subjectMapping.id}`}
                                className="bg-green-50 text-green-800 p-1.5 rounded-md hover:bg-green-100 transition-colors border border-transparent hover:border-green-200"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Link>

                              {editt && (
                                <Link
                                  href={`subject-manager/edit-assignedSub?subjectId=${subjectMapping.id}`}
                                  className="bg-red-50 text-red-800 p-1.5 rounded-md hover:bg-red-100 transition-colors border border-transparent hover:border-red-200"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={edit ? 9 : 8} className="px-6 py-8 text-center text-gray-500 whitespace-nowrap">
                          No Subject Found For Selected Filter
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

            </div>
          </div>
        )}

        {/* ------------------------------------- */}
        {/* PAGINATION */}
        {/* ------------------------------------- */}

        <div className="flex justify-between items-center mt-4 mx-12">
          <button
            onClick={handlePrevious}
            disabled={loading || currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-gray-100 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-900">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={loading || currentPage === totalPages}
            className="px-8 py-2 bg-red-800 text-red-50 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* CONFIRM STATUS MODAL */}
      {/* ========================================= */}

      {isDel && (
        <div className="fixed inset-0 z-[80] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative m-4 p-4 rounded-lg bg-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 scale-100">
            <div className="relative font-semibold border-b border-slate-200 py-4 px-8 leading-normal text-slate-800">
              Are You Want to Update the Status
            </div>

            <div className="flex shrink-0 flex-wrap gap-3 items-center pt-4 justify-between">
              <button
                onClick={handleSubmitAll}
                className="rounded-md bg-red-600 w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Confirm
              </button>

              <button
                onClick={() => setIsDel(false)}
                className="rounded-md border bg-slate-200 hover:text-white border-transparent w-full py-2 px-4 text-center text-sm transition-all text-slate-800 hover:bg-slate-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
