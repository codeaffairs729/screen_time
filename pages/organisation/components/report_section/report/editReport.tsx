import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useContext, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import Table from "../../table";
import BarGraph from "components/UI/BarGraph";
import PieGraph from "components/UI/PieGraph";
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
            <div>
                <div
                    id="screenshot"
                    className="flex absolute justify-center flex-col  z-[-10]"
                >
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
                        isAnimationActive={false}
                    />
                    <Table
                        tableHeaders={["I column", "II column"]}
                        tableData={[
                            [0, 2, 3],
                            [1, 3, 2],
                            [2, 4, 5],
                        ]}
                        cellPadding={3}
                        tableClass="ml-20"
                    />
                </div>
                <div
                    id="pie"
                    className="flex absolute justify-center flex-col  z-[-10]"
                >
                    <PieGraph
                        data={[
                            { name: "Data modelling", value: 400 },
                            { name: "Publications", value: 300 },
                            { name: "Planning", value: 200 },
                        ]}
                        isAnimationActive={false}
                        radius="60%"
                    />
                </div>
            </div>

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
