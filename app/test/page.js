"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useState } from "react";

const TextEditor = () => {
  const [files, setFiles] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Link.configure({ openOnClick: true }),
      Image,
    ],
    content: "<p>Start writing here...</p>",
  });

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const newFile = { file, url: fileUrl, name: file.name, type: file.type };

    setFiles((prevFiles) => [...prevFiles, newFile]);

    if (file.type.startsWith("image/")) {
      editor.chain().focus().setImage({ src: fileUrl }).run();
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const content = editor.getHTML();
    console.log(content)
    const formData = new FormData();
    formData.append("content", content);

    files.forEach((fileData, index) => {
      formData.append(`file_${index}`, fileData.file);
    });
    console.log(formData)
    try {
      const response = await fetch("https://your-backend.com/save", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Content saved successfully!");
      } else {
        alert("Failed to save content.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      {/* Toolbar */}
      <div className="mb-2 space-x-2 flex items-center">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border">
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border">
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 border">
          Underline
        </button>
        <button onClick={addLink} className="px-2 py-1 border">
          Add Link
        </button>
        <button onClick={removeLink} className="px-2 py-1 border">
          Remove Link
        </button>
        <input type="file" onChange={handleFileChange} className="px-2 py-1 border" />
      </div>

      {/* File Previews */}
      <div className="mt-2 flex flex-wrap gap-2">
        {files.map((fileData, index) => (
          <div key={index} className="flex items-center space-x-2">
            {fileData.type.startsWith("image/") ? (
              <img src={fileData.url} alt="Preview" className="w-[100px] h-auto rounded border" />
            ) : (
              <span className="text-sm">{fileData.name}</span>
            )}
            <button onClick={() => removeFile(index)} className="text-red-500 text-sm">
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="border p-2 min-h-[200px]" />

      {/* Submit Button */}
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Save Content
      </button>
    </div>
  );
};

export default TextEditor;
