"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toast from "./Toast";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useRef, useState, useEffect, useContext, useMemo } from "react";
import { Bold as BoldIcon, Italic as ItalicIcon, Link as LinkIcon, Image as ImageIcon, Underline as UnderlineIcon, File as FileIcon, TrashIcon } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "./GlobalContext";

export default function PostNotice(){
    const { state } = useContext(GlobalContext);
    const [showToast, setShowToast] = useState(false);
    const [message, setmessage] = useState("")
    const fileInputRef = useRef(null);
    const[id, setId] = useState()
  const imageInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    valid_date: "",// Assuming this is static for now
  });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);


  const editor =  useEditor({
      extensions: [StarterKit, Link, Underline, Image],
      content: "",
      editorProps: {
        attributes: {
          spellcheck: "false",
          immediatelyRender: false, // Prevent SSR mismatch
        },
      },
    })
  
  useEffect(() => {
    if (!editor) return;
    
    if (editor.isEmpty) {
      editor.commands.setContent('<p class="text-gray-400">Write your notice description here...</p>');
    }
  }, [editor]);
  
  useEffect(() => {
    setId(state.user_id)
  }, [state]);
  
  if (!mounted || !editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const fileEntry = { name: file.name, url: fileUrl, type };

    setUploadedFiles((prev) => [...prev, fileEntry]);

    // Insert a styled file link or image anchor text into the editor
    editor.chain().focus().insertContent(
      `<img src="${fileUrl}" target="_blank" class="h-[300px] w-[300px]"/>`
    ).run();
  };

  const handleDelete = (fileUrl) => {
    // Remove from uploaded files list
    setUploadedFiles((prev) => prev.filter((file) => file.url !== fileUrl));

    // Remove from the text editor content
    editor.commands.setContent(
      editor.getHTML().replace(
        new RegExp(`<a[^>]+href=["']${fileUrl}["'][^>]*>.*?</a>`, "g"),
        ""
      )
    );
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noticeData = {
      ...formData,
      description: editor.getHTML(),
      user: id // Extracting content from the editor
    };

    try {
      const response = await authFetch("noticeboard-viewset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticeData),
      });
      const result = await response.json()
      if (result.code === 400) {
        setShowToast(false); // Reset state first
        setTimeout(() => {
          setmessage(result.message);
          setShowToast(true);
        }, 100); // Small delay ensures re-triggering
      } else {
        setShowToast(false); // Reset state first
        setTimeout(() => {
          setmessage("Notice Posted successfully");
          setShowToast(true);
        }, 100); // Small delay ensures re-triggering
      }
    } catch (error) {
      setShowToast(true);
      setmessage(error)
      setTimeout(() => setShowToast(false), 3000);
    }
  };
    return(
        <div className="border border-gray-300 mt-4 mx-80 md:mt-12 md:mx-40 rounded-md shadow-md hover:shadow-xl transition-shadow">
        {showToast && <Toast message={message} />}
            <h3 className="text-center py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Post a Notice</h3>
                <div className="grid gap-4 mb-4 grid-cols-2 px-6 pt-3">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
            onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Title of the notice"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
            onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Valid Till
                    </label>
                    <input
                      type="date"
                      name="valid_date"
                      id="valid_date"
                      value={formData.valid_date}
            onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
        Notice Description
      </label>

      {/* Toolbar */}
      <div className="flex space-x-2 bg-gray-200 p-2 rounded-lg dark:bg-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-400" : "bg-gray-300"} dark:bg-gray-600`}
        >
          <BoldIcon className="w-5 h-5 text-black dark:text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-400" : "bg-gray-300"} dark:bg-gray-600`}
        >
          <ItalicIcon className="w-5 h-5 text-black dark:text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive("underline") ? "bg-gray-400" : "bg-gray-300"} dark:bg-gray-600`}
        >
          <UnderlineIcon className="w-5 h-5 text-black dark:text-white" />
        </button>
        <button onClick={addLink} className="p-2 rounded bg-gray-300 dark:bg-gray-600">
          <LinkIcon className="w-5 h-5 text-black dark:text-white" />
        </button>
        <button onClick={() => imageInputRef.current.click()} className="p-2 rounded bg-gray-300 dark:bg-gray-600">
          <ImageIcon className="w-5 h-5 text-black dark:text-white" />
        </button>
        <button onClick={() => fileInputRef.current.click()} className="p-2 rounded bg-gray-300 dark:bg-gray-600">
          <FileIcon className="w-5 h-5 text-black dark:text-white" />
        </button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "file")} />
        <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "image")} />
      </div>

      {/* Editor */}
      <div className="mt-2 border border-gray-300 rounded-lg p-2 bg-white dark:bg-gray-600">
        <EditorContent editor={editor} className="prose dark:prose-invert focus:outline-none" />
      </div>

      {/* Uploaded Files & Images */}
      {uploadedFiles.length > 0 && (
        <div className="mt-2 p-2 bg-gray-100 rounded dark:bg-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-white">Uploaded Files & Images:</h3>
          <ul className="mt-1 space-y-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  {file.name}
                </a>
                <button onClick={() => handleDelete(file.url)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
                     </div>
                <div className="px-6 pb-6">
                    
                <button
                  type="submit"
                  className="text-white inline-flex justify-center w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Post the Notice
                </button>
            </div>
        </div>
    )
}