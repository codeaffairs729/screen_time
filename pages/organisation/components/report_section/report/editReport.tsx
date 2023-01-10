import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useContext, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { ReportVMContext } from "../report.vm";

const TOOLBAR_OPTIONS = {
    options: ["inline", "link", "list", "image", "textAlign"],
    inline: {
        options: ["bold", "italic", "strikethrough", "monospace"],
    },
    link: {
        options: ["link"],
    },
    list: {
        options: ["unordered", "ordered"],
    },
    textAlign: {
        options: ["left", "center", "right", "justify"],
    },
};

const EditReport = () => {
    const { editorState, onEditorStateChange } = useContext(ReportVMContext);

    return (
        <div className="min-w-[700px] bg-white shadow-paper-shadow mt-4 w-2/3 overflow-y-scroll ">
            <Editor
                editorState={editorState}
                toolbar={TOOLBAR_OPTIONS}
                wrapperClassName=""
                editorClassName={"pl-1 !h-[615px]"}
                toolbarClassName="!pt-2"
                onEditorStateChange={onEditorStateChange}
                readOnly={false}
                spellCheck={true}
            />
        </div>
    );
};

export default EditReport;
