"use client"
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isToday, isSameDay } from "date-fns";

const Calendar = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

  // Filter events for the selected date
  const filteredEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl border border-gray-300 hover:shadow-xl transition-shadow">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 bg-red-50 rounded-full px-4">
        <button
          onClick={handlePrevMonth}
          className="py-2 px-3 text-red-700 hover:bg-red-700 hover:text-white rounded-full"
        >
          &larr;
        </button>
        <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={handleNextMonth}
          className="py-2 px-3 text-red-700 hover:bg-red-700 hover:text-white rounded-full"
        >
          &rarr;
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, index) => (
          <div key={index} className="text-center"></div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={`cursor-pointer text-center px-2 py-2 rounded-full transition-all 
              ${isToday(day) ? "bg-red-700 text-white" : ""} 
              ${isSameDay(day, selectedDate) ? "bg-red-500 text-black" : "hover:bg-red-300"}`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>

      {/* Selected Date Events */}
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Events on {format(selectedDate, "MMMM d, yyyy")}:</h2>
        {filteredEvents.length > 0 ? (
          <ul className="list-disc list-inside">
            {filteredEvents.map((event, index) => (
              <li key={index} className="py-1">
                <span className="font-semibold">{event.title}</span> ({format(new Date(event.date), "p")})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No events for this day.</p>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Upcoming Events:</h2>
        <ul className="list-none list-inside">
          {events
            .filter((event) => new Date(event.date) >= new Date())
            .map((event, index) => (
              <li key={index} className="py-1 text-sm bg-gray-200 rounded-lg py-2 px-5 mb-2 text-black">
                <span className="font-semibold text-sm">{event.title}</span> - {format(new Date(event.date), "MMMM d, yyyy, p")}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
