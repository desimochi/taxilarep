"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Plus, Upload, MoreHorizontal, Calendar, Play, Pause, Square, Users, ArrowLeftCircleIcon, ArrowRightCircleIcon, ViewIcon, EyeIcon, ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import StatsCard from './StatsCard';
import { authFetch } from '@/app/lib/fetchWithAuth';
import Genderchart from './GenderChart';
import NoticeBoard from './NoticeBoard';
import ParentMeeting from '@/app/student/add-parent-meeting/page';
import ParentMeetingSnap from './ParentMeeting';
import AttendanceSnap from './AttendanceSnap';
import Link from 'next/link';
import Leaderboard from './LeaderBoard';

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const  [batch, setBatch] = useState()
  const [data, setData] = useState({})
useEffect(()=>{
    async function fetchdata() {
      setLoading(true)
      try {
        const res= await authFetch('dashboard')
        const response =  await res.json()
        if(!res.ok){
          throw new Error("Failed to Fetch Informaiton")
        }
        setData(response.data)
        setBatch("T29")
      } catch (error) {
        setError("Failed to Fetch Informaiton")
      }finally{
        setLoading(false)
      }
    } 

fetchdata()
},[])

  const chartData = [
    { name: 'BTech', value: 20 },
    { name: 'Bcom', value: 5 },
    { name: 'BCA', value: 5 },
    { name: 'BA', value: 9 },
    { name: 'BBA', value: 13 },
    { name: 'Others', value: 17 },
  ];

 


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Admin</h1>
            <p className="text-gray-600">See All the information Plan, prioritize, and accomplish your tasks with ease..</p>
          </div>
        </div>

        {/* Stats Cards */}
       <StatsCard students={data.total_students}  faculty ={data.faculty_count} subject={data.subject_count} batch={data.batch_wise_student_count} /> 

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Analytics */}
            <div className='flex gap-2'>
            <div className="bg-white p-6 w-full rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">T29 Batch Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Bar 
                      dataKey="value" 
                      fill="#991b1b"
                      radius={[6, 6, 6, 6]}
                      background={{ fill: '#f3f4f6', radius: [6, 6, 6, 6] }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
<div className="bg-white p-6 w-full rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">T30 Batch Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Bar 
                      dataKey="value" 
                      fill="#991b1b"
                      radius={[6, 6, 6, 6]}
                      background={{ fill: '#f3f4f6', radius: [6, 6, 6, 6] }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            </div>
           <Leaderboard />
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Class Schedule</h3>
                <Link href={"/course/course-schedule"} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <ArrowBigRightDash size={16} />
                  See more
                </Link>
              </div>
              <AttendanceSnap />
            </div>
          </div>

          {/* Right Column */}
       
          
          <div className="space-y-6">
            <div className='bg-white p-4'>
                 
          <Genderchart
          setBatch={setBatch}
          datas={data}
          batch={batch}
  data={
    data.batch_wise_gender_ratio?.[batch]
      ? Object.entries(data.batch_wise_gender_ratio[batch]).map(([key, value]) => ({
          name: key,
          value: value,
          color:
            key.toLowerCase() === 'male'
              ? '#991b1b'
              : key.toLowerCase() === 'female'
              ? '#6b7280'
              : '#9ca3af' // for 'Other' or unknown
        }))
      : []
  }
/>
            </div>
              

            {/* Reminders */}
            <ParentMeetingSnap />
          <NoticeBoard type={"notice"} />
          <NoticeBoard type={"events"} />
            {/* Projects List */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;