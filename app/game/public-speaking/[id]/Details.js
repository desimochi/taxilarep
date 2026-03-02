"use client";

import { useEffect, useState } from "react";

export default function UserDetails({ id }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSession, setExpandedSession] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/game/public-speaking/${id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.status}`);
        }
        
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white/60 rounded-xl w-1/3 shadow-sm"></div>
            <div className="bg-white/60 shadow-lg rounded-2xl p-8 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-3xl p-12 text-center max-w-md border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Unable to Load Data</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!userData || !userData.sessions || userData.sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-3xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">No Records Found</h2>
          <p className="text-slate-600">No user data or sessions available for this profile.</p>
        </div>
      </div>
    );
  }

  const { sessions } = userData;
  const profile = sessions[0]?.profile;

  const calculateAverageScore = () => {
    const scores = sessions.filter(s => s.score !== null && s.score !== undefined).map(s => s.score);
    if (scores.length === 0) return null;
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  };

  const totalDuration = sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const avgScore = calculateAverageScore();

  const toggleSession = (index) => {
    setExpandedSession(expandedSession === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Public Speaking Report</h1>
              <p className="text-slate-600 text-lg">Comprehensive Performance Overview</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <div className="text-sm opacity-90">User ID</div>
              <div className="text-xl font-bold">{id}</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-slate-900">{sessions.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Average Score</p>
                  <p className="text-3xl font-bold text-slate-900">{avgScore || "N/A"}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Total Time</p>
                  <p className="text-3xl font-bold text-slate-900">{Math.floor(totalDuration / 60)}m</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mr-4">
                {profile.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
                <p className="text-slate-600">{profile.jobDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Language</p>
                <p className="text-slate-900 font-medium">{profile.language}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">Qualification</p>
                <p className="text-slate-900 font-medium">{profile.qualification}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Experience</p>
                <p className="text-slate-900 font-medium">{profile.experience} years</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide mb-1">Specialisation</p>
                <p className="text-slate-900 font-medium">{profile.specialisation}</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
                <p className="text-xs text-cyan-600 font-semibold uppercase tracking-wide mb-1">Speech Topic</p>
                <p className="text-slate-900 font-medium">{profile.speechTopic}</p>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-4 border border-rose-100">
                <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide mb-1">Life Goal</p>
                <p className="text-slate-900 font-medium text-sm">{profile.lifeGoal}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sessions Timeline */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Session History
          </h2>

          <div className="space-y-4">
            {sessions.map((session, index) => {
              const isExpanded = expandedSession === index;
              return (
              <div
                key={`${session.timestamp}-${index}`}
                className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleSession(index)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600">Session Date</p>
                        <time className="text-slate-900 font-semibold" dateTime={session.timestamp}>
                          {new Date(session.timestamp).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                        <p className="text-xs text-slate-600">Duration</p>
                        <p className="font-bold text-slate-900">{session.duration}s</p>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                        <p className="text-xs text-slate-600">Score</p>
                        <p className="font-bold text-blue-600">
                          {session.score !== null && session.score !== undefined 
                            ? session.score 
                            : "N/A"}
                        </p>
                      </div>
                      <div className={`ml-2 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>

                <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 space-y-3">
                    {session.analysis && (
                      <div className="bg-white rounded-xl p-4 border border-blue-100 animate-fadeIn">
                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">Analysis</p>
                        <p className="text-slate-700 leading-relaxed">{session.analysis}</p>
                      </div>
                    )}

                    {session.note && (
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 animate-fadeIn">
                        <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-2">Additional Notes</p>
                        <p className="text-amber-900">{session.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Accreditation Report Generated • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}