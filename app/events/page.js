"use client"
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isToday, isSameDay } from "date-fns";
export default function Page(){
    const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [popoverDate, setPopoverDate] = useState(null);

  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const events = [
    { title: "Meeting with Bob", date: "2025-02-26T10:00:00" },
    { title: "Project Deadline", date: "2025-02-28T15:00:00" },
     { title: "Dentist Appointment", date: "2025-01-30T09:00:00" },
  ];

  // Generate days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Generate empty days for the first week of the month
  const startDay = getDay(daysInMonth[0]);
  const emptyDays = Array(startDay).fill(null);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setPopoverDate(date);
  };
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const handleAddTask = (title) => {
    if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
      alert("You cannot add tasks to a past date.");
      return;
    }
  
    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }
  
    const newTask = { title, date: selectedDate };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setPopoverDate(null); // Close the popover
  };
  
  // Filter events for the selected date
  const filteredEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );
  const filteredTasks = tasks.filter((task) =>
    isSameDay(new Date(task.date), selectedDate)
  );
    return ( 
        <section className="relative bg-stone-50">
        <div className="bg-red-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
        <div className="bg-red-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
        <div className="bg-red-300 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
        <div className="w-full pt-24 relative z-10 backdrop-blur-3xl">
          <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
            <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
              <div className="col-span-12 xl:col-span-5">
                <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">Upcoming Events</h2>
                <p className="text-lg font-normal text-gray-600 mb-8">Don’t miss schedule</p>
                <div className="flex gap-5 flex-col">
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                        <p className="text-base font-medium text-gray-900">Jan 10,2020 - 10:00 - 11:00</p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button type="button" data-target="dropdown-default" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600  ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="2.5" strokeLinecap="round"></path>
                          </svg>
                          
                        </button>
                        <div id="dropdown-default" className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden" aria-labelledby="dropdown-default">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                               Remove
                              </a>
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">Meeting with a friends</h6>
                    <p className="text-base font-normal text-gray-600">Meet-Up for Travel Destination Discussion</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        <p className="text-base font-medium text-gray-900">Jan 10,2020 - 05:40 - 13:00</p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button type="button" data-target="dropdown-a" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-sky-400  ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="2.5" strokeLinecap="round"></path>
                          </svg>
                          
                        </button>
                        <div id="dropdown-a" className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden" aria-labelledby="dropdown-a">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                               Remove
                              </a>
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">Visiting online courcse</h6>
                    <p className="text-base font-normal text-gray-600">Checks updates for design course</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                        <p className="text-base font-medium text-gray-900">Jan 14, 2020 10:00 - 11:00</p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button type="button" data-target="dropdown-b" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-emerald-600  ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="2.5" strokeLinecap="round"></path>
                          </svg>
                          
                        </button>
                        <div id="dropdown-b" className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden" aria-labelledby="dropdown-b">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                               Remove
                              </a>
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">Development meet</h6>
                    <p className="text-base font-normal text-gray-600">Discussion with developer for upcoming project</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <h5 className="text-xl leading-8 font-semibold text-gray-900">{format(currentMonth, "MMMM yyyy")}</h5>
                    <div className="flex items-center">
                      <button onClick={handlePrevMonth} className="text-red-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                      <button onClick={handleNextMonth} className="text-red-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center rounded-md p-1 bg-red-50 gap-px">
                    <button className="py-2.5 px-5 rounded-lg bg-red-50 text-red-600 text-sm font-medium transition-all duration-300 hover:bg-red-600 hover:text-white">Add New Event</button>
                  </div>
                </div>
                <div className="border border-red-200 rounded-xl">
                  <div className="grid grid-cols-7 rounded-t-3xl border-b border-red-200">
                  {daysOfWeek.map((day) => (
          <div className="py-3.5 border-r rounded-tl-xl border-red-200 bg-red-50 flex items-center justify-center text-sm font-medium text-red-600" key={day}>{day}</div>
        ))}
                    
                  </div>
                  <div className="grid grid-cols-7 rounded-b-xl">
                  {emptyDays.map((_, index) => (
          <div key={index} className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-red-50 cursor-pointer"></div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.toISOString()}
            onClick={() => handleDateClick(day)}
            className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-red-200 transition-all duration-300 hover:bg-red-50 cursor-pointer 
              ${isToday(day) ? "bg-red-300 text-red-800" : ""} 
              ${isSameDay(day, selectedDate) ? "bg-gray-700 text-white" : "hover:bg-red-300"}`}
          >
            <span>{format(day, "d")}</span>
            <div className="mt-1">
                        {events
                          .filter((event) =>
                            isSameDay(new Date(event.date), day)
                          )
                          .map((event, index) => (
                            <p key={index} className="text-xs text-gray-600">
                              {event.title}
                            </p>
                          ))}
                      </div>
          </div>
        ))}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {popoverDate && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">
              Events for {format(popoverDate, "PPP")}
            </h3>
            <ul className="my-4">
              {filteredEvents.map((event, index) => (
                <li key={index} className="mb-2">
                  {event.title}
                </li>
              ))}
              {filteredTasks.map((task, index) => (
                <li key={index} className="mb-2">
                  {task.title}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add New Task"
              className="w-full p-2 border rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleAddTask(e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => setPopoverDate(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="rounded-xl border border-gray-300 mx-12 ">
        <h3 className="text-center mt-3 font-semibold text-2xl">Previous Events</h3>
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                   S.no.
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Event Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Event Date
                </th>
                <th scope="col" className="px-6 py-3">
                   Venue
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
            <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
            <td className="px-6 py-4">
                   1
                </td>
               
                <td className="px-6 py-4">
                   Management Conclave
                </td>
                <td className="px-6 py-4">
                    14/05/2024
                </td>
                <td className="px-6 py-4">
                    Taxila Business School - Auditirioum
                </td>
                <td className="px-6 py-4">
                    Management Meet
                </td>
              
            </tr>
        </tbody>
    </table>
    </div>
      </section>
                                            
    )
}