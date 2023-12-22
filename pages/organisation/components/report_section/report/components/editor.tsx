import React, { useContext, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { ReportVMContext } from "../../report.vm";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formats = [
    {
        className: "header ql-picker",
        value: "header",
    },
    {
        className: "bold",
        value: "bold",
    },
    {
        className: "italic",
        value: "italic",
    },
    {
        className: "underline",
        value: "underline",
    },
    {
        className: "strike",
        value: "strike",
    },
    {
        className: "blockquote",
        value: "blockquote",
    },
    {
        className: "list",
        value: "bullet",
    },
    {
        className: "list",
        value: "ordered",
    },
    {
        className: "indent",
        value: "-1",
    },
    {
        className: "indent",
        value: "+1",
    },
    {
        className: "link",
        value: "link",
    },
    {
        className: "image",
        value: "image",
    },
    {
        className: "clean",
        value: "clean",
    },
];

const RichTextEditor = () => {
    const { editorValue, setEditorValue } = useContext(ReportVMContext);
    const [quill, setQuill] = useState(null);
    const quillRef = useRef();

    const customStyles = {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    useEffect(() => {
        if (quill) {
            const tooltips = document.querySelectorAll(
                '[data-toggle="tooltip"]'
            );

            tooltips.forEach((tooltip) => {
                tooltip.addEventListener("mouseover", () => {
                    // Check if tooltip is defined before accessing its 'tooltip' property
                    if (tooltip instanceof HTMLElement) {
                        // Assuming tooltip is an HTMLElement, you can now safely access the 'tooltip' property
                        (tooltip as any).tooltip = true;
                    }
                });

                setTimeout(() => {
                    // Your other code here
                }, 1000);
            });
        }
    }, [quill]);

    const modules = {
        toolbar: {
            container: "#toolbar-container",
            handlers: {},
            items: formats.map((format) => ({
                label: format.className,
                value: format.value,
            })),
        },
    };

    return (
        <div id="report-editor">
            <div id="toolbar-container">
                {formats.map((format, index) => (
                    <button
                        key={index}
                        className={`ql-${format.className}`}
                        data-toggle="tooltip"
                        value={format.value}
                        title={format.className.replace("ql-", "")}
                    >
                        {format.value}
                    </button>
                ))}
            </div>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats.map((format) => format.value)}
                style={customStyles}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                className={"!h-[615px]"}
            />
        </div>
    );
};

export default RichTextEditor;
