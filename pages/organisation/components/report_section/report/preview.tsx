import { useContext } from "react";
import { ReportVMContext } from "../report.vm";

const Preview = ({ id }: { id: string }) => {
    const { previewContent } = useContext(ReportVMContext);
    return (
        <div className="min-w-[700px] h-[656px] shadow-paper-shadow mt-4 w-2/3 bg-white border-none p-4 overflow-y-scroll">
            {
                <div
                    id={id}
                    className="editor_preview"
                    dangerouslySetInnerHTML={{
                        __html: previewContent,
                    }}
                ></div>
            }
        </div>
    );
};

export default Preview;
