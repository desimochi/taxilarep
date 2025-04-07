"use client"
import { use, useState, useEffect, useContext } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isToday, isSameDay, set } from "date-fns";
import Toast from "@/components/Toast";
import { GlobalContext } from "@/components/GlobalContext";
import { CrossIcon, PlusIcon, TrashIcon } from "lucide-react";
import { authFetch } from "../lib/fetchWithAuth";
import Link from "next/link";
export default function Page(){
    const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const{state} = useContext(GlobalContext)
  const[events, setEvents] = useState([]);
  const[showPopup, setShowPopup] = useState(false);
  const[loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
      date: "",
    name: "",
    venue : "",
    type: "",
  })
  const today = new Date().toISOString().split("T")[0];
  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
 useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await authFetch("events-viewset");
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
 },[])

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

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  async function handleEventPost() {
    setLoading(true)
    setFormErrors({});
    try {
      const response = await authFetch("events-viewset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        let errors = {};
        
        // Extracting errors and assigning them to the correct field
        data.message.forEach((msg) => {
          const [field, errorMsg] = msg.split(": "); // Extract field and error message
          errors[field.trim()] = errorMsg.trim(); // Assign error to respective field
        });

        setFormErrors(errors);
        throw new Error("Validation Errors")
      }
  
      
      setMessage("Event posted successfully!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.reload(); 
        setShowPopup(false)// Reload the page to see the new event
      }, 2000); // Hide toast after 3 seconds
    } catch (error) {
      console.error("Error posting event:", error);

    } finally{
      setLoading(false)
    }
  }
  
    return ( 
      <div>
        {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            {showToast && <Toast message={message}/>}
                           
                             <div className="bg-white p-6 rounded-lg max-w-xl shadow-md">
                              <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Post a New Event or Holiday</h2>
                                <p><CrossIcon className="h-5 w-5 rotate-45 cursor-pointer" onClick={() => setShowPopup(false)}/></p>
                                </div>
                                <hr className="border border-b-2 mt-2 mb-3"/>
                                <label className="font-bold">Event Name</label>
                                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                                    <input type="text" value={formData.name} name="name" onChange={handleChange} className="w-full border border-gray-300 mb-2 p-2 rounded"/>
                                    <label className="font-bold">Date</label>
                                    {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
                                    <input type="datetime-local" min={today} value={formData.date} name="date" onChange={handleChange} className="w-full mb-2 border border-gray-300 p-2 rounded"/>
                                    <label className="font-bold mt-3">Venue </label>
                                    {formErrors.venue && <p className="text-red-500 text-sm">{formErrors.venue}</p>}
                                    <input type="text" name="venue" placeholder="Type NA in case of festival or holiday" value={formData.venue} onChange={handleChange} className="w-full border border-gray-300 p-2 mb-2 rounded"/>
                                    <label className="font-bold mt-3">Type</label>
                                    {formErrors.type && <p className="text-red-500 text-sm">{formErrors.type}</p>}
                                    <input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
                                <hr className="border border-b-2 mt-6 mb-5"/>
                                <div className=" flex justify-start gap-4 ">
                                  
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2" onClick={handleEventPost} disabled={loading}> 
                                       <PlusIcon className="h-4 w-4"/>{loading? "Posting...." : "Post Event"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
      
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
                {events.length > 0 ? (
  events
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (latest first)
    .slice(0, 3) // Get the most recent 3 events
    .map((event, index) => (
      <div key={index} className="p-6 rounded-xl bg-white shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <p className="text-base font-medium text-gray-900">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="dropdown relative inline-flex">
            <button type="button" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
              </svg>
            </button>
          </div>
        </div>
        <h6 className="text-xl leading-8 font-semibold text-black mb-1">{event.name}</h6>
        <p className="text-base font-normal text-gray-600">{event.type}</p>
        <p className="text-base font-normal text-gray-600">{event.venue}</p>
      </div>
    ))
) : (
  <p className="text-gray-500 text-center mt-4">No events available.</p>
)}
                  
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
                  <button
  className="py-2.5 px-5 rounded-lg bg-red-50 text-red-600 text-sm font-medium transition-all duration-300 hover:bg-red-600 hover:text-white"
  onClick={() => setShowPopup(true)}
>
  Add New Event
</button>
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
          <div key={index} className="flex   p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-red-50 cursor-pointer"></div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.toISOString()}
            className={`   p-3.5 bg-white border-r border-b border-red-200 transition-all duration-300 hover:bg-red-50 text-black cursor-pointer 
              ${isToday(day) ? "bg-red-300 text-red-800" : ""} 
              ${isSameDay(day, selectedDate) ? "bg-red-200 text-black" : "hover:bg-red-300"}`}
          >
            <span>{format(day, "d")}</span>
            <div className="mt-1 ">
                        {events
                          .filter((event) =>
                            isSameDay(new Date(event.date), day)
                          )
                          .map((event, index) => (
                            <p key={index} className="text-xs text-red-800">
                              {event.name}
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
        
      <div className="rounded-xl border border-gray-300 mx-12 mt-12 ">
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
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
        {events.length > 0 && events.map((event, index) => (
  <tr key={index} className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"> 
     <td className="px-4 py-3">{index+1}</td>
    <td className="px-4 py-3">{event.name}</td>
    <td className="px-4 py-3">{event.date}</td>
    <td className="px-4 py-3">{event.venue}</td>
    <td className="px-4 py-3">{event.type}</td>
    {state.role_name !== 'Student' && (
                <span className="flex gap-1 justify-center w-fit border bg-red-100 py-0.5 mt-2 text-xs items-center px-2 text-red-700 rounded-sm hover:bg-red-100 hover:text-red-800 transition duration-300 ease-in-out">
                  <TrashIcon className="h-5 w-5" />
                </span>
          )}
  </tr>
))}
        </tbody>
    </table>
    </div>
      </section>
      </div>
                                            
    )
}