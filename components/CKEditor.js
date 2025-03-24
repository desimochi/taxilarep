"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; 
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Toast from "@/components/Toast"; 
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import { 
    Bold, Italic, Link as LinkIcon, 
    Underline as UnderlineIcon, List, 
    ListOrdered, Table as TableIcon, 
    Trash, Heading1, Heading2, Heading3, 
    Plus, Minus, X, 
    ImageIcon,
    FileIcon,
    TrashIcon,
    SaveIcon
} from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function RichTextEditor({id}) {
    const [showTableOptions, setShowTableOptions] = useState(false);
    const [editorContent, setEditorContent] = useState("<p>Loading content...</p>");
    const router = useRouter(); 
    const[message, setMessage]= useState("")
    const[showtoast, setShowToast] = useState(false)
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
      const [uploadedFiles, setUploadedFiles] = useState([]);
      const [isSaving, setIsSaving] = useState(false);
    const imageInputRef = useRef(null);
const fileInputRef = useRef(null);
const searchParams = useSearchParams();
const subID = searchParams.get("subID");
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ HTMLAttributes: { class: "text-blue-700 cursor-pointer" } }),
            Underline,
            Image, 
            BulletList.configure({ HTMLAttributes: { class: "list-disc ml-4" } }),  
            OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-4" } }),  
            ListItem,
            Table.configure({ HTMLAttributes: { class: "w-full" } }),
            TableRow,
            TableCell.configure({ HTMLAttributes: { class: "border border-gray-400 px-3 py-2 min-h-[40px]" } }), 
            TableHeader.configure({ HTMLAttributes: { class: "border border-gray-500 bg-gray-200 px-3 py-2 font-bold" } }) 
        ],
        content: "<p>Start typing here...</p>",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authFetch(`subject-mapping-syllabus/${subID}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEditorContent(data.data.description || "<p>Start typing here...</p>");
                    if (editor) {
                        editor.commands.setContent(data.data.description || "<p>Start typing here...</p>");
                    }
                } else {
                    setEditorContent("<p>Start typing here...</p>");
                    if (editor) {
                        editor.commands.setContent( "<p>Start typing here...</p>");
                    }
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };

        fetchData();
    }, [subID, editor]);
    useEffect(() => {
        if (!editor) return;

        editor.on("update", () => {
            const html = editor.getHTML();

            // Ensure there's always a paragraph after the table
            if (html.includes("<table") && !html.match(/<p>(.*?)<\/p>/g)) {
                editor.commands.insertContent("<p><br/></p>");
            }
        });
    }, [editor]);

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows, cols }).run();
        editor.commands.insertContent("<p><br/></p>");
        setShowTableOptions(false);
    };

    const removeTable = () => {
        editor.chain().focus().deleteTable().run();
    };

    const addRow = () => {
        editor.chain().focus().addRowAfter().run();
    };

    const deleteRow = () => {
        editor.chain().focus().deleteRow().run();
    };

    const addColumn = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    const deleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
    };

    const addLink = () => {
        if (!editor) return;
    
        const url = prompt("Enter URL:");
        if (!url) return;
    
        // Extract domain from URL
        const urlObject = new URL(url, window.location.origin);
        const domain = urlObject.hostname.replace("www.", ""); // Remove 'www.' if present
    
        const previousText = editor.state.selection.empty ? "" : editor.state.selection.content().text;
    
        // If no text is selected, use the domain as link text
        let linkText = previousText || domain;
    
        if (linkText) {
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${url}" target="_blank">${linkText}</a>`)
                .run();
        }
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!editor) return;
            const editorContainer = document.getElementById("editor-container");
    
            if (editorContainer && !editorContainer.contains(e.target)) {
                editor.commands.insertContent("<p><br/></p>");
                editor.commands.focus();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [editor]);
