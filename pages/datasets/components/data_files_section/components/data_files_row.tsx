import Dataset, { DatasetUrl } from "models/dataset.model.v4";
import { ReactNode, useContext } from "react";
import { BiDownload } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import DataFilePreview from "./data_file_preview";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
// import Loader from "components/UI/loader";
// import { useHttpCall } from "common/hooks";
import Http from "common/http";
import {
    usereventDatasetDownload,
    usereventDatasetDownloadSearchTerms,
} from "services/usermetrics.service";
// import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";

const Row = ({ dataFile, dataset }: { dataFile: DatasetUrl, dataset: Dataset }) => {
    // const vm = useContext(DatasetDetailVMContext) as any;
    const [showPreview, setShowPreview] = useState(false);

    let description = "Unknown";
    if (
        dataFile?.description?.replace(/['"]+/g, "") &&
        dataFile?.description != "null"
    ) {
        description = dataFile?.description?.replace(/['"]+/g, "");
    } else if (dataFile?.format?.replace(/['"]+/g, "")) {
        description = dataFile?.format?.replace(/['"]+/g, "") + " data";
    }
    let sizemb = "Unknown";
    if (dataFile?.sizemb && dataFile?.sizemb != "null") {
        sizemb = dataFile?.sizemb + " KB";
    }

    // Download dataset file start
    const onDataFileDownload = () => {
        Http.post(`/v1/datasets/${dataset.id}/downloads`);
        usereventDatasetDownload(dataset, dataFile.url);
        const previousPath = localStorage.getItem("previous_path");
        if (previousPath?.includes("/search?q=") && dataset) {
            const startIndex =
                previousPath.indexOf("/search?q=") + "/search?q=".length;
            const endIndex = previousPath.indexOf("&", startIndex);
            const extractedString = previousPath.substring(
                startIndex,
                endIndex
            );
            usereventDatasetDownloadSearchTerms(dataset, extractedString);
        }
    };
    // Download dataset file end

    return (
        <>
            <tr
                className={clsx(
                    showPreview
                        ? "bg-dtech-light-teal bg-opacity-50"
                        : "bg-dtech-light-grey2"
                )}
            >
                <TD>{description}</TD>
                <TD>{dataFile?.format?.toLowerCase() ?? "-"}</TD>
                <TD>{sizemb}</TD>
                <TD>
                    <a className="inline-block"
                        onClick={onDataFileDownload}
                        href={dataFile.url?.replace(/["']/g, "")}
                        download
                        target="_blank"
                        rel="noreferrer"
                    >
                        <BiDownload size={24} className="text-dtech-light-grey3" />
                    </a>
                </TD>
                <TD>
                    <button onClick={() => setShowPreview(!showPreview)}>
                        {showPreview ? (
                            <AiFillEyeInvisible
                                size={24}
                                className="text-dtech-light-grey3"
                            />
                        ) : (
                            <AiFillEye
                                size={24}
                                className="text-dtech-light-grey3"
                            />
                        )}
                    </button>
                </TD>
            </tr>
            {showPreview && (
                <>
                    <tr className="relative -top-1">
                        <td
                            colSpan={5}
                            className="h-1 bg-dtech-new-main-light"
                        ></td>
                    </tr>
                </>
            )}
            <tr className="clear-both">
                <td colSpan={5}>
                    <Transition
                        enter="transition-[max-height] duration-700 overflow-hidden"
                        enterFrom="transform scale-75 max-h-0"
                        enterTo="transform scale-100 max-h-[99999px]"
                        entered="!max-h-none"
                        leave="transition-[max-height] duration-700 overflow-hidden"
                        leaveFrom="transform scale-100 max-h-80"
                        leaveTo="transform max-h-0"
                        show={showPreview}
                    >
                        <DataFilePreview dataFileId={dataFile.id} />
                    </Transition>
                </td>
            </tr>
        </>
    );
};

const TD = ({ children }: { children: ReactNode }) => {
    return <td className={clsx("text-center p-2 text-dtech-dark-grey2")}>{children}</td>;
};

export default Row;
