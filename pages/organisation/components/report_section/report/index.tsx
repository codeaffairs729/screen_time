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
    const imgUrl =
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";

    return (
        <div>
            <Head
                edit={edit}
                setEdit={setEdit}
                handleCancel={handleCancel}
                id={"download"}
            />
            {edit ? (
                <EditReport
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    setConvertedContent={setConvertedContent}
                    autoGenerate={autoGenerate}
                    selected={selected}
                    fromDate={fromDate}
                    toDate={toDate}
                    imgUrl={imgUrl}
                />
            ) : (
                <Preview
                    convertedContent={convertedContent}
                    imgUrl={imgUrl}
                    autoGenerate={autoGenerate}
                    selected={selected}
                    fromDate={fromDate}
                    toDate={toDate}
                    id={"download"}
                />
            )}
        </div>
    );
};

export default Report;
