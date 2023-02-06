import { useContext } from "react";
import { ReportVMContext } from "../report.vm";

const Preview = () => {
    const { previewContent, setDownloadRef } = useContext(ReportVMContext);
    return (
        <div className="min-w-[700px] h-[656px] shadow-paper-shadow mt-4 w-2/3 bg-white border-none p-4 overflow-y-scroll">
            {
                <div
                    ref={(ref) => setDownloadRef(ref)}
                    className="editor_preview"
                    dangerouslySetInnerHTML={{
                        __html: previewContent.replace('<strong>','<strong style="margin-left: 220px;">').replace('<strong>','<strong style="margin-left: 230px;">'),
                    }}
                ></div>
            }
        </div>
    );
};

export default Preview;
