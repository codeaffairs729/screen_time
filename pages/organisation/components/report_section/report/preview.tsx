import { useContext } from "react";
import { ReportVMContext } from "../report.vm";

const Preview = () => {
    const { previewContent, setDownloadRef } = useContext(ReportVMContext);
    return (
        <div className="shadow-paper-shadow mt-4 h-[656px] bg-white border-none p-4 overflow-y-scroll">
            {
                <div
                    ref={(ref) => setDownloadRef(ref)}
                    className="editor_preview"
                    dangerouslySetInnerHTML={{
                        __html: previewContent
                            .replace(
                                "<h1>",
                                '<h1 style="text-align: center;font-size: 30px; margin-top:10px;">'
                            )
                            .replaceAll(
                                "<h6>",
                                '<h6 style="text-align: center;"><br />'
                            )
                            .replace(
                                "<h2>",
                                '<h2 style="text-align: center;"><br />'
                            )
                            .replaceAll(
                                "<h5>",
                                '<h5 style="padding-bottom:4px;padding-top:4px;">'
                            )
                            .replaceAll(
                                "<h4>",
                                '<h4 style="padding-left: 40px;padding-bottom:5px;padding-top:5px;font-style: italic;">'
                            )
                            .replaceAll(
                                "<h3>",
                                '<h3 style="text-align: center;font-style: italic;">'
                            ),
                    }}
                ></div>
            }
        </div>
    );
};

export default Preview;
