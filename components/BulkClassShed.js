'use client';

import { authFetch } from '@/app/lib/fetchWithAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

export default function BulkClassShed({id}) {
  const [startDate, setStartDate] = useState('');
  const router = useRouter();
  const [endDate, setEndDate] = useState('');
  const[message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [weekdays, setWeekdays] = useState({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    if (startDate && endDate && Object.keys(weekdays).length === 0) {
      const temp = {};
      weekdayNames.forEach(day => {
        temp[day] = { selected: false, start_time: '', end_time: '' };
      });
      setWeekdays(temp);
    }
  }, [startDate, endDate]);

  const generateSchedule = () => {
    const allDates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    while (start <= end) {
      const day = start.toLocaleDateString('en-US', { weekday: 'long' });
      if (day !== 'Sunday' && weekdays[day]?.selected) {
        allDates.push({
          mapping:id,
          date: start.toISOString().split('T')[0],
          start_time: weekdays[day].start_time,
          end_time: weekdays[day].end_time,
        });
      }
      start.setDate(start.getDate() + 1);
    }

    return { schedules: allDates };
  };

  const handleSubmit = async () => {
    const dataa = generateSchedule();
    setLoading(true)
    try {
      const res = await authFetch('bulk-class-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataa),
      });
      const data = await res.json()
      if(!res.ok){
        throw new Error(data.message)
      }
      setMessage("Class Schedule Successfully")
      setShowToast(true)
      setTimeout(()=>{
        setMessage("Class Schedule Successfully")
        setShowToast(false)
        setLoading(false)
        // router.push('/course/course-schedule');
      }, 2000)
    } catch (error) {
        setMessage(error)
        setShowToast(true)
        setLoading(false)
        setTimeout(()=>{
            setShowToast(false)
        }, 2000)
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white">
        {showToast && <Toast message={message}/>}
        <div className='flex justify-between gap-2 mb-2'>
      <div className="space-y-2 w-full">
        <label className="block font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="space-y-2 w-full">
        <label className="block font-medium">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          min={startDate}
          disabled={!startDate}
        />
      </div>
      </div>

      {Object.keys(weekdays).length > 0 && (
        <div className="space-y-4 mb-4 mt-4">
          <h3 className="font-semibold">Select Weekdays & Time</h3>
          {weekdayNames.map(day => (
            <div key={day} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={weekdays[day]?.selected}
                onChange={e =>
                  setWeekdays(prev => ({
                    ...prev,
                    [day]: {
                      ...prev[day],
                      selected: e.target.checked,
                    },
                  }))
                }
              />
              <label className="w-20">{day}</label>
              <input
                type="time"
                value={weekdays[day]?.start_time}
                onChange={e =>
                  setWeekdays(prev => ({
                    ...prev,
                    [day]: {
                      ...prev[day],
                      start_time: e.target.value,
                    },
                  }))
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="time"
                value={weekdays[day]?.end_time}
                onChange={e =>
                  setWeekdays(prev => ({
                    ...prev,
                    [day]: {
                      ...prev[day],
                      end_time: e.target.value,
                    },
                  }))
                }
                className="border px-2 py-1 rounded"
              />
            </div>
          ))}
        </div>
      )}
<hr className=" border border-b-2 mt-3 mb-6"/>
      <button
        onClick={handleSubmit}
        className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-100 hover:text-red-800"
      >
        Submit Schedule
      </button>
    </div>
  );
}
