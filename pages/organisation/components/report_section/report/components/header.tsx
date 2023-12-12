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
                    // __html: "<img id='imageReport' src='https://epsilon1-dev-001.s3.amazonaws.com/image/provider/logo/46da6126-7c05-52ea-8a19-e230c9df7bc3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUNRRHXAU3GMVYQ4U%2F20231211%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231211T110930Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=FwoGZXIvYXdzEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDL8uMug%2FUutduNfWZiLSAXB%2BXtm3It5xV1a4PdtyYZjinMz8GSkpWpK7G0vHMVpgMuvUBFgFVrtiPEowDsDvSA5E7SHJeqlMQp0VXCnhlUmgWlYTTbXpaOp8pvB0Si8ZkWfbJsr%2FjBWcP7Kbx%2Box6TypBx0NjrHRuwXMUcmS%2Big1k2e%2FQaS7ZrSTi2fK8OmNu6PgDVRmrDpTbM9F2baqpKWbQYpa8b6Id5RXDGEDhxGHq8xdKxjnltonCWD84DshJSvE%2BHxeXf6%2BOsZXafujLfKxWXjHLpIS3E%2Fy5Jrvq794cyjx0turBjJYiflgBKM7WYISpoPW6gNLq36o0FlvVa7nr%2B9M%2F%2BuogXTjkLedynNWeURN6au7O0T%2B5Rjg3oU1sYGHIKph3kx%2F3Z2qEncJ51PB3Ftp%2BNJrg0wZC%2BMMnRS2SQ%3D%3D&X-Amz-Signature=bf0206013f8839d1f3d6b3a752a46b1e398927a34f1fd6a5e80a333994a318d4'/>"
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
