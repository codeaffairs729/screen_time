import Image from "next/image";
import downloadIcon from "public/images/icons/download.svg";
import { useContext, useState } from "react";
import { ReportVMContext } from "../report.vm";
import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";

const DownloadReport = () => {
    const [ref, setRef] = useState<any>();
    const orgName = "Organisation Name";
    const fileName = `${orgName.toLowerCase().replaceAll(" ", "_")}.pdf`;
    const { downloadRef } = useContext(ReportVMContext);

    // const generatePDF = () => {
    //     html2pdf().from(downloadRef).save();
    // };

    const generatePDF = async () => {
        const sectionIds = [
            "header",
            "dataset_quality",
            "accessibility",
            "findability",
            "reusability",
            "search_terms_used",
            "download_metrics",
            "downloads_by_time",
            "downloads_by_role",
            "use_cases",
        ];
        const container = document.createElement("div");
        sectionIds.forEach((sectionId, index) => {
            const section = downloadRef.querySelector(`#${sectionId}`);

            if (section) {
                if (index > 0) {
                    container.appendChild(
                        document.createElement("div")
                    ).style.pageBreakBefore = "always";
                }
                container.appendChild(section.cloneNode(true));
            }
        });
        html2pdf().from(container).save();
    };

    const pxToMm = (px: number) => {
        if (ref != null) {
            return Math.floor(px / ref.offsetHeight);
        }
    };

    return (
        <div>
            <div ref={(ref) => setRef(ref)} style={{ height: "1mm" }} />
            <div
                className="flex items-center cursor-pointer"
                // onClick={() => {
                //     downloadRef &&
                //         downloadPdf(
                //             downloadRef,
                //             pxToMm(downloadRef.offsetHeight),
                //             fileName
                //         );
                // }}
                onClick={generatePDF}
            >
                <div className="flex flex-row mr-6 bg-dtech-new-main-light active:bg-[#FDD522] active:text-black text-white hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 items-center justify-center sm:p-4 sm:px-10 p-2 px-3 text-xs font-semibold rounded-full">
                    {/* <Image src={downloadIcon} alt="" height={24} width={24} /> */}
                    <span className="">Download</span>
                </div>
            </div>
        </div>
    );
};
export default DownloadReport;
