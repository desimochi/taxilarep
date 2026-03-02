'use client';

import { authFetch } from '@/app/lib/fetchWithAuth';
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

export default function WeeklyReportsPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const searchParamst = useSearchParams();
  const batch = searchParamst.get("batch");
  // Filters
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [minMarks, setMinMarks] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  
  // Sorting
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await authFetch(`weekly-report-marks/${batch}/${id}`);
      const result = await response.json();
      setData(result.data || {});
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total and average marks for each student
  const processedData = useMemo(() => {
    return Object.values(data).map(student => {
      const reports = student.weekly_report || [];
      
      // Collect all weeks data
      const allWeeksData = [];
      reports.forEach(report => {
        Object.entries(report.weekly_report || {}).forEach(([weekNum, weekData]) => {
          allWeeksData.push({
            weekNum: parseInt(weekNum),
            marks: parseFloat(weekData.marks) || 0,
            report: weekData.weekly_report
          });
        });
      });
      
      // Sort by week number
      allWeeksData.sort((a, b) => a.weekNum - b.weekNum);
      
      const allMarks = allWeeksData.map(w => w.marks);
      const totalMarks = allMarks.reduce((sum, mark) => sum + mark, 0);
      const avgMarks = allMarks.length > 0 ? totalMarks / allMarks.length : 0;
      
      const email = reports.length > 0 ? reports[0].student.user.email : '';
      const gender = reports.length > 0 ? reports[0].student.gender : '';
      
      return {
        ...student,
        email,
        gender,
        totalMarks,
        avgMarks,
        weekCount: allMarks.length,
        weeksData: allWeeksData
      };
    });
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return processedData.filter(student => {
      const nameMatch = student.student_name.toLowerCase().includes(nameFilter.toLowerCase());
      const emailMatch = student.email.toLowerCase().includes(emailFilter.toLowerCase());
      
      const minMarksMatch = minMarks === '' || student.avgMarks >= parseFloat(minMarks);
      const maxMarksMatch = maxMarks === '' || student.avgMarks <= parseFloat(maxMarks);
      
      return nameMatch && emailMatch && minMarksMatch && maxMarksMatch;
    });
  }, [processedData, nameFilter, emailFilter, minMarks, maxMarks]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'name':
          aValue = a.student_name.toLowerCase();
          bValue = b.student_name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'enrollment':
          aValue = a.student_enrollment_number.toLowerCase();
          bValue = b.student_enrollment_number.toLowerCase();
          break;
        case 'totalMarks':
          aValue = a.totalMarks;
          bValue = b.totalMarks;
          break;
        case 'avgMarks':
          aValue = a.avgMarks;
          bValue = b.avgMarks;
          break;
        case 'weekCount':
          aValue = a.weekCount;
          bValue = b.weekCount;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortField, sortOrder]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '⇅';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const clearFilters = () => {
    setNameFilter('');
    setEmailFilter('');
    setMinMarks('');
    setMaxMarks('');
    setCurrentPage(1);
  };

  // Statistics
  const stats = useMemo(() => {
    if (sortedData.length === 0) return null;
    
    const totalStudents = sortedData.length;
    const avgOfAvgs = sortedData.reduce((sum, s) => sum + s.avgMarks, 0) / totalStudents;
    const highestAvg = Math.max(...sortedData.map(s => s.avgMarks));
    const lowestAvg = Math.min(...sortedData.map(s => s.avgMarks));
    
    return {
      totalStudents,
      avgOfAvgs,
      highestAvg,
      lowestAvg
    };
  }, [sortedData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading weekly reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white border border-red-200 rounded-xl shadow-lg p-8 max-w-md">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-red-800 text-xl font-semibold mb-2 text-center">Error Loading Data</h2>
          <p className="text-red-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 px-12 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
     Weekly Report Marks
          </h1>
          <p className="text-gray-600 text-lg">
            Batch: <span className="font-semibold">T30</span> | Course: <span className="font-semibold">PGDM</span>
          </p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
              <div className="text-sm font-medium text-gray-600 mb-1">Total Students</div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalStudents}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="text-sm font-medium text-gray-600 mb-1">Average Marks</div>
              <div className="text-3xl font-bold text-gray-900">{stats.avgOfAvgs.toFixed(1)}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
              <div className="text-sm font-medium text-gray-600 mb-1">Highest Avg</div>
              <div className="text-3xl font-bold text-gray-900">{stats.highestAvg.toFixed(1)}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="text-sm font-medium text-gray-600 mb-1">Lowest Avg</div>
              <div className="text-3xl font-bold text-gray-900">{stats.lowestAvg.toFixed(1)}</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">🔍 Filters</h2>
            {(nameFilter || emailFilter || minMarks || maxMarks) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name
              </label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="text"
                value={emailFilter}
                onChange={(e) => {
                  setEmailFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Avg Marks
              </label>
              <input
                type="number"
                value={minMarks}
                onChange={(e) => {
                  setMinMarks(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="e.g., 40"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Avg Marks
              </label>
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => {
                  setMaxMarks(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="e.g., 50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{paginatedData.length}</span> of{' '}
            <span className="font-semibold">{sortedData.length}</span> students
          </p>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-600 to-gray-600">
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <span className="text-sm">{getSortIcon('name')}</span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('enrollment')}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Enrollment</span>
                      <span className="text-sm">{getSortIcon('enrollment')}</span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('email')}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Email</span>
                      <span className="text-sm">{getSortIcon('email')}</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Weekly Marks
                  </th>
                  <th
                    onClick={() => handleSort('totalMarks')}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Total Marks</span>
                      <span className="text-sm">{getSortIcon('totalMarks')}</span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('avgMarks')}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Avg Marks</span>
                      <span className="text-sm">{getSortIcon('avgMarks')}</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No students found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((student) => (
                    <StudentRow key={student.student_id} student={student} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-md px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-gray-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentRow({ student }) {
  const [expanded, setExpanded] = useState(false);

  const getMarksColor = (marks) => {
    if (marks >= 45) return 'text-green-600 bg-green-50';
    if (marks >= 35) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getWeekMarksBadgeColor = (marks) => {
    if (marks >= 45) return 'bg-green-500 text-white';
    if (marks >= 35) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {student.student_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {student.student_name}
              </div>
              <div className="text-xs text-gray-500">{student.gender}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 font-mono">
            {student.student_enrollment_number}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-600">{student.email}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-1 max-w-xs">
            {student.weeksData && student.weeksData.map((week) => (
              <span 
                key={week.weekNum} 
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${getWeekMarksBadgeColor(week.marks)}`}
                title={`Week ${week.weekNum}: ${week.marks} marks`}
              >
                W{week.weekNum}: {week.marks}
              </span>
            ))}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-bold text-gray-900">
            {student.totalMarks.toFixed(1)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getMarksColor(student.avgMarks)}`}>
            {student.avgMarks.toFixed(1)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {expanded ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                Hide
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                Show
              </>
            )}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gradient-to-r from-gray-50 to-gray-50">
          <td colSpan="7" className="px-6 py-6">
            <WeeklyReportsDetails reports={student.weekly_report} studentName={student.student_name} />
          </td>
        </tr>
      )}
    </>
  );
}

function WeeklyReportsDetails({ reports, studentName }) {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-8">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        No weekly reports available for {studentName}.
      </div>
    );
  }

  const getMarksBadgeColor = (marks) => {
    if (marks >= 45) return 'bg-green-500';
    if (marks >= 35) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📝 Weekly Reports for {studentName}
      </h3>
      {reports.map((report, reportIndex) => (
        <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">
                Report #{reportIndex + 1} (ID: {report.id})
              </h4>
              <span className="text-xs text-gray-100">
                Updated: {new Date(report.updated_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {report.weekly_report && Object.keys(report.weekly_report).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(report.weekly_report).map(([weekNum, weekData]) => (
                  <div key={weekNum} className="border-l-4 border-gray-500 pl-4 hover:border-gray-600 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-base font-semibold text-gray-900 flex items-center">
                        <span className="bg-gray-100 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
                          {weekNum}
                        </span>
                        Week {weekNum}
                      </h5>
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold text-white ${getMarksBadgeColor(parseFloat(weekData.marks))}`}>
                        {weekData.marks} / 50
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {weekData.weekly_report}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No weekly data available for this report.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}