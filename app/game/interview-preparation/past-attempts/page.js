"use client"

import { GlobalContext } from "@/components/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { Calendar, User, Building2, Star, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import BackButton from "@/components/ui/Backbutton";

export default function Page() {
  const {state} = useContext(GlobalContext)
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/game/interview/${state.id}`)
        if (!response.ok) throw new Error("Failed to fetch Subject data")

        const data = await response.json()
        console.log(data)
        if (data) setUserData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (state.id) {
      fetchClassData()
    }
  }, [state.id])

  const [expandedSessions, setExpandedSessions] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleSessionExpansion = (sessionIndex) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionIndex]: !prev[sessionIndex]
    }));
  };

  const toggleQuestionExpansion = (sessionIndex, questionIndex) => {
    const key = `${sessionIndex}-${questionIndex}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    if (score >= 4) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview sessions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!userData || !userData.sessions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h2>
          <p className="text-gray-600">No interview sessions found for this user.</p>
        </div>
      </div>
    );
  }

  // Calculate stats safely
  const totalSessions = userData.sessions?.length || 0;
  const averageScore = totalSessions > 0 
    ? (userData.sessions.reduce((sum, session) => sum + (session.overallScore || 0), 0) / totalSessions).toFixed(1)
    : '0.0';
  const totalQuestions = userData.sessions?.reduce((sum, session) => sum + (session.log?.length || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <BackButton />
      <div className="px-8 mt-3">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Sessions Dashboard</h1>
          <p className="text-gray-600">
            User ID: {userData?.userId || 'N/A'} | Last Updated: {formatDate(userData?.updatedAt)}
          </p>
        </div>

        {/* Sessions Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Sessions Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalSessions}</div>
              <div className="text-sm text-blue-600">Total Sessions</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{averageScore}</div>
              <div className="text-sm text-green-600">Average Score</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{totalQuestions}</div>
              <div className="text-sm text-purple-600">Total Questions</div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {totalSessions > 0 ? (
          <div className="space-y-6">
            {userData.sessions.map((session, sessionIndex) => (
              <div key={sessionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Session Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSessionExpansion(sessionIndex)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="font-semibold text-lg">{session.playerName || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{session.companyName || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {session.jobRole || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{formatDate(session.date)}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(session.overallScore || 0)}`}>
                        {session.overallScore || 0}/10
                      </div>
                      {expandedSessions[sessionIndex] ? 
                        <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                {expandedSessions[sessionIndex] && session.log && session.log.length > 0 && (
                  <div className="border-t border-gray-200">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Interview Questions & Responses</h3>
                      <div className="space-y-4">
                        {session.log.map((item, questionIndex) => (
                          <div key={questionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Question Header */}
                            <div 
                              className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => toggleQuestionExpansion(sessionIndex, questionIndex)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm font-medium text-gray-600">Q{questionIndex + 1}</span>
                                  <h4 className="font-medium text-gray-900 flex-1">{item.question || 'No question'}</h4>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className={`px-2 py-1 rounded text-xs font-semibold ${getScoreColor(item.score || 0)}`}>
                                    {item.score || 0}/10
                                  </div>
                                  {expandedQuestions[`${sessionIndex}-${questionIndex}`] ? 
                                    <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  }
                                </div>
                              </div>
                            </div>

                            {/* Question Details */}
                            {expandedQuestions[`${sessionIndex}-${questionIndex}`] && (
                              <div className="p-4 space-y-4">
                                {/* Candidate's Answer */}
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    Candidate's Answer
                                  </h5>
                                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                    <p className="text-gray-800">{item.answer || 'No answer provided'}</p>
                                  </div>
                                </div>

                                {/* Feedback Section */}
                                {item.feedback && (
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Areas for Improvement */}
                                    {item.feedback.areas_for_improvement && item.feedback.areas_for_improvement.length > 0 && (
                                      <div>
                                        <h5 className="font-medium text-red-700 mb-3 flex items-center">
                                          <AlertTriangle className="w-4 h-4 mr-2" />
                                          Areas for Improvement
                                        </h5>
                                        <ul className="space-y-2">
                                          {item.feedback.areas_for_improvement.map((area, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 bg-red-50 p-2 rounded border-l-3 border-red-300">
                                              {area}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* What Went Well */}
                                    {item.feedback.what_went_well && item.feedback.what_went_well.length > 0 && (
                                      <div>
                                        <h5 className="font-medium text-green-700 mb-3 flex items-center">
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          What Went Well
                                        </h5>
                                        <ul className="space-y-2">
                                          {item.feedback.what_went_well.map((point, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 bg-green-50 p-2 rounded border-l-3 border-green-300">
                                              {point}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Example Answers */}
                                {item.feedback?.example_answer && item.feedback.example_answer.length > 0 && (
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                                      <Star className="w-4 h-4 mr-2" />
                                      Example Answers
                                    </h5>
                                    <div className="space-y-3">
                                      {item.feedback.example_answer.map((example, idx) => (
                                        <div key={idx} className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                                          <p className="text-sm text-gray-800">{example}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Interview Sessions Found</h3>
            <p className="text-gray-500">Start your first interview session to see results here.</p>
          </div>
        )}
      </div>
    </div>
  );
}