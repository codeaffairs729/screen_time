import Image from "next/image";
import downloadIcon from "public/images/icons/download.svg";
import { useContext, useState } from "react";
import { downloadPdf, ReportVMContext } from "../report.vm";
import html2pdf from "html2pdf.js";

const DownloadReport = () => {
    const [ref, setRef] = useState<any>();
    const orgName = "Organisation Name";
    const fileName = `${orgName.toLowerCase().replaceAll(" ", "_")}.pdf`;
    const { downloadRef } = useContext(ReportVMContext);

    const generatePDF = () => {
        html2pdf().from(downloadRef).save();
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
                <div className="flex flex-row mr-6">
                    <Image src={downloadIcon} alt="" height={24} width={24} />
                    <span className="ml-2">Download report</span>
                </div>
            </div>
        </div>
    );
};
export default DownloadReport;
