import { useState } from "react";
import Head from "./head";
import Preview from "./preview";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});
const Report = ({
    autoGenerate,
    selected,
    edit,
    setEdit,
    handleCancel,
    fromDate,
    toDate,
}: any) => {
    const [editorState, onEditorStateChange] = useState(
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState("");
    return (
        <div>
            <Head edit={edit} setEdit={setEdit} handleCancel={handleCancel} />
            {edit ? (
                <EditReport
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    setConvertedContent={setConvertedContent}
                    autoGenerate={autoGenerate}
                    selected={selected}
                    fromDate={fromDate}
                    toDate={toDate}
                />
            ) : (
                <Preview convertedContent={convertedContent} />
            )}
        </div>
    );
};

export default Report;
