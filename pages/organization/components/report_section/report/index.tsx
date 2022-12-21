import { useState } from "react";
// import EditReport from "./editReport";
import Head from "./head";
import Preview from "./preview";
import { EditorState } from "draft-js";
const Report = ({ autoGenerate, selected }: any) => {
    const [edit, setEdit] = useState<boolean>(false);

    const handleCancel = () => {
        setEdit(false);
    };
    const [editorState, onEditorStateChange] = useState(
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState("");
    return (
        <div>
            <Head edit={edit} setEdit={setEdit} handleCancel={handleCancel} />
            {/* {edit ? (
                <EditReport
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    setConvertedContent={setConvertedContent}
                    autoGenerate={autoGenerate}
                    selected={selected}
                />
            ) : (
                <Preview convertedContent={convertedContent} />
            )} */}
        </div>
    );
};

export default Report;
