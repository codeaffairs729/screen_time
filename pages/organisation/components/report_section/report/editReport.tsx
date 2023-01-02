import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";
import { convertToHTML } from "draft-convert";
// import {Editor, EditorState} from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import { format } from "date-fns";
import BarGraph from "components/UI/BarGraph";
const EditReport = ({
    editorState,
    onEditorStateChange,
    setConvertedContent,
    autoGenerate,
    selected,
    fromDate,
    toDate,
    imgUrl,
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
        <div className="min-w-[700px] bg-white shadow-paper-shadow mt-4 w-2/3 overflow-y-scroll ">
            {autoGenerate && (
                <div className="flex flex-col abolute">
                    <div className="flex justify-center">
                        <img
                            src={imgUrl}
                            width={200}
                            height={200}
                            className={"absolute mt-14 "}
                        />
                    </div>
                    <div className="ml-2">
                        <div className="flex justify-center absolute ml-60  mt-48">
                            {format(fromDate, "dd-MM-yyyy") ===
                            format(toDate, "dd-MM-yyyy") ? (
                                <span className="text-lg ml-10">
                                    <span className="font-bold">
                                        {fromDate.toLocaleString("default", {
                                            month: "short",
                                        })}
                                    </span>
                                    <span> {fromDate.getDate()}</span>,
                                    <span>{fromDate.getFullYear()}</span>
                                </span>
                            ) : (
                                <div className="text-lg">
                                    <span className=" pr-4">
                                        <span className="font-bold">
                                            {fromDate.toLocaleString(
                                                "default",
                                                {
                                                    month: "short",
                                                }
                                            )}
                                        </span>
                                        <span> {fromDate.getDate()}</span>,
                                        <span>{fromDate.getFullYear()}</span>
                                    </span>
                                    <span className="">
                                        <span className="font-bold">
                                            {toDate.toLocaleString("default", {
                                                month: "short",
                                            })}
                                        </span>
                                        <span> {toDate.getDate()}</span>,
                                        <span>{toDate.getFullYear()}</span>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex absolute justify-start flex-col mt-56">
                            {selected.map((object: any, index: any) => (
                                <span className="ml-1 font-bold" key={index}>
                                    {object.isChecked && object.label}
                                </span>
                            ))}
                            <BarGraph
                                data={[
                                    { name: 1, rating: 10 },
                                    { name: 2, rating: 30 },
                                    { name: 3, rating: 20 },
                                    { name: 4, rating: 40 },
                                    { name: 5, rating: 10 },
                                ]}
                                width={400}
                                height={200}
                                strokeWidthAxis={2}
                                strokeWidthLabelList={0}
                                className="font-medium my-2"
                                XleftPadding={20}
                                XrightPadding={30}
                                xLabel=""
                                yLabel=""
                                xvalue=""
                                yvalue=""
                                barDatakey={"rating"}
                                labelListDatakey={"name"}
                            />
                        </div>
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
                wrapperClassName=""
                editorClassName={
                    autoGenerate ? "pl-1 mt-[28rem] !h-[175px]" : "pl-1 !h-[600px]"
                }
                toolbarClassName="!pt-2"
                onEditorStateChange={onEditorStateChange}
                readOnly={false}
                spellCheck={true}
            />
        </div>
    );
};

export default EditReport;
