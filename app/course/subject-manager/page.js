"use client";

import { useState, useEffect } from "react";
import {
  PencilIcon,
  PlusCircleIcon,
  SaveIcon,
  Trash2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { authFetch } from "@/app/lib/fetchWithAuth";
import Addsubject from "@/components/AddSubject";
import AssignedSubject from "@/components/AssignedSubject";
import CourseSelection from "@/components/AssignSubject";

const UserTable = () => {
  const [editingRow, setEditingRow] = useState(null);
  const [activeTab, setActiveTab] = useState("subject");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDel, setIsDel] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // --------------------------------------------------
  // FETCH SUBJECTS
  // --------------------------------------------------

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await authFetch(`subject-viewset`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        setUsers(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Failed to fetch subjects.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // --------------------------------------------------
  // EDIT SUBJECT
  // --------------------------------------------------

  const handleEditClick = (id) => {
    setEditingRow(id);
  };

  // --------------------------------------------------
  // SAVE SUBJECT
  // --------------------------------------------------

  const handleSaveClick = async (id) => {
    const courseToUpdate = users.find((course) => course.id === id);

    if (!courseToUpdate) {
      console.error("Course not found");
      return;
    }

    try {
      const response = await authFetch(`subject-viewset/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: courseToUpdate.name,
          code: courseToUpdate.code,
          credit: courseToUpdate.credit,
          is_active: courseToUpdate.is_active,
          type: courseToUpdate.type,
        }),
      });

      if (response.ok) {
        const updatedCourse = await response.json();

        setUsers((prevCourses) =>
          prevCourses.map((course) =>
            course.id === id
              ? {
                  ...course,
                  ...updatedCourse.data,
                }
              : course,
          ),
        );

        setEditingRow(null);
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // --------------------------------------------------
  // HANDLE FIELD CHANGE
  // --------------------------------------------------

  const handleChange = (e, id, fieldName = null) => {
    const { name, value } = e.target;
    const key = fieldName || name;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              [key]:
                key === "is_active"
                  ? value === "true"
                  : key === "credit"
                    ? Number(value)
                    : value,
            }
          : user,
      ),
    );
  };

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    if (!normalizedSearch) {
      return true;
    }

    return (
      user.name?.toLowerCase().includes(normalizedSearch) ||
      user.code?.toLowerCase().includes(normalizedSearch) ||
      user.type?.toLowerCase().includes(normalizedSearch) ||
      user.description?.toLowerCase().includes(normalizedSearch)
    );
  });

  // --------------------------------------------------
  // PAGINATION
  // --------------------------------------------------

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  // --------------------------------------------------
  // RESET PAGE WHEN SEARCH/PAGE SIZE CHANGES
  // --------------------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  // --------------------------------------------------
  // KEEP CURRENT PAGE VALID
  // --------------------------------------------------

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // --------------------------------------------------
  // PAGE NUMBERS
  // --------------------------------------------------

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <>
      {/* ----------------------------------------- */}
      {/* TABS */}
      {/* ----------------------------------------- */}

      <div className="border-b border-gray-200 dark:border-gray-700 px-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            {
              id: "subject",
              label: "All Subjects",
            },
            {
              id: "addsubject",
              label: "+ Add Subject",
            },
            {
              id: "assignedsub",
              label: "Assigned Subject",
            },
            {
              id: "assignsub",
              label: "+ Assign Subject",
            },
          ].map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                  activeTab === tab.id
                    ? "text-black border-black dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------------------------- */}
      {/* ALL SUBJECTS */}
      {/* ----------------------------------------- */}

      {activeTab === "subject" && (
        <>
          <div className="px-5 py-4">
            <div className="py-8 sm:px-12">
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h5 className="text-2xl font-bold">Subject Manager</h5>

                  <span className="text-sm text-gray-400">
                    Taxila Business School
                  </span>
                </div>

                {/* SEARCH + PAGE SIZE */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  {/* SEARCH */}
                  <div className="w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search subject..."
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* PAGE SIZE */}
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm text-gray-500">Show</span>

                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value={25}>25</option>

                      <option value={50}>50</option>

                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border border-b-2 mt-4" />
            </div>

            <div className="sm:px-12">
              {/* ----------------------------------------- */}
              {/* LOADING */}
              {/* ----------------------------------------- */}

              {loading && (
                <div className="py-10 text-center text-gray-500">
                  Loading subjects...
                </div>
              )}

              {/* ----------------------------------------- */}
              {/* ERROR */}
              {/* ----------------------------------------- */}

              {!loading && error && (
                <div className="py-10 text-center text-red-600">{error}</div>
              )}

              {/* ----------------------------------------- */}
              {/* TABLE */}
              {/* ----------------------------------------- */}

              {!loading && !error && (
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-white">
                      <tr>
                        <th className="px-6 py-3">S. No.</th>

                        <th className="px-6 py-3">Subject Name</th>

                        <th className="px-6 py-3">Code</th>

                        <th className="px-6 py-3">Credit</th>

                        <th className="px-6 py-3">Type</th>

                        <th className="px-6 py-3">Status</th>

                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user, index) => {
                          const serialNumber = startIndex + index + 1;

                          const isEditing = editingRow === user.id;

                          return (
                            <tr
                              key={user.id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              {/* S.NO */}
                              <td className="px-6 py-4">{serialNumber}</td>

                              {/* NAME */}
                              <td className="px-6 py-4">
                                {isEditing ? (
                                  <input
                                    type="text"
                                    name="name"
                                    value={user.name || ""}
                                    onChange={(e) => handleChange(e, user.id)}
                                    className="border border-gray-300 p-1 rounded w-full min-w-[180px]"
                                  />
                                ) : (
                                  user.name
                                )}
                              </td>

                              {/* CODE */}
                              <td className="px-6 py-4">
                                {isEditing ? (
                                  <input
                                    type="text"
                                    name="code"
                                    value={user.code || ""}
                                    onChange={(e) => handleChange(e, user.id)}
                                    className="border border-gray-300 p-1 rounded w-full min-w-[120px]"
                                  />
                                ) : (
                                  user.code
                                )}
                              </td>

                              {/* CREDIT */}
                              <td className="px-6 py-4">
                                {isEditing ? (
                                  <input
                                    type="number"
                                    name="credit"
                                    value={user.credit ?? ""}
                                    onChange={(e) => handleChange(e, user.id)}
                                    className="border border-gray-300 p-1 rounded w-24"
                                  />
                                ) : (
                                  user.credit
                                )}
                              </td>

                              {/* TYPE */}
                              <td className="px-6 py-4">
                                {isEditing ? (
                                  <select
                                    value={user.type || ""}
                                    onChange={(e) =>
                                      handleChange(e, user.id, "type")
                                    }
                                    className="border border-gray-300 rounded px-2 py-1"
                                  >
                                    <option value="Theory">Theory</option>

                                    <option value="Practical">Practical</option>
                                  </select>
                                ) : (
                                  user.type
                                )}
                              </td>

                              {/* STATUS */}
                              <td className="px-6 py-4">
                                {isEditing ? (
                                  <select
                                    value={user.is_active ? "true" : "false"}
                                    onChange={(e) =>
                                      handleChange(e, user.id, "is_active")
                                    }
                                    className="border border-gray-300 rounded px-2 py-1"
                                  >
                                    <option value="true">Active</option>

                                    <option value="false">Inactive</option>
                                  </select>
                                ) : (
                                  <span
                                    className={
                                      user.is_active
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {user.is_active ? "Active" : "Inactive"}
                                  </span>
                                )}
                              </td>

                              {/* ACTION */}
                              <td className="px-6 py-4">
                                <div className="flex justify-start gap-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      isEditing
                                        ? handleSaveClick(user.id)
                                        : handleEditClick(user.id)
                                    }
                                    className="cursor-pointer"
                                    title={isEditing ? "Save" : "Edit"}
                                  >
                                    {isEditing ? (
                                      <SaveIcon className="h-5 w-5 text-green-600" />
                                    ) : (
                                      <PencilIcon className="h-5 w-5 text-blue-600" />
                                    )}
                                  </button>

                                  {/*
                                                                            Delete functionality
                                                                            intentionally left unchanged
                                                                            from the original component.
                                                                            */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-10 text-center text-gray-500"
                          >
                            {searchTerm
                              ? "No subjects found matching your search."
                              : "No subjects found."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ----------------------------------------- */}
              {/* PAGINATION FOOTER */}
              {/* ----------------------------------------- */}

              {!loading && !error && filteredUsers.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-4">
                  {/* RECORD COUNT */}
                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium text-gray-700">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-gray-700">
                      {Math.min(startIndex + pageSize, filteredUsers.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-700">
                      {filteredUsers.length}
                    </span>{" "}
                    subjects
                  </div>

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                      {/* PREVIOUS */}
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />

                        <span className="hidden sm:inline">Previous</span>
                      </button>

                      {/* PAGE NUMBERS */}
                      {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-2 py-2 text-gray-500"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[38px] px-3 py-2 text-sm border rounded-md ${
                              currentPage === page
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}

                      {/* NEXT */}
                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span className="hidden sm:inline">Next</span>

                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* DELETE MODAL */}
          {isDel && (
            <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
              <div className="relative m-4 p-4 rounded-lg bg-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 scale-100">
                <div className="relative font-semibold border-b border-slate-200 py-4 px-8 leading-normal text-slate-800">
                  Do you want to delete this item?
                </div>

                <div className="flex shrink-0 flex-wrap gap-3 items-center pt-4 justify-between">
                  <button
                    onClick={() => setIsDel(false)}
                    className="rounded-md bg-red-600 w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
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
      )}

      {/* ----------------------------------------- */}
      {/* ADD SUBJECT */}
      {/* ----------------------------------------- */}

      {activeTab === "addsubject" && <Addsubject />}

      {/* ----------------------------------------- */}
      {/* ASSIGNED SUBJECT */}
      {/* ----------------------------------------- */}

      {activeTab === "assignedsub" && (
        <AssignedSubject
          title="Assigned Subject"
          editt={true}
          url="/admin/subject/details/"
        />
      )}

      {/* ----------------------------------------- */}
      {/* ASSIGN SUBJECT */}
      {/* ----------------------------------------- */}

      {activeTab === "assignsub" && <CourseSelection />}
    </>
  );
};

export default UserTable;
