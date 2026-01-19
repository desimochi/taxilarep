"use client";

import { use, useContext, useEffect, useState } from "react";
import { X, Calendar, Clock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import BackButton from "@/components/ui/Backbutton";
import TaskDetailModal from "./TaskDetails"; 
import { authFetch } from "@/app/lib/fetchWithAuth";

export default  function TaskManagerPage({ params }) {
  const { id: userId } = use(params);

  const [tasksByDate, setTasksByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
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
    
    const updatedTasksByDate = { ...tasksByDate };
    
    updatedTasksByDate[sourceDate] = updatedTasksByDate[sourceDate].filter(t => t.id !== task.id);
    if (updatedTasksByDate[sourceDate].length === 0) {
      delete updatedTasksByDate[sourceDate];
    }
    
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

    try {
      await authFetch(`employee-task-viewset/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_date_time: updatedTask.start_date_time })
      });
      
      console.log('Task updated successfully:', {
        taskId: task.id,
        newStartDate: updatedTask.start_date_time
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      setTasksByDate(tasksByDate);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="py-6 px-6">
        <BackButton />

        {/* Header */}
        <div className="flex justify-between items-center mt-6 mb-8 px-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Board</h1>
            <p className="text-gray-600">Organize and manage your daily tasks</p>
          </div>
        </div>

        {/* Trello Board */}
        <div className="overflow-x-auto pb-6 px-8">
          {loading && (
            <div className="flex flex-col justify-center items-center h-96 bg-white rounded-2xl shadow-sm">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-500">Loading your tasks...</p>
            </div>
          )}

          {!loading && Object.keys(tasksByDate).length === 0 && (
            <div className="flex flex-col justify-center items-center h-96 bg-white rounded-2xl shadow-sm">
              <Calendar className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No tasks assigned yet</p>
              <p className="text-gray-400 text-sm mt-2">Create your first task to get started</p>
            </div>
          )}

          {!loading && Object.keys(tasksByDate).length > 0 && (
            <div className="flex gap-5 pb-4">
              {Object.keys(tasksByDate).sort().map((date) => (
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
              authFetch(`task-employee-wise/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                  const grouped = groupTasksByDate(data.data || []);
                  setTasksByDate(grouped);
                })
                .catch((err) => console.error("Task fetch error", err));
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
      className={`flex-shrink-0 w-96 rounded-2xl p-5 transition-all duration-300 shadow-lg ${
        isDragOver 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-100 ring-4 ring-blue-400 ring-opacity-50 scale-105 shadow-2xl' 
          : 'bg-white hover:shadow-xl'
      } ${isDragging ? 'opacity-60' : 'opacity-100'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="mb-5 pb-4 border-b-2 border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className={`text-xl font-bold ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
            {formatDate(date)}
          </h2>
          {isToday && (
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              Today
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
          </div>
          <span className="text-gray-300">•</span>
          <TaskStats tasks={tasks} />
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
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
          <div className="border-3 border-dashed border-blue-400 rounded-xl p-10 text-center bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse">
            <div className="text-blue-600 font-semibold text-lg">Drop task here</div>
            <p className="text-blue-500 text-sm mt-1">Move to {formatDate(date)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- TASK STATS ---------------- */

function TaskStats({ tasks }) {
  const completed = tasks.filter(t => t.status?.toLowerCase() === 'completed').length;
  const pending = tasks.filter(t => t.status?.toLowerCase() === 'pending').length;
  const inProgress = tasks.filter(t => t.status?.toLowerCase() === 'in progress').length;

  return (
    <div className="flex items-center gap-2 text-xs">
      {completed > 0 && (
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <CheckCircle2 className="h-3 w-3" />
          {completed}
        </span>
      )}
      {pending > 0 && (
        <span className="flex items-center gap-1 text-red-600 font-medium">
          <AlertCircle className="h-3 w-3" />
          {pending}
        </span>
      )}
      {inProgress > 0 && (
        <span className="flex items-center gap-1 text-yellow-600 font-medium">
          <Loader2 className="h-3 w-3" />
          {inProgress}
        </span>
      )}
    </div>
  );
}

/* ---------------- TASK CARD COMPONENT ---------------- */

function TaskCard({ task, onClick, onDragStart, onDragEnd }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  const statusColor = getStatusColor(task.status);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      className={`bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-move border-l-[6px] hover:scale-[1.02] ${
        isDragging ? 'opacity-40 scale-95 rotate-3 shadow-2xl' : 'opacity-100 scale-100'
      }`}
      style={{ borderLeftColor: statusColor.border }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 flex-1">
          {task.title}
        </h3>
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatTime(task.due_date_time)}</span>
        </div>
        <StatusBadge status={task.status} />
      </div>
    </div>
  );
}

/* ---------------- PRIORITY BADGE ---------------- */

function PriorityBadge({ priority }) {
  const getPriorityStyle = () => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 ring-2 ring-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 ring-2 ring-amber-200";
      case "low":
        return "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 ring-2 ring-gray-200";
    }
  };

  return (
    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${getPriorityStyle()}`}>
      {priority || "Medium"}
    </span>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }) {
  const getStatusStyle = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          classes: "bg-green-500 text-white shadow-lg shadow-green-200",
          icon: <CheckCircle2 className="h-3 w-3" />
        };
      case "in progress":
        return {
          classes: "bg-yellow-500 text-white shadow-lg shadow-yellow-200",
          icon: <Loader2 className="h-3 w-3" />
        };
      case "pending":
        return {
          classes: "bg-red-500 text-white shadow-lg shadow-red-200",
          icon: <AlertCircle className="h-3 w-3" />
        };
      case "overdue":
        return {
          classes: "bg-rose-600 text-white shadow-lg shadow-rose-200",
          icon: <AlertCircle className="h-3 w-3" />
        };
      default:
        return {
          classes: "bg-gray-500 text-white shadow-lg shadow-gray-200",
          icon: <Clock className="h-3 w-3" />
        };
    }
  };

  const style = getStatusStyle();

  return (
    <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-bold ${style.classes}`}>
      {style.icon}
      {status || "Pending"}
    </span>
  );
}

/* ---------------- HELPER FUNCTIONS ---------------- */

function groupTasksByDate(tasks) {
  return tasks.reduce((acc, task) => {
    const date = task.start_date_time.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "completed":
      return { border: "#22c55e", bg: "#dcfce7" };
    case "in progress":
      return { border: "#eab308", bg: "#fef9c3" };
    case "pending":
      return { border: "#ef4444", bg: "#fee2e2" };
    case "overdue":
      return { border: "#dc2626", bg: "#fecaca" };
    default:
      return { border: "#6b7280", bg: "#f3f4f6" };
  }
}

function getPriorityColor(priority) {
  switch (priority?.toLowerCase()) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#6b7280";
  }
}