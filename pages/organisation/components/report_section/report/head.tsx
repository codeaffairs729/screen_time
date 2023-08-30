import { Tab } from "@headlessui/react";
import { useState } from "react";
// import DownloadReport from "./downloadReport";
import dynamic from "next/dynamic";
const DownloadReport = dynamic(() => import("./downloadReport"), {
    ssr: false,
});
const Head = ({edit, setEdit}:{edit:boolean, setEdit:Function}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="relative flex text-center w-32 justify-between">
                <Tab
                    onClick={() => setEdit(false)}
                    className={`${
                        edit
                        ? "text-dtech-dark-grey text-lg font-semibold"
                        : "border-b-4 border-b-dtech-dark-teal text-lg font-semibold text-dtech-dark-teal"
                    } pb-2  cursor-pointer outline-none`}
                >
                    Preview
                </Tab>
                <Tab
                    onClick={() => setEdit(true)}
                    className={`${
                        edit
                        ? "text-dtech-dark-teal text-lg font-semibold border-b-4 border-b-dtech-dark-teal"
                        : "text-dtech-dark-grey text-lg font-semibold"
                    } pb-2 w-12 ml-64 cursor-pointer outline-none`}
                >
                    Edit
                </Tab>
            </div>
            {/* {!edit && <DownloadReport />} */}
        </div>
    );
};

export default Head;
