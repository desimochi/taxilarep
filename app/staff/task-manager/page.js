"use client";

import { useContext, useEffect, useState } from "react";
import { Calendar, Clock, Loader2, GripVertical } from "lucide-react";
import BackButton from "@/components/ui/Backbutton";
import TaskCreator from "./PostButton";
import TaskDetailModal from "./TaskDetails"; 
import { GlobalContext } from "@/components/GlobalContext";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function TaskManagerPage() {
  const { state } = useContext(GlobalContext);
  const userId = state?.user_id;
 
  const [tasksByDate, setTasksByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Drag and Drop State
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);

  useEffect(() => {
    if (!userId) return;

    authFetch(`task-employee-wise/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const grouped = groupTasksByDate(data.data || []);
        setTasksByDate(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Task fetch error", err);
        setLoading(false);
      });
  }, [userId]);

  const handleDragStart = (task, sourceDate) => {
    setDraggedTask({ task, sourceDate });
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverDate(null);
  };

  const handleDrop = async (targetDate) => {
    if (!draggedTask || draggedTask.sourceDate === targetDate) {
      setDraggedTask(null);
      setDragOverDate(null);
      return;
    }

    const { task, sourceDate } = draggedTask;
    
    // Optimistic UI Update
    const updatedTasksByDate = { ...tasksByDate };
    
    // Remove from source
    updatedTasksByDate[sourceDate] = updatedTasksByDate[sourceDate].filter(t => t.id !== task.id);
    if (updatedTasksByDate[sourceDate].length === 0) {
      delete updatedTasksByDate[sourceDate];
    }
    
    // Add to target
    const updatedTask = {
      ...task,
      start_date_time: `${targetDate}T${task.start_date_time.split('T')[1]}`
    };
    
    if (!updatedTasksByDate[targetDate]) {
      updatedTasksByDate[targetDate] = [];
    }
    updatedTasksByDate[targetDate].push(updatedTask);
    
    setTasksByDate(updatedTasksByDate);
    setDraggedTask(null);
    setDragOverDate(null);

    // API Call
    try {
      await authFetch(`employee-task-viewset/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_date_time: updatedTask.start_date_time })
      });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <div className="max-w-[1920px] mx-auto">
        {/* Responsive Header */}
        <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="mb-4">
            <BackButton />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Task Board</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your daily workflow</p>
            </div>
            <div className="w-full sm:w-auto">
               <TaskCreator id={userId} />
            </div>
          </div>
        </div>

        {/* Board Container */}
        <div className="p-4 sm:p-6">
          {loading && (
            <div className="flex flex-col justify-center items-center h-64 w-full">
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-3" />
              <p className="text-gray-500 font-medium">Loading your tasks...</p>
            </div>
          )}

          {!loading && Object.keys(tasksByDate).length === 0 && (
            <div className="flex flex-col justify-center items-center h-[50vh] text-center p-6 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-900 font-semibold text-lg">No tasks found</p>
              <p className="text-gray-500 text-sm mt-1 max-w-xs">You're all caught up! create a new task to get started.</p>
            </div>
          )}

          {!loading && Object.keys(tasksByDate).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* UPDATED SORTING HERE: .sort().reverse() */}
              {Object.keys(tasksByDate).sort().reverse().map((date) => (
                <DayColumn
                  key={date}
                  date={date}
                  tasks={tasksByDate[date]}
                  onTaskClick={setSelectedTask}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  isDragOver={dragOverDate === date}
                  onDragOver={setDragOverDate}
                  isDragging={draggedTask?.sourceDate === date}
                />
              ))}
            </div>
          )}
        </div>

        {/* Task Detail Modal */}
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdated={() => {
              if(!userId) return;
              authFetch(`task-employee-wise/${userId}`)
                .then((res) => res.json())
                .then((data) => setTasksByDate(groupTasksByDate(data.data || [])));
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- COLUMN COMPONENT ---------------- */

function DayColumn({ 
  date, 
  tasks, 
  onTaskClick, 
  onDragStart, 
  onDragEnd, 
  onDrop,
  isDragOver,
  onDragOver,
  isDragging
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(date);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget === e.target) {
      onDragOver(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(date);
  };

  const isToday = new Date(date).toDateString() === new Date().toDateString();

  return (
    <div 
      className={`
        flex flex-col 
        w-full h-fit
        bg-gray-100/50 sm:bg-gray-100 rounded-2xl 
        border border-gray-200 
        transition-all duration-300
        ${isDragOver ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`p-4 rounded-t-2xl border-b border-gray-200/60 ${isToday ? 'bg-white shadow-sm' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className={`text-base font-bold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {formatDate(date)}
            </h2>
            {isToday && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            )}
          </div>
          <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md">
            {tasks.length}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
           <div 
             className="h-full bg-blue-500 transition-all duration-500" 
             style={{ width: `${(tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100}%` }} 
           />
        </div>
      </div>

      {/* Task List */}
      <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={() => onTaskClick(task)}
            onDragStart={() => onDragStart(task, date)}
            onDragEnd={onDragEnd}
          />
        ))}
        
        {isDragOver && (
          <div className="h-24 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">Drop here</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- TASK CARD COMPONENT ---------------- */

function TaskCard({ task, onClick, onDragStart, onDragEnd }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  const priorityColor = getPriorityColor(task.priority);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      className={`
        group relative bg-white rounded-xl p-4 
        shadow-sm border border-gray-100 
        hover:shadow-md hover:border-blue-200 
        transition-all duration-200 cursor-pointer select-none
        active:scale-[0.98]
        ${isDragging ? 'opacity-40 rotate-2' : ''}
      `}
    >
      <div 
        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full" 
        style={{ backgroundColor: priorityColor }}
      />

      <div className="pl-3">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
            {task.title}
          </h3>
          <GripVertical className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100 sm:hidden" />
        </div>

        <p className="text-gray-500 text-xs line-clamp-2 mb-3">
            {getDescriptionPreview(task.description)}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md">
            <Clock className="h-3 w-3" />
            <span>{formatTime(task.due_date_time)}</span>
          </div>
          
          <StatusBadge status={task.status} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatusBadge({ status }) {
  const style = getStatusBadgeStyle(status);
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded-md ${style}`}>
      {status || "Pending"}
    </span>
  );
}

function getStatusBadgeStyle(status) {
  switch (status?.toLowerCase()) {
    case "completed": return "bg-green-50 text-green-700 border border-green-100";
    case "in progress": return "bg-blue-50 text-blue-700 border border-blue-100";
    case "pending": return "bg-amber-50 text-amber-700 border border-amber-100";
    case "overdue": return "bg-red-50 text-red-700 border border-red-100";
    default: return "bg-gray-50 text-gray-600 border border-gray-200";
  }
}

function getPriorityColor(priority) {
  switch (priority?.toLowerCase()) {
    case "high": return "#ef4444";
    case "medium": return "#f59e0b";
    case "low": return "#10b981";
    default: return "#9ca3af";
  }
}

function groupTasksByDate(tasks) {
  return tasks.reduce((acc, task) => {
    if(!task.start_date_time) return acc;
    const date = task.start_date_time.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if(isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(dateTime) {
  const d = new Date(dateTime);
  if(isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function getDescriptionPreview(description) {
  if (!description) return "No description provided.";
  if (typeof description === "string") return description;
  if (typeof description === "object" && description.blocks && Array.isArray(description.blocks)) {
    const firstBlock = description.blocks.find(b => b.type === 'paragraph' || b.type === 'header');
    if (firstBlock && firstBlock.data && firstBlock.data.text) {
      return firstBlock.data.text.replace(/<[^>]*>?/gm, '');
    }
    return "Click to view details...";
  }
  return "Complex content...";
}