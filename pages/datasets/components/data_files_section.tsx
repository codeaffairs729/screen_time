import { useContext, useState, useRef, useEffect } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import { DatasetUrl } from "models/dataset.model.v4";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import downloadIcon from "public/images/icons/download.svg";
import previewIcon from "public/images/icons/preview.svg";
import doNotPreview from "public/images/icons/do_not_preview.svg";
import Image from "next/image";
import PreviewSection from "./preview_section";
import {
    usereventDatasetDownload,
    usereventDatasetDownloadSearchTerms,
} from "services/usermetrics.service";
import InfoAlert from "components/UI/alerts/info_alert";
import { BiDownload } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import Http from "common/http";

const META_FILE_HEADERS = ["Name", "Format", "Size", "Download", "Preview"];

const DataFilesSection = ({ goToPreview, scrollLeft, setScrollLeft, setHighlightedDot }: { goToPreview: () => void, scrollLeft: any, setScrollLeft: any, setHighlightedDot: any }) => {
    const vm = useContext(DatasetDetailVMContext);
    const user = useSelector((state: RootState) => state.auth.user);
    const { createFeedbackNotification } = useContext(NotificationsVMContext);
    // const [scrollLeft, setScrollLeft] = useState(0);
    // const [highlightedDot, setHighlightedDot] = useState(0);

    const handleScroll = (event: any) => {
        const scrollableContent = event.currentTarget;
        const scrollWidth = scrollableContent.scrollWidth - scrollableContent.clientWidth;
        const ratio = scrollableContent.scrollLeft / scrollWidth;
        setScrollLeft(ratio);
    };
    useEffect(() => {
        // Calculate the index of the highlighted dot based on the scroll ratio
        const newIndex = Math.ceil(scrollLeft * (3 - 1));
        setHighlightedDot(newIndex);
    }, [scrollLeft]);
    // const handleScroll = () => {
    //     const scrollableDiv = document.getElementById('scrollable-div');
    //     if (scrollableDiv) {
    //         console.log('hiiiiii')
    //         const scrollLeft = scrollableDiv.scrollLeft;
    //         const scrollWidth = scrollableDiv.scrollWidth - scrollableDiv.clientWidth;
    //         const horizontalPercentage = (scrollLeft / scrollWidth) * 100;
    //         setHorizontalScrollPercentage(parseFloat(horizontalPercentage.toFixed(2)));
    //     }
    //     else {
    //         console.log('byeee')
    //     }
    // };

    useEffect(() => {
        const scrollableDiv = document.getElementById('scrollable-div');
        if (scrollableDiv) {
            scrollableDiv.addEventListener('scroll', handleScroll);
            return () => {
                scrollableDiv.removeEventListener('scroll', handleScroll);
            };
        }

    }, []);

    if (!vm.dataset) {
        return <div />;
    }
    const onDowloadAll = () => {
        createFeedbackNotification(vm.dataset, user);
        if (typeof window !== "undefined") {
            const previousPath = localStorage.getItem("previous_path");
            if (previousPath?.includes("/search?q=") && vm.dataset) {
                const startIndex =
                    previousPath.indexOf("/search?q=") + "/search?q=".length;
                const endIndex = previousPath.indexOf("&", startIndex);
                const extractedString = previousPath.substring(
                    startIndex,
                    endIndex
                );
                usereventDatasetDownloadSearchTerms(
                    vm.dataset,
                    extractedString
                );
            }
        }
        document.querySelectorAll("#downloadAll").forEach((element, index) => {
            setTimeout(() => {
                element.dispatchEvent(
                    new MouseEvent("click", {
                        bubbles: true,
                    })
                );
            }, 1000 * (index + 1));
        });
    };
    const urls = vm.dataset.urls?.filter(obj => obj.format !== null);
    // if (!urls.length) {
    //     return (
    //         <InfoAlert
    //             message="There is no data to show"
    //             className="mt-5 ml-20 mr-32"
    //             messageClassName="ml-56 font-semibold !text-lg !text-blue-800"
    //             divClassName="flex flex-row"
    //         />
    //     );
    // }
    return (
        <div className="max-w-screen">
            <div className="flex flex-col font-semibold items-left mb-1 ">
                <span>Data Files({urls?.length})</span>
                {urls?.length >0?<div className=" mt-4 font-normal  text-sm text-[#727272]">
                    All the data files available for this dataset are listed in the
                    table below.
                </div>:
                <div className=" mt-4 font-normal  text-sm text-[#727272]">
                    The data files for this dataset are not directly accessible.
                </div>}
            </div>

            {urls?.length > 0 &&<div className="overflow-x-scroll no-scrollbar " id="scrollable-div" onScroll={handleScroll}>
                <table
                    className="min-w-max sm:min-w-full w-full table-auto text-sm text-center"
                    cellPadding={5}
                >
                    <thead>
                        <tr className="border border-dtech-middle-grey p-3 ">
                            {META_FILE_HEADERS.map(
                                (headName: string, index: number) => (
                                    <th
                                        key={index}
                                        className="py-3 sm:px-6 text-center sm:text-[17px] font-medium bg-dtech-new-main-light text-white border-4 border-white"
                                    >
                                        {headName}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody
                        className="text-gray-600 text-sm font-light "
                        data-testid="data-files"
                    >
                        {
                            urls?.map((url, i) => {
                                return (
                                    <DataFileRow
                                        url={url}
                                        key={i}
                                        goToPreview={goToPreview}
                                        onDownload={() => {
                                            vm.dataset !== undefined && Http.post(`/v1/datasets/${vm.dataset.id}/downloads`);
                                            vm.dataset !== undefined &&
                                                usereventDatasetDownload(
                                                    vm.dataset,
                                                    url.url
                                                );
                                            if (typeof window !== "undefined") {
                                                const previousPath =
                                                    localStorage.getItem(
                                                        "previous_path"
                                                    );
                                                if (
                                                    previousPath?.includes(
                                                        "/search?q="
                                                    ) &&
                                                    vm.dataset
                                                ) {
                                                    const startIndex =
                                                        previousPath.indexOf(
                                                            "/search?q="
                                                        ) + "/search?q=".length;
                                                    const endIndex =
                                                        previousPath.indexOf(
                                                            "&",
                                                            startIndex
                                                        );
                                                    const extractedString =
                                                        previousPath.substring(
                                                            startIndex,
                                                            endIndex
                                                        );
                                                    usereventDatasetDownloadSearchTerms(
                                                        vm.dataset,
                                                        extractedString
                                                    );
                                                }
                                            }
                                            createFeedbackNotification(
                                                vm.dataset,
                                                user
                                            );
                                        }}
                                    />
                                );
                            })
                        }
                    </tbody>

                </table>
            </div>}

        </div>
    );
};

const DataFileRow = ({
    url,
    goToPreview,
    onDownload,
}: {
    url: DatasetUrl;
    goToPreview: () => void;
    onDownload: () => void;
}) => {
    const [preview, setPreview] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const downloadRef = useRef(null);
    let description = "Unknown";
    if (url.description?.replace(/['"]+/g, "") && url.description != "null") {
        description = url.description?.replace(/['"]+/g, "");
    } else if (url.format?.replace(/['"]+/g, "")) {
        description = url.format?.replace(/['"]+/g, "") + " data";
    }
    let sizemb = "Unknown";
    if (url.sizemb && url.sizemb != "null") {
        sizemb = url.sizemb + " KB";
    }
    return (
        <>
            <tr
                className={`bg-[#EBEBEB] hover:bg-dtech-light-teal hover:bg-opacity-50  !hover:text-white    ${preview && "bg-dtech-light-teal  bg-opacity-50"
                    }`}
            >
                <td className={`sm:px-6 text-center whitespace-nowrap  border-4 border-white text-[#2D2D32]  ${preview && "border-b-dtech-new-main-light border-4 border-dtech-main-dark border-b-[3px]"}`}>
                    <div className="flex justify-center items-center font-normal text-lg text-center ">{`${description}`}</div>
                </td>
                <td className={`sm:px-6 text-center border-4 border-white  text-[#2D2D32]   ${preview && "border-b-dtech-new-main-light border-4 border-dtech-main-dark border-b-[3px]"}`}>
                    <div className="flex justify-center items-center">
                        <span className="py-1 px-3 rounded-full text-lg font-normal">
                            {`${url.format.toUpperCase()}`}
                        </span>
                    </div>
                </td>
                <td className={`sm:px-6 text-center border-4 border-white  text-[#2D2D32] ${preview && "border-b-dtech-new-main-light border-4 border-dtech-main-dark border-b-[3px]"}`}>
                    <div className="flex items-center justify-center text-lg font-normal">
                        {sizemb}
                    </div>
                </td>
                <td className={`sm:px-6 text-center border-4  border-white  text-[#2D2D32] ${preview && "border-b-dtech-new-main-light border-4 border-dtech-main-dark border-b-[3px]"}`}>
                    <div className=" flex justify-center items-center">
                        <a
                            onClick={() => onDownload()}
                            href={url.url?.replace(/["']/g, "")}
                            className="underline"
                            download
                            target="_blank"
                            rel="noreferrer"
                            ref={downloadRef}
                            id="downloadAll"
                        >
                            <BiDownload size={24} className={` text-[#727272]`} />

                        </a>
                    </div>
                </td>
                <td className={`sm:px-6 text-center border-4 border-white  text-[#2D2D32]  ${preview && "border-b-dtech-new-main-light  border-dtech-main-dark border-b-[3px]"}`}>
                    <div className="flex item-center justify-center ">
                        {!preview ? (
                            <AiFillEye
                                size={24}
                                onClick={() => {
                                    goToPreview();
                                    setPreview(!preview);
                                }}
                                onMouseDown={() => setIsActive(!isActive)}
                                onMouseUp={() => setIsActive(!isActive)}
                                className={`mx-auto text-lg cursor-pointer text-[#727272]  `}
                            />
                        ) : (
                            <AiFillEye
                                size={24}
                                onClick={() => {
                                    setPreview(!preview);
                                }}
                                onMouseDown={() => setIsActive(!isActive)}
                                onMouseUp={() => setIsActive(!isActive)}
                                className={`mx-auto text-lg cursor-pointer text-[#727272] `}
                            />
                        )}
                    </div>
                </td>
            </tr>
            {preview && (
                <tr className="border-b border-gray-200 bg-[#FEFEFE] hover:bg-dtech-main-light ">
                    <td colSpan={5} className="bg-white">
                        <PreviewSection />
                    </td>
                </tr>
            )}{" "}
        </>
    );
};

export default DataFilesSection;
