'use client';

import React, { useState, useEffect, useRef, use } from 'react';
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

export default function TaskCreator({id}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Initialize EditorJS
  useEffect(() => {
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
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
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
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!editorRef.current) return;

    // 🔥 GET RAW EDITOR DATA
    const editorData = await editorRef.current.save();

    const payload = {
      title: formData.title,
      description: editorData, // ✅ SAVE RAW JSON
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

    setMessage({ type: 'success', text: 'Task created successfully!' });
    toast.success('Task created successfully!');
    setTimeout(() => {
      setIsModalOpen(false);
      resetForm();
    }, 1500);
  } catch (err) {
    console.error(err);
    setMessage({ type: 'error', text: 'Error creating task' });
  }
};

  return (
    <div className="">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-zinc-950 text-indigo-50 rounded-md px-10 py-4  font-semibold shadow-lg hover:scale-105 transition"
      >
     Create New Task
      </button>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl rounded-xl shadow-2xl mt-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 text-white rounded-t-xl bg-gradient-to-r from-zinc-950 to-gray-950">
              <h2 className="text-xl font-bold">Create New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl hover:rotate-90 transition"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {message.text && (
                <div
                  className={`p-4 rounded-md text-sm ${
                    message.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  name="title"
                  placeholder="Task Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                  required
                />

                <div>
                  <p className="text-sm mb-2 text-gray-600">
                    Task Description
                  </p>
                  <div
                    ref={editorContainerRef}
                    className="border rounded-lg p-4 bg-gray-50 "
                  />
                </div>

                  <div>
                        <p className="text-sm mb-2 text-gray-600">
                    Priority
                  </p>
                  <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                </div>

                

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm mb-2 text-gray-600">
                    Task Start Time
                  </p>
                    
                  <input
                    type="datetime-local"
                    name="start_date_time"
                    value={formData.start_date_time}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                  </div>
                  <div>
                        <p className="text-sm mb-2 text-gray-600">
                    Task Due time
                  </p>
                  <input
                    type="datetime-local"
                    name="due_date_time"
                    value={formData.due_date_time}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-zinc-950 text-white rounded-lg hover:bg-gray-700"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
