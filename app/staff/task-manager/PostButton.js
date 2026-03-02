'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // 1. Import createPortal
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import Raw from '@editorjs/raw';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import { authFetch } from '@/app/lib/fetchWithAuth';
import toast from 'react-hot-toast';

export default function TaskCreator({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // New state to ensure client-side rendering
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    title: '',
    assigned_to: '',
    assigned_by: '',
    priority: 'medium',
    start_date_time: '',
    due_date_time: '',
  });

  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);

  useEffect(() => {
    setMounted(true); // Confirm we are on the client
  }, []);

  // Initialize EditorJS
  useEffect(() => {
    // Only init if modal is open AND the container ref exists
    if (isModalOpen && editorContainerRef.current && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
        placeholder: 'Start writing your task description...',
        inlineToolbar: ['marker', 'link', 'bold', 'italic', 'underline', 'inlineCode'],
        tools: {
          header: Header,
          list: List,
          checklist: Checklist,
          quote: Quote,
          warning: Warning,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          image: SimpleImage,
          linkTool: LinkTool,
          embed: Embed,
          table: Table,
          code: CodeTool,
          raw: Raw,
          marker: Marker,
          underline: Underline,
        },
      });
    }

    return () => {
      // Cleanup is tricky with EditorJS + React Strict Mode
      // We often leave it unless the component unmounts completely
    };
  }, [isModalOpen]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      assigned_to: id,
      assigned_by: id,
    }));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      assigned_to: id,
      assigned_by: id,
      priority: 'medium',
      start_date_time: '',
      due_date_time: '',
    });
    setMessage({ type: '', text: '' });

    if (editorRef.current) {
      editorRef.current.clear();
      // Optional: destroy to ensure clean state on next open
      editorRef.current.destroy();
      editorRef.current = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!editorRef.current) return;

      const editorData = await editorRef.current.save();

      const payload = {
        title: formData.title,
        description: editorData,
        assigned_to: Number(formData.assigned_to),
        assigned_by: Number(formData.assigned_by),
        priority: formData.priority,
        start_date_time: formData.start_date_time,
        due_date_time: formData.due_date_time,
      };

      const res = await authFetch('employee-task-viewset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed');

      toast.success('Task created successfully!');
      
      // Delay closing slightly to show success
      setTimeout(() => {
        setIsModalOpen(false);
        resetForm();
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error(err);
      toast.error('Error creating task');
    }
  };

  // Define the Modal JSX
  const modalContent = isModalOpen ? (
    <div
      onClick={() => setIsModalOpen(false)}
      // Z-Index here now works perfectly because it's at the body level
      className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-start overflow-y-auto p-4 sm:p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl mt-10 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 text-white rounded-t-xl bg-zinc-900">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-3xl hover:text-gray-300 transition leading-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
               <input
                name="title"
                placeholder="e.g. Update Homepage Design"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div
                ref={editorContainerRef}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[150px] prose max-w-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-black outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      name="start_date_time"
                      value={formData.start_date_time}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                      required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Time</label>
                    <input
                      type="datetime-local"
                      name="due_date_time"
                      value={formData.due_date_time}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                      required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition shadow-lg"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-zinc-900 text-white rounded-lg px-6 py-2.5 font-medium shadow-md hover:bg-zinc-800 transition active:scale-95 flex items-center gap-2"
      >
        <span>+</span> Create Task
      </button>

      {/* 2. Teleport the modal to document.body */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}