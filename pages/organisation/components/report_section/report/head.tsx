import { Tab } from "@headlessui/react";
import { useState } from "react";
import DownloadReport from "./downloadReport";

const Head = () => {
    const [edit, setEdit] = useState(false);
    return (
        <div className="flex justify-between items-center">
            <div className="relative flex text-center w-32 justify-between">
                <Tab
                    onClick={() => setEdit(false)}
                    className={`${
                        edit
                            ? "text-dtech-dark-grey"
                            : "border-b-2 border-b-dtech-main-dark text-dtech-main-dark"
                    } pb-2 w-12 cursor-pointer outline-none`}
                >
                    Preview
                </Tab>
                <Tab
                    onClick={() => setEdit(true)}
                    className={`${
                        edit
                            ? "text-dtech-main-dark border-b-2 border-b-dtech-main-dark"
                            : "text-dtech-dark-grey"
                    } pb-2 w-12 ml-3 cursor-pointer outline-none`}
                >
                    Edit
                </Tab>
            </div>
            {<DownloadReport />}
        </div>
    );
};

export default Head;
