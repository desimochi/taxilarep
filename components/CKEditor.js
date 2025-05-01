"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; 
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Toast from "@/components/Toast"; 
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import FontSize from "./FontSize"; // Import the custom extension
import FontType from "./FontType";


import { 
    Bold, Italic, Link as LinkIcon, 
    Underline as UnderlineIcon, List, 
    ListOrdered, Table as TableIcon, 
    Trash, Heading1, Heading2, Heading3, 
    Plus, Minus, X, 
    ImageIcon,
    FileIcon,
    TrashIcon,
    SaveIcon,
    Undo2Icon,
    Redo2Icon,
    ItalicIcon,
    DeleteIcon
} from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { BoldIcon } from "@heroicons/react/24/outline";

export default function RichTextEditor({id, api}) {
    const [editorContent, setEditorContent] = useState("<p>Loading content...</p>");
    const router = useRouter(); 
    const[message, setMessage]= useState("")
    const[showtoast, setShowToast] = useState(false)
    const [mounted, setMounted] = useState(false);
      const [uploadedFiles, setUploadedFiles] = useState([]);
      const [isSaving, setIsSaving] = useState(false);
    const imageInputRef = useRef(null);
const fileInputRef = useRef(null);
const searchParams = useSearchParams();
const subID = searchParams.get("subID");
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                listItem: false,
                table: false, // ✅ explicitly disable if included
  tableRow: false,
  tableCell: false,
  tableHeader: false,
              }),
            Link.configure({ HTMLAttributes: { class: "text-blue-700 cursor-pointer" } }),
            Underline,
            Image, 
            BulletList.configure({ HTMLAttributes: { class: "list-disc ml-4" } }),  
            OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-4" } }),  
            ListItem,
            Table.configure({ HTMLAttributes: { class: "w-full" } }),
            TableRow,
            TableCell.configure({ HTMLAttributes: { class: "border border-gray-400 px-3 py-2 min-h-[40px]" } }), 
            TableHeader.configure({ HTMLAttributes: { class: "border border-gray-500 bg-gray-200 px-3 py-2 font-bold" } }) ,
            FontSize,
            FontType
        ],
        content: "<p>Start typing here...</p>",
        editorProps: {
            attributes: { class: "prose p-4" },
          },
          editorProps: {
            handleDOMEvents: {
              beforeinput: () => false
            }
          },
          parseOptions: {
            preserveWhitespace: "full",
          },
          onCreate: ({ editor }) => {
            editor.view.dom.setAttribute("spellcheck", "false");
          },
          // 👇 This is the key setting
          editableContent: true,
          immediatelyRender: false,
    });
    useEffect(() => {
        setMounted(true);
      }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authFetch(`${api}/${subID}`, {
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
    }, [subID, editor, api]);

    const changeFontSize = (event) => {
        const size = event.target.value;
        editor?.chain().focus().setFontSize(size).run();
      };
      const changeFontType = (event) => {
        const family = event.target.value;
        editor?.chain().focus().setFontType(family).run();
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


  
const handleFileUpload = async (event, type) => {
    console.log("run")
    const file = event.target.files[0];
    if (!file) return;
    console.log("Uploading file:", file);

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
        const response = await authFetch(`${api}/${subID}`, { // ✅ Update your API route
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({mapping:id, description: htmlContent }),
        });

        if (response.ok) {
            setMessage(`Information Updated Successfully`)
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
const addTable = () => {
    editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true }) // Adds a 3x3 table
        .run();
};
if (!mounted || !editor) return null;

    return (
        <div id="editor-container" className="border border-gray-300 rounded-md p-4">
            {showtoast && <Toast message={message} /> }
            {/* Toolbar */}
            <div className="flex space-x-2 border py-4 px-6 rounded-lg">
            <select onChange={changeFontSize} className="rounded-sm bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 px-2">
            <option value="8px">8px</option>
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="28px">28px</option>
        <option value="32px">32px</option>
        <option value="36px">36px</option>
        <option value="40px">40px</option>  
        <option value="44px">44px</option>
        <option value="48px">48px</option>
      </select>
      <select onChange={changeFontType} className="rounded-sm bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700">
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="Courier New, monospace">Courier New</option>
        <option value="Tahoma, sans-serif">Tahoma</option>
        <option value="Verdana, sans-serif">Verdana</option>
        <option value="Times New Roman, serif">Times New Roman</option>
        <option value="Comic Sans MS, cursive">Comic Sans MS</option>
        <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
        <option value="Impact, sans-serif">Impact</option>
        <option value="Lucida Console, monospace">Lucida Console</option>
        <option value="Garamond, serif">Garamond</option>
        <option value="Palatino Linotype, serif">Palatino Linotype</option>
        <option value="Roboto, sans-serif">Roboto</option>
        <option value="Open Sans, sans-serif">Open Sans</option>
        <option value="Lora, serif">Lora</option>
        <option value="Merriweather, serif">Merriweather</option>
        <option value="Montserrat, sans-serif">Montserrat</option>
        <option value="Raleway, sans-serif">Raleway</option>
        <option value="PT Sans, sans-serif">PT Sans</option>
      </select>
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm"><Bold /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="bg-red-100  text-red-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm"><ItalicIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm"><UnderlineIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm"><List /></button>
                <button type="button" onClick={addLink} className="bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2"><LinkIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="bg-red-100 text-red-800  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm"><ListOrdered /></button>
                {/* Upload Image Button */}
               
                <button 
    type="button" 
    onClick={() => imageInputRef.current.click()} 
    className="text-red-800 bg-red-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm">
    <ImageIcon className="w-5 h-5 text-red-800 dark:text-white" />
</button>

<input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "image")} />
{/* Upload File Button */}
<button 
    type="button" 
    onClick={() => fileInputRef.current.click()} 
    className="text-red-800 bg-red-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm">
    <FileIcon className="w-5 h-5 text-red-800 dark:text-white" />
</button>
<input type="file" ref={fileInputRef} accept=".pdf, .xls, .xlsx, .doc, .docx"  className="hidden" onChange={(e) => handleFileUpload(e, "file")} />
<button type="button" onClick={addTable} className="text-red-800 bg-red-100 p-2 border border-red-700 rounded-sm">

    <TableIcon className="w-5 h-5 text-red-800 dark:text-white" /> 
</button>
<button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="text-red-800 bg-red-100 p-2 border border-red-700 rounded-sm">
   <DeleteIcon className="w-5 h-5 text-red-800 dark:text-white"/>
</button>
               
                <button type="button" onClick={() => editor.chain().focus().undo().run()} className="text-red-800  bg-red-100  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm">
    <Undo2Icon /> {/* Add an Undo icon from Lucide or another library */}
</button>

<button type="button" onClick={() => editor.chain().focus().redo().run()} className="text-red-800  bg-red-100  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-red-700 p-2 rounded-sm">
    <Redo2Icon /> {/* Add a Redo icon from Lucide or another library */}
</button>

            </div>
        
            
{editor && (
                <BubbleMenu editor={editor} className="flex gap-1 p-2 opacity-95 bg-black rounded-lg w-full flex-wrap">
                 
            <select onChange={changeFontSize} className="rounded-sm text-white bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700">
            <option value="8px">8px</option>
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="28px">28px</option>
        <option value="32px">32px</option>
        <option value="36px">36px</option>
        <option value="40px">40px</option>  
        <option value="44px">44px</option>
        <option value="48px">48px</option>
      </select>
      <select onChange={changeFontType} className="rounded-sm text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700">
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="Courier New, monospace">Courier New</option>
        <option value="Tahoma, sans-serif">Tahoma</option>
        <option value="Verdana, sans-serif">Verdana</option>
        <option value="Times New Roman, serif">Times New Roman</option>
        <option value="Comic Sans MS, cursive">Comic Sans MS</option>
        <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
        <option value="Impact, sans-serif">Impact</option>
        <option value="Lucida Console, monospace">Lucida Console</option>
        <option value="Garamond, serif">Garamond</option>
        <option value="Palatino Linotype, serif">Palatino Linotype</option>
        <option value="Roboto, sans-serif">Roboto</option>
        <option value="Open Sans, sans-serif">Open Sans</option>
        <option value="Lora, serif">Lora</option>
        <option value="Merriweather, serif">Merriweather</option>
        <option value="Montserrat, sans-serif">Montserrat</option>
        <option value="Raleway, sans-serif">Raleway</option>
        <option value="PT Sans, sans-serif">PT Sans</option>
      </select>
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2"><Bold /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2"><ItalicIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2"><UnderlineIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2"><List /></button>
                <button type="button" onClick={addLink} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2"><LinkIcon /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2"><ListOrdered /></button>
                {/* Upload Image Button */}
              
                <button type="button" onClick={() => editor.chain().focus().undo().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2">
    <Undo2Icon /> {/* Add an Undo icon from Lucide or another library */}
</button>

<button type="button" onClick={() => editor.chain().focus().redo().run()} className="text-white  bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 p-2">
    <Redo2Icon /> {/* Add a Redo icon from Lucide or another library */}
</button>
                </BubbleMenu>
            )}
{editor && editor.isActive("table") && (
    <div className="flex gap-2 mt-2 border p-2 bg-gray-100">
        <button type="button" 
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            className="p-2 bg-red-100 text-red-800 rounded-sm text-sm"
        >
            ➕ Add Column
        </button>
        <button type="button"
            onClick={() => editor.chain().focus().addRowBefore().run()}
            className="p-2 bg-red-100 text-red-800 rounded-sm text-sm"
        >
            ➕ Add Row
        </button>
        <button type="button"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="p-2 bg-red-100 text-red-800 rounded-sm text-sm"
        >
            ❌ Remove Column
        </button>
        <button type="button"
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="p-2 bg-red-100 text-red-800 rounded-sm text-sm"
        >
            ❌ Remove Row
        </button>
    </div>
)}
            {/* Table Controls */}
        
            {/* Editor */}
            <div className="mt-2 border border-gray-300 rounded-lg p-4">
                <EditorContent 
                    editor={editor} 
                    className="prose min-h-[200px] focus:outline-none p-4"
                />
            </div>

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
