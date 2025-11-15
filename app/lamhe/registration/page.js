"use client";

import React, { useState, useEffect, use } from "react";
import { Filter, Download, ChevronLeft, ChevronRight, Users, Calendar, Trophy, Search, X } from "lucide-react";

export default function RegistrationFilterPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const eventList = [
    "E-Sports", "Poster Making", "Carrom", "Table Tennis", "Business Quiz",
    "Futsal", "Extempore", "Badminton (Doubles)", "Ad Mania", "Treasure Hunt",
    "Youth Parliament", "Chess", "Stand-up Comedy", "Cooking Without Flame",
    "Dodge Ball", "Singing", "Arm Wrestling", "Dancing", "Kabaddi",
    "Fashion Show"
  ];
useEffect(() => {
    // Initial fetch of all registrations
    const fetchRegistrations = async () => {
        setLoading(true);
        const res = await fetch('/api/lamhe/registration');
        const json = await res.json();
        setResults(json.data || []);
        setLoading(false);
    }
    fetchRegistrations();
}, []);
  // Apply search filter
  useEffect(() => {
    if (searchTerm) {
      const filtered = results.filter(reg => 
        reg.participant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.participant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.participant?.mobile?.includes(searchTerm)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(results);
    }
    setCurrentPage(1);
  }, [searchTerm, results]);

  const toggleSelection = (value, list, setter) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedDays([]);
    setSelectedEvents([]);
    setTeamFilter("");
    setSearchTerm("");
  };

  const applyFilters = async () => {
    setLoading(true);

    let query = [];
    selectedDays.forEach((d) => query.push(`day=${d}`));
    selectedEvents.forEach((e) => query.push(`event=${encodeURIComponent(e)}`));
    if (teamFilter !== "") {
      query.push(`team=${teamFilter}`);
    }

    const url = `/api/lamhe/registration?${query.join("&")}`;
    const res = await fetch(url);
    const json = await res.json();

    setResults(json.data || []);
    setLoading(false);
    setCurrentPage(1);
  };

  const openTeamPopup = (eventName, teamMembers) => {
    setSelectedTeam({ eventName, teamMembers });
    setShowModal(true);
  };

  // Export to Excel
  const exportToExcel = () => {
    const headers = ["Participant Name", "Email", "Mobile", "Events", "Day", "Type"];
    const rows = filteredResults.flatMap(reg => 
      reg.events.map(ev => [
        reg.participant?.name || "",
        reg.participant?.email || "",
        reg.participant?.mobile || "",
        ev.name || "",
        `Day ${ev.day}`,
        ev.isTeamEvent ? "Team" : "Solo"
      ])
    );

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const activeFiltersCount = selectedDays.length + selectedEvents.length + (teamFilter ? 1 : 0);

  return (
    <div className="min-h-screen ">
      <div className=" p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Lamhe Registration - 2025</h1>
              <p className="text-gray-600">See all the Registration of Upcoming Lamhe Event</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter size={20} />
                {showFilters ? "Hide" : "Show"} Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-zinc-950 text-white rounded-full px-2 py-0.5 text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <button
                onClick={exportToExcel}
                disabled={filteredResults.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-950 text-white rounded-lg hover:bg-zinc-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                Export to Excel
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Sort Registrations By</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                >
                  <X size={16} />
                  Clear All
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* DAY FILTER */}
              <div className="bg-gradient-to-br from-fray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="text-gray-900" size={20} />
                  <h3 className="font-semibold text-gray-900">Day</h3>
                </div>
                <div className="space-y-2">
                  {["1", "2"].map(day => (
                    <label key={day} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleSelection(day, selectedDays, setSelectedDays)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Day {day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* EVENT FILTERS */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="text-gray-900" size={20} />
                  <h3 className="font-semibold text-gray-900">Events</h3>
                  {selectedEvents.length > 0 && (
                    <span className="text-xs bg-purple-600 text-white rounded-full px-2 py-0.5">
                      {selectedEvents.length}
                    </span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                  {eventList.map((ev) => (
                    <label key={ev} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(ev)}
                        onChange={() => toggleSelection(ev, selectedEvents, setSelectedEvents)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">{ev}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* TEAM FILTER */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="text-gray-900" size={20} />
                  <h3 className="font-semibold text-gray-900">Team / Solo</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { value: "", label: "All" },
                    { value: "true", label: "Team Events" },
                    { value: "false", label: "Solo Events" }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="teamFilter"
                        checked={teamFilter === option.value}
                        onChange={() => setTeamFilter(option.value)}
                        className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-gray-700 group-hover:text-green-600 transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white rounded-lg hover:from-red-700 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Results {filteredResults.length > 0 && `(${filteredResults.length})`}
              </h2>
              {filteredResults.length > 0 && (
                <p className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredResults.length)} of {filteredResults.length}
                </p>
              )}
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {!loading && filteredResults.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600 text-lg">No results found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search term</p>
            </div>
          )}

          {!loading && currentItems.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Participant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Events</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((reg) => (
                    <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{reg.participant?.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{reg.participant?.email}</div>
                        <div className="text-sm text-gray-500">{reg.participant?.mobile}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {reg.events.map((ev, idx) => (
                            <div key={idx} className="flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                {ev.name}
                              </span>
                              <span className="text-xs text-gray-500">Day {ev.day}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${ev.isTeamEvent ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                {ev.isTeamEvent ? "Team" : "Solo"}
                              </span>
                              {ev.isTeamEvent && (
                                <button
                                  className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                                  onClick={() => openTeamPopup(ev.name, ev.teamMembers)}
                                >
                                  View Team
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredResults.length > itemsPerPage && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNumber
                              ? "bg-zinc-950 text-white"
                              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2 py-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Team Members Modal */}
      {showModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">Team Members</h3>
              <p className="text-indigo-100 mt-1">{selectedTeam.eventName}</p>
            </div>

            <div className="p-6 space-y-4">
              {selectedTeam.teamMembers?.map((m, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-zinc-950 text-white rounded-full flex items-center justify-center font-bold">
                      {m.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{m.name}</p>
                      <p className="text-sm text-gray-500">Member {i + 1}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="text-gray-800 font-medium">{m.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Mobile:</span>
                      <p className="text-gray-800 font-medium">{m.mobile}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
      `}</style>
    </div>
  );
}