import Image from "next/image";
import downloadIcon from "public/images/icons/download.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadReport = ({ id }: { id: string }) => {
    const hightcheck = document.getElementById("myMm");
    const pxToMm = (px: number) => {
        return hightcheck != null && Math.floor(px / hightcheck.offsetHeight);
    };

    return (
        <div>
            <div id="myMm" style={{ height: "1mm" }} />
            <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                    const input: any = document.getElementById(id);
                    const inputHeightMm: any = pxToMm(input.offsetHeight);
                    const a4WidthMm = 210;
                    const a4HeightMm = 297;
                    // const numPages =
                    //     inputHeightMm <= a4HeightMm
                    //         ? 1
                    //         : Math.floor(inputHeightMm / a4HeightMm) + 1;

                    html2canvas(input, { useCORS: true }).then(
                        (canvas: any) => {
                            const imgData = canvas.toDataURL("image/png");
                            // const pdf = new jsPDF("p", "mm", "a4");
                            const pdf =
                                inputHeightMm > a4HeightMm
                                    ? new jsPDF("p", "mm", [
                                          inputHeightMm + 16,
                                          a4WidthMm,
                                      ])
                                    : new jsPDF();
                            const imgProps = pdf.getImageProperties(imgData);
                            const pdfWidth = pdf.internal.pageSize.getWidth();
                            const pdfHeight =
                                (imgProps.height * pdfWidth) / imgProps.width;

                            // const pageHeight = pdf.internal.pageSize.height;
                            // let y = 500;
                            // if (y >= pageHeight) {
                            //     pdf.addPage();
                            //     y = 0; // Restart height position
                            // }
                            pdf.addImage(
                                imgData,
                                "png",
                                10,
                                4,
                                pdfWidth - 20,
                                pdfHeight
                            );
                            pdf.save(`${id}.pdf`);
                        }
                    );
                }}
            >
                <div id="myMm" style={{ height: "1mm" }} />
                <div className="flex flex-row mr-6">
                    <Image src={downloadIcon} alt="" height={24} width={24} />
                    <span className="ml-2">Download report</span>
                </div>
            </div>
        </div>
    );
};
export default DownloadReport;
