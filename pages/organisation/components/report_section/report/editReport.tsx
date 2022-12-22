import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";
import { convertToHTML } from "draft-convert";
import dynamic from "next/dynamic";

// const Editor = dynamic(
//     () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//     { ssr: false }
// );
const EditReport = ({
    editorState,
    onEditorStateChange,
    setConvertedContent,
    autoGenerate,
    selected,
}: any) => {
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    function uploadImageCallBack(file: any) {
        return new Promise((resolve, reject) => {
            resolve({
                data: {
                    link: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                },
            });
        });
    }
    return (
        <div className="min-w-[700px] min-h-[656px]  bg-white shadow-paper-shadow mt-4 w-2/3">
            {/* {autoGenerate && (
                <div className="flex justify-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        width={200}
                        height={200}
                        className={"absolute mt-14 "}
                    />
                    <div className="flex absolute justify-start">
                        {selected.map((object: any, index: any) => (
                            <span className="mt-44">
                                {object.isChecked && object.label}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <Editor
                editorState={editorState}
                toolbar={{
                    options: ["inline", "link", "list", "image"],
                    inline: {
                        options: [
                            "bold",
                            "italic",
                            "strikethrough",
                            "monospace",
                        ],
                    },
                    link: {
                        options: ["link"],
                    },
                    list: {
                        options: ["unordered", "ordered"],
                    },
                    image: {
                        uploadCallback: uploadImageCallBack,
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,
                        previewImage: true,
                        inputAccept:
                            "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                        alt: { present: false, mandatory: false },
                        defaultSize: {
                            height: "auto",
                            width: "auto",
                        },
                    },
                }}
                wrapperClassName="p-1"
                editorClassName="pl-1 mt-32"
                toolbarClassName="!pt-4  mt-0"
                onEditorStateChange={onEditorStateChange}
                readOnly={false}
                spellCheck={true}
            /> */}
        </div>
    );
};

export default EditReport;
