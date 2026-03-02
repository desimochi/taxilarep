"use client";
import { SearchCheckIcon } from "lucide-react";

export default function AssignedSubjectFilters({
  course,
  batch,
  term,
  selectedCourse,
  selectedBatch,
  selectedTerm,
  setselectedCourse,
  setselectedBatch,
  setselectedTerm,
  handleSearch
}) {
  return (
    <div className="flex justify-between gap-2 mt-4 mb-6">
      <select
        className="border border-gray-300 p-2 w-full rounded-sm"
        value={selectedCourse}
        onChange={(e) => setselectedCourse(e.target.value)}
      >
        <option value="">Select a Course</option>
        {course.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 p-2 w-full rounded-sm"
        value={selectedBatch}
        onChange={(e) => setselectedBatch(e.target.value)}
      >
        <option value="">Select a Batch</option>
        {batch.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 p-2 w-full rounded-sm"
        value={selectedTerm}
        onChange={(e) => setselectedTerm(e.target.value)}
      >
        <option value="">Select a Term</option>
        {term.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="w-full flex justify-center gap-1 bg-red-50 border border-red-800 rounded-sm text-red-800 hover:bg-red-800 hover:text-white items-center"
      >
        <SearchCheckIcon className="h-4 w-4" />
        Find
      </button>
    </div>
  );
}
