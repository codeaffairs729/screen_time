import { useContext } from "react";
import { ReportVMContext } from "../report.vm";

const Preview = () => {
    const { previewContent, setDownloadRef } = useContext(ReportVMContext);
    console.log("previewContent :", previewContent);
    return (
        <div className="min-w-[700px] h-[656px] shadow-paper-shadow mt-4 w-2/3 bg-white border-none p-4 overflow-y-scroll">
            {
                <div
                    ref={(ref) => setDownloadRef(ref)}
                    className="editor_preview"
                    dangerouslySetInnerHTML={{
                        __html: previewContent
                            .replace(
                                "<h1>",
                                '<h1 style="padding-left: 160px;font-size: 30px;">'
                            )
                            .replaceAll(
                                "<h6>",
                                '<h6 style="margin-left: 230px;"><br />'
                            )
                            .replace(
                                "<h2>",
                                '<h2 style="margin-left: 222px;"><br />'
                            )
                            .replaceAll(
                                "<h5>",
                                '<h5 style="padding-bottom:3px;padding-top:3px;">'
                            )
                            .replaceAll(
                                "<h4>",
                                '<h4 style="padding-left: 40px;padding-bottom:4px;padding-top:4px;  font-style: italic;">'
                            ),
                    }}
                ></div>
            }
        </div>
    );
};

export default Preview;
