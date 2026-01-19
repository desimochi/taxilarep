"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import { authFetch } from "@/app/lib/fetchWithAuth";
import toast from "react-hot-toast";
import { 
  Plus, 
  X, 
  Users, 
  Flag, 
  Calendar, 
  Clock, 
  FileText,
  Send,
  Loader2
} from "lucide-react";
import { GlobalContext } from "@/components/GlobalContext";

export default function TaskCreator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
const {state} = useContext(GlobalContext);


  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    start_date_time: "",
    due_date_time: "",
    employee_id: "",
  });

  /* ---------- FETCH EMPLOYEES ---------- */
 useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await authFetch("all-employee_list");
      const json = await res.json();

      // ✅ SHOW ALL EMPLOYEES
      setEmployees(json.data || []);
    } catch (err) {
      console.error("Failed to load employees", err);
    }
  };

  fetchEmployees();
}, []);


  /* ---------- INIT EDITOR ---------- */
  useEffect(() => {
    if (isModalOpen && editorContainerRef.current && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
        placeholder: "Describe the task in detail, add requirements, deadlines, and any important notes...",
        inlineToolbar: true,
        tools: {
          header: Header,
          list: List,
          checklist: Checklist,
          quote: Quote,
          warning: Warning,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          table: Table,
          code: CodeTool,
          marker: Marker,
          underline: Underline,
        },
      });
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [isModalOpen]);

  /* ---------- FORM HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSelect = (e) => {
    setFormData(prev => ({ ...prev, employee_id: e.target.value }));
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      priority: "medium",
      start_date_time: "",
      due_date_time: "",
      employee_id: "",
    });
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const description = await editorRef.current.save();

      const payload = {
        title: formData.title,
        description,
        assigned_to: formData.employee_id,
        assigned_by: state?.user_id,
        priority: formData.priority,
        start_date_time: formData.start_date_time,
        due_date_time: formData.due_date_time,
      };

      const res = await authFetch("employee-task-viewset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Task created successfully! 🎉");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-zinc-950 to-gray-950 text-white px-6 py-3 rounded-lg font-semibold hover:from-zinc-900 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Plus className="h-5 w-5" />
        Create New Task
      </button>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn"
          onClick={handleClose}
        >
          <div 
            className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-950 to-gray-950 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Create New Task</h2>
                    <p className="text-zinc-100 text-sm mt-1">Assign tasks to your team members</p>
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Task Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Task Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a clear and concise task title..."
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg font-medium focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 transition-all outline-none"
                  required
                />
              </div>

              {/* Assigned To */}
              <div className="bg-gradient-to-br from-gray-50 to-zinc-50 rounded-xl p-5 space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <Users className="h-4 w-4 text-gray-500" />
                  Assign To Team Member
                </label>
                <select
                  value={formData.employee_id}
                  onChange={handleEmployeeSelect}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-white focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 transition-all outline-none font-medium"
                  required
                >
                  <option value="">Select a team member...</option>
                  {employees.map(emp => (
                    <option 
                      key={emp.id} 
                      value={emp.id}
                    >
                      👤 {emp.first_name} {emp.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <Flag className="h-4 w-4 text-gray-500" />
                  Priority Level
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-white focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 transition-all font-medium outline-none"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
              </div>

              {/* Dates */}
              <div className="bg-gradient-to-br from-gray-50 to-zinc-50 rounded-xl p-5 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Task Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="start_date_time"
                      value={formData.start_date_time}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-white focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 transition-all font-medium outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      Due Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="due_date_time"
                      value={formData.due_date_time}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-white focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 transition-all font-medium outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Task Description & Requirements
                </label>
                <div 
                  ref={editorContainerRef} 
                  className="border-2 border-gray-200 rounded-xl p-6 bg-white min-h-[300px] focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-200 transition-all"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-100 bg-gray-50 p-5">
              <div className="flex items-center justify-between gap-4">
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-zinc-950 to-gray-950 text-white rounded-lg font-semibold hover:from-zinc-900 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Creating Task...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Create Task
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}