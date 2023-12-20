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

    return (
        <div id="report-editor">
            {console.log("log from editor", editorValue)}
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                style={customStyles}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                // preserveWhitespace
                className={"!h-[615px]"}
            />
        </div>
    );
};

export default RichTextEditor;
