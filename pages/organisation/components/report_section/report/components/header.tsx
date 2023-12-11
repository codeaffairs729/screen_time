import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";

const HeaderPreview = ({ header }: { header: any }) => {
    const currentDate = new Date();
    const reportDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
        "default",
        {
            month: "short",
        }
    )} ${currentDate.getFullYear()}`;

    return (
        <div className=" border-2 border-dtech-light-teal border-opacity-30 p-4 bg-white rounded-[10px] relative">
            <div
                id="preview_logo"
                className="flex flex-col justify-center items-center "
                dangerouslySetInnerHTML={{
                    __html: header[0],
                }}
            />
            <div
                id="preview_title"
                className="flex flex-col justify-center items-center text-xl mt-5  mb-2 underline underline-offset-8 text-[#333333]"
                dangerouslySetInnerHTML={{
                    __html: header[2],
                }}
            />

            <div
                id="preview_report"
                className="flex flex-col justify-center items-center text-[#727272]"
                dangerouslySetInnerHTML={{
                    __html: header[1],
                }}
            />
            <div className="flex justify-between items-center my-5">
                <div className="flex flex-col justify-center items-center">
                    <div>Reporting Period</div>
                    <div
                        id="preview_date"
                        className="text-[#727272] font-light"
                        dangerouslySetInnerHTML={{
                            __html: header[3],
                        }}
                    />
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div>Report created</div>
                    <div className="text-[#727272] font-light">
                        <span>{reportDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HeaderPreview;
