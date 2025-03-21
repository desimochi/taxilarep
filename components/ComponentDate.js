"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useRef, useState, useEffect } from "react";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Underline as UnderlineIcon,
  File as FileIcon,
  TrashIcon
} from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "./Toast";
export default function ComponentDate({ id, setsetStudents,setEditDetails, subcomponent  }) {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const[message, setmessag] = useState("")
  const[showToast, setShowToast] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Link, Underline, Image],
    content: "",
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });
  useEffect(() => {
    const handleUnload = async () => {
      if (uploadedFiles.length > 0) {
        try {
          for (const file of uploadedFiles) {
            await fetch(`/api/delete-file?fileId=${encodeURIComponent(file.id)}`, {
              method: "DELETE",
            });
          }
          console.log("All uploaded files deleted on page refresh.");
        } catch (error) {
          console.error("Failed to delete files on unload:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [uploadedFiles]);
  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add link to the editor
  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Handle file/image upload
  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: uploadData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFiles((prev) => [
          ...prev,
          { url: data.fileUrl, name: file.name, id: data.fileId },
        ]);

        if (type === "image") {
          editor.commands.insertContent(
            `<img src="${data.fileUrl}" class="h-30 w-30"/>`
          );
        } else {
          editor.commands.insertContent(
            `<a href="${data.fileUrl}" target="_blank">${file.name}</a>`
          );
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Delete file from state and editor
  const deleteFile = async (fileUrlToDelete) => {
    if (!fileUrlToDelete) return;

    try {
      await fetch(`/api/delete-file?fileId=${encodeURIComponent(fileUrlToDelete)}`, {
        method: "DELETE",
      });

      // ✅ Remove from state
      setUploadedFiles((prev) =>
        prev.filter((file) => file.url !== fileUrlToDelete)
      );

      // ✅ Remove from editor content
      const safeFileUrl = fileUrlToDelete.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      editor.commands.setContent(
        editor.getHTML().replace(
          new RegExp(
            `<img[^>]+src=["']${safeFileUrl}["'][^>]*>|<a[^>]+href=["']${safeFileUrl}["'][^>]*>.*?</a>`,
            "g"
          ),
          ""
        )
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = subcomponent? "sub-component" : "component-viewset"
    const data = {
      ...formData,
      description: editor.getHTML()
    };

    try {
      const response = await authFetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json()
      if (response.ok) {
        setmessag(res.message)
        setShowToast(true)
        setTimeout(() => {
            setFormData({ start_date: "", end_date: "" });
        editor.commands.clearContent();
        setUploadedFiles([]);
        setsetStudents(res.data)
        setEditDetails(false)
        }, 2000);
        
      } else {
        console.error("Submission failed:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!editor) return null;

  return (
    <>
    {showToast && <Toast message={message}/>}
      <div className="px-4 py-5">
        <div className="flex gap-2">
          {/* Start Date */}
          <div className="w-1/2">
            <label className="font-bold">Start Date</label>
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {/* End Date */}
          <div className="w-1/2">
            <label className="font-bold">End Date</label>
            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex space-x-4 bg-gray-200 p-2 rounded-lg mt-4">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <BoldIcon />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <ItalicIcon />
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon />
          </button>
          <button onClick={addLink}>
            <LinkIcon />
          </button>
          <button onClick={() => imageInputRef.current.click()}>
            <ImageIcon />
          </button>
          <button onClick={() => fileInputRef.current.click()}>
            <FileIcon />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e, "file")}
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e, "image")}
          />
        </div>

        {/* Editor */}
        <div
  className="mt-2 border border-gray-300 rounded-lg p-2 bg-white dark:bg-gray-600 overflow-y-auto"
  style={{ maxHeight: "400px" }} // ✅ Fixed height for scrolling
>
  <EditorContent editor={editor} />
</div>

<style jsx>{`
  .ProseMirror img {
    width: auto;
    height: 300px; // ✅ Fixed image height
    object-fit: contain; // ✅ Maintain aspect ratio
    display: block;
    margin: 0 auto;
  }
`}</style>

        {/* Uploaded Files */}
        {uploadedFiles.map((file) => (
          <div key={file.id} className="flex items-center gap-2 mt-2">
            <a href={file.url} target="_blank" className="text-blue-600">
              {file.name}
            </a>
            <button onClick={() => deleteFile(file.url)} className="text-red-500">
              <TrashIcon />
            </button>
          </div>
        ))}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 mt-4 rounded"
        >
          Submit
        </button>
      </div>
    </>
  );
}