const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/upload-file", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();

            const newFile = {
                url: data.fileUrl, // ✅ URL received from backend
                name: file.name,
                id: data.fileId, // ✅ Store ID for deletion
            };

            setUploadedFiles((prev) => [...prev, newFile]);

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
const deleteFile = async (fileUrlToDelete) => {
    if (!fileUrlToDelete) return;
  
    try {
      await fetch(`/api/delete-file?fileId=${encodeURIComponent(fileUrlToDelete)}`, {
        method: "DELETE",
      });
  
      // ✅ Remove from the state using file URL
      setUploadedFiles((prev) =>
        prev.filter((file) => file.url !== fileUrlToDelete)
      );
  
      // ✅ Remove from editor content
      const safeFileUrl = fileUrlToDelete.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters in the URL
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
  const handleSave = async () => {
    if (!editor) return;

    const htmlContent = editor.getHTML(); // ✅ Get HTML content

    setIsSaving(true); // ✅ Show loading state

    try {
        const response = await authFetch(`subject-mapping-syllabus/${subID}`, { // ✅ Update your API route
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({mapping:id, description: htmlContent }),
        });

        if (response.ok) {
            setMessage("Syllabus Updates Successfully")
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
                router.push("/syllabus/see-syllabus"); 
            }, 2000)
            
        } else {
            alert("Failed to save content ❌");
        }
    } catch (error) {
        console.error("Error saving content:", error);
    } finally {
        setIsSaving(false); // ✅ Hide loading state
    }
};

    if (!editor) return null;

    return (
        <div id="editor-container" className="border border-gray-300 rounded-md p-4">
            {showtoast && <Toast message={message} /> }
            {/* Toolbar */}
            <div className="flex space-x-2 bg-gray-200 p-2 rounded-lg">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}><List /></button>
                <button type="button" onClick={addLink}><LinkIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered /></button>
                {/* Upload Image Button */}
<button type="button" onClick={() => imageInputRef.current.click()} className="p-2 rounded bg-gray-300 dark:bg-gray-600">
    <ImageIcon className="w-5 h-5 text-black dark:text-white" />
</button>
<input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "image")} />

{/* Upload File Button */}
<button type="button" onClick={() => fileInputRef.current.click()} className="p-2 rounded bg-gray-300 dark:bg-gray-600">
    <FileIcon className="w-5 h-5 text-black dark:text-white" />
</button>
<input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "file")} />

                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 /></button>

                <button type="button" onClick={() => setShowTableOptions(!showTableOptions)}><TableIcon /></button>
                <button type="button" onClick={removeTable} className="text-red-500"><Trash /></button>

            </div>

            {/* Table Options */}
            {showTableOptions && (
                <div className="bg-white border p-4 rounded-lg shadow-md mt-2 flex  items-center  gap-3">
                    <div className="flex space-x-2 items-center">
                        <label>Rows:</label>
                        <input 
                            type="number" 
                            value={rows} 
                            onChange={(e) => setRows(parseInt(e.target.value) || 1)} 
                            className="border px-2 py-1 w-16 text-center"
                        />
                    </div>
                    <div className="flex space-x-2 items-center">
                        <label>Columns:</label>
                        <input 
                            type="number" 
                            value={cols} 
                            onChange={(e) => setCols(parseInt(e.target.value) || 1)} 
                            className="border px-2 py-1 w-16 text-center"
                        />
                    </div>
                    <button 
                        className="bg-red-600 text-white px-4 py-2 rounded-md "
                        onClick={insertTable}
                    >
                        Insert Table
                    </button>
                </div>
            )}

            {/* Table Controls */}
            {editor && editor.isActive("table") && (
                <div className="bg-gray-100 p-2 rounded-lg flex  mt-2 gap-3 text-sm">
                    <button type="button" className="bg-gray-300 p-1 items-center flex gap-1 rounded" onClick={addRow}><Plus className="h-3 w-3"/> Row</button>
                    <button type="button" className="bg-gray-300 p-1 items-center flex gap-1 rounded" onClick={deleteRow}><Minus className="h-3 w-3"/> Row</button>
                    <button type="button" className="bg-gray-300 p-1 items-center flex gap-1  rounded" onClick={addColumn}><Plus className="h-3 w-3"/> Column</button>
                    <button type="button" className="bg-gray-300 p-1 items-center flex gap-1  rounded" onClick={deleteColumn}><Minus  className="h-3 w-3"/> Column</button>
                </div>
            )}

            {/* Editor */}
            <div className="mt-2 border border-gray-300 rounded-lg p-4">
                <EditorContent 
                    editor={editor} 
                    className="prose min-h-[200px] focus:outline-none"
                />
            </div>

            <style jsx>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
            `}</style>
             {uploadedFiles.length > 0 && (
              <div className="mt-2 p-2 bg-gray-100 rounded dark:bg-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
                  Uploaded Files & Images:
                </h3>
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
                      <button type="button"
                        onClick={() => deleteFile(file.url)} // ✅ Pass file ID
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                
              </div>
            )}
            <button 
                    type="button" 
                    onClick={handleSave} 
                    className="bg-red-700 text-white px-8 py-2 rounded-md flex items-center gap-2 mt-3"
                    disabled={isSaving} // ✅ Disable when saving
                >
                    <SaveIcon className="h-4 w-4" />
                    {isSaving ? "Updating..." : "Update"}
                </button>
        </div>
    );
}
