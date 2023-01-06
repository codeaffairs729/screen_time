import Image from "next/image";
import downloadIcon from "public/images/icons/download.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef } from "react";
import { useState } from "react";

const A4_WIDTH_MM = 210;

const downloadPdf = (input: any, inputHeightMm: any) => {
    html2canvas(input, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf =
            inputHeightMm > A4_WIDTH_MM
                ? new jsPDF("p", "mm", [inputHeightMm + 160, A4_WIDTH_MM])
                : new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "png", 10, 4, pdfWidth - 20, pdfHeight);
        pdf.save(`download.pdf`);
    });
};

const DownloadReport = ({ id }: { id: string }) => {
    const [ref, setRef] = useState<any>();

    const pxToMm = (px: number) => {
        console.log(ref, 'ref')
        if (ref != null) {
            return Math.floor(px / ref.offsetHeight);
        }
    };
    return (
        <div>
            <div ref={(ref) => setRef(ref)} style={{ height: "1mm" }} />
            <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                    const input: any = document.getElementById(id);
                    input && downloadPdf(input, pxToMm(input.offsetHeight));
                }}
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
