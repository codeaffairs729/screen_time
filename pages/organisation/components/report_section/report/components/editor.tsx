import React, { useContext, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { ReportVMContext } from "../../report.vm";
import dynamic from "next/dynamic";



const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const RichTextEditor = () => {
    const { editorValue, setEditorValue } = useContext(ReportVMContext);

    const customStyles = {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    const handleChange = (value, delta, source, editor) => {
       
        console.log("value is",value)
        console.log("delta is",delta)
        console.log("source is",source)
        console.log("editor is",editor)
        if (source === "user") {
            console.log("I am running")

            const hasHtmlInsert = delta.ops.some((op) => op.insert && typeof op.insert === "string" && op.insert.includes("<div id=\"break\"></div>"));

            // If HTML insert operations contain the specific element, update the editor content
            if (hasHtmlInsert) {
              editor.updateContents(delta);
        
              // Update the context state with the modified editor content
              setEditorValue(editor.getContents());
            }
            
          }
          
          else if (source === "api") {
            // If the change is initiated by API, prevent the update
            // You can add your custom logic here or leave it empty to ignore the change
            return;
          }
        
        setEditorValue(value);
      };
    

    return (
        <div id="report-editor">
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                style={customStyles}
                value={editorValue}
                onChange={handleChange}
                // preserveWhitespace
                className={"!h-[615px]"}
            />
        </div>
    );


};

export default RichTextEditor;
