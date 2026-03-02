"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import { PlusCircle, X, Calendar, Clock, FileText, Activity, Bold, Italic, List, ListOrdered } from "lucide-react";
import React, { useState, useRef, useCallback, useContext } from "react";

const TextEditor = ({ value, onChange, placeholder, rows }) => {
  const textareaRef = useRef(null);

  const applyFormat = useCallback((command) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let before = value.substring(0, start);
    let after = value.substring(end);
    let insert = '';
    let cursorOffset = 0;

    switch(command) {
      case 'bold':
        insert = `**${selectedText || 'bold text'}**`;
        cursorOffset = selectedText ? 2 : 2;
        break;
      case 'italic':
        insert = `*${selectedText || 'italic text'}*`;
        cursorOffset = selectedText ? 1 : 1;
        break;
      case 'bullet':
        insert = `\n• ${selectedText || 'List item'}`;
        cursorOffset = selectedText ? 3 : 3;
        break;
      case 'number':
        insert = `\n1. ${selectedText || 'List item'}`;
        cursorOffset = selectedText ? 4 : 4;
        break;
    }

    const newValue = before + insert + after;
    const newCursorPos = selectedText ? end + (command === 'bold' ? 4 : command === 'italic' ? 2 : command === 'bullet' ? 3 : 4) : start + insert.length - cursorOffset;

    onChange({ target: { value: newValue } });
    
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  }, [value, onChange]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent transition-all">
      <div className="bg-gray-50 border-b border-gray-300 px-3 py-2 flex gap-1">
        <button
          type="button"
          onClick={() => applyFormat('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic className="h-4 w-4 text-gray-700" />
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => applyFormat('bullet')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <List className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('number')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 focus:outline-none resize-none"
        required
      />
      <div className="bg-gray-50 border-t border-gray-300 px-3 py-1.5">
        <p className="text-xs text-gray-500">{value.length} characters</p>
      </div>
    </div>
  );
};

export default function ProjectPopupForm() {
     const { state } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    project_name: "",
    project_date: "",
    project_days: "",
    project_description: "",
    project_status: "Pending",
    project_work_description: "",
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const res = await authFetch("taxila-currency-viewset", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    student: state.user_id,
    project_date: formData.project_date,
    project_name: formData.project_name,
    project_days: formData.project_days,
    project_description: formData.project_description,
    project_status: formData.project_status,
    project_work_description: formData.project_work_description,
  }),
});
      if (res.ok) {
        setMessage("✅ Project submitted successfully!");
        setFormData({
          project_name: "",
          project_date: "",
          project_days: "",
          project_description: "",
          project_status: "Pending",
          project_work_description: "",
        });
        setTimeout(() => setShowModal(false), 2000);
      } else {
        setMessage("❌ Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-10">
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 text-white flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium"
      >
        <PlusCircle className="h-5 w-5" /> Add New Project
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-red-700 to-red-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Add New Project
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-1">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.project_name}
                    onChange={(e) => updateField('project_name', e.target.value)}
                    placeholder="Enter project name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Project Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.project_date}
                      onChange={(e) => updateField('project_date', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration (Days) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.project_days}
                      onChange={(e) => updateField('project_days', e.target.value)}
                      placeholder="e.g., 30"
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Project Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.project_status}
                    onChange={(e) => updateField('project_status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                    required
                  >
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <TextEditor
                    value={formData.project_description}
                    onChange={(e) => updateField('project_description', e.target.value)}
                    placeholder="Provide a brief overview of the project objectives and goals..."
                    rows={4}
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Project"
                    )}
                  </button>
                </div>
              </div>

              {message && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  message.includes("✅") 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}