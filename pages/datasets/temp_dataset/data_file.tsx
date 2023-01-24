import { useContext, useState } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import { DatasetUrl } from "models/dataset.model";
import { BsCloudDownloadFill, BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import downloadIcon from "public/images/icons/download.svg";
import previewIcon from "public/images/icons/preview.svg";
import doNotPreview from "public/images/icons/do_not_preview.svg";
import Image from "next/image";

const DataFilesSection = ({ goToPreview }: { goToPreview: () => void }) => {
    const vm = useContext(DatasetDetailVMContext);
    const user = useSelector((state: RootState) => state.auth.user);
    const { createFeedbackNotification } = useContext(NotificationsVMContext);

    if (!vm.dataset) {
        return <div />;
    }
    console.log("vm.dataset :",vm.dataset.urls.length);
    
    return (
        <div>
            <div className="flex flex-row justify-between items-center mx-3 my-4 ">
                <span>Total file : {vm.dataset.urls.length}</span>
                <div className="flex flex-row">
                    <span className="mr-2">Download all</span>
                    <Image src={downloadIcon} alt="" height={24} width={24} />
                </div>
            </div>
            <div className=" h-[40rem]  overflow-y-scroll ">
                <table className="min-w-max w-full table-auto text-sm text-left border">
                    <thead>
                        <tr className="text-[17px] font-normal ">
                            <th className="py-3 px-6 text-left text-[17px] font-medium bg-[#F5F5F5] ">
                                Name
                            </th>
                            <th className="py-3 px-6 text-left text-[17px] font-medium bg-[#F5F5F5] ">
                                Format
                            </th>
                            <th className="py-3 px-6 text-center text-[17px] font-medium bg-[#F5F5F5] ">
                                Size
                            </th>
                            <th className="py-3 px-6 text-center text-[17px] font-medium bg-[#F5F5F5] ">
                                Download
                            </th>
                            <th className="py-3 px-6 text-center text-[17px] font-medium bg-[#F5F5F5] ">
                                Preview
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        className="text-gray-600 text-sm font-light"
                        data-testid="data-files"
                    >
                        {vm.dataset.urls.length > 0 ? (
                            vm.dataset.urls.map((url, i) => {
                                return (
                                    <DataFileRow
                                        url={url}
                                        key={i}
                                        goToPreview={goToPreview}
                                        onDownload={() =>
                                            createFeedbackNotification(
                                                vm.dataset,
                                                user
                                            )
                                        }
                                    />
                                );
                            })
                        ) : (
                            <div className="my-2 mx-2">
                                No data files available for this dataset.
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
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
    return (
        <tr className="border-b border-gray-200 bg-[#FEFEFE] hover:bg-dtech-main-light">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center font-normal text-sm">{`${
                    url.description.replace(/['"]+/g, "")
                        ? url.description.replace(/['"]+/g, "")
                        : "Unknown"
                }`}</div>
            </td>
            <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                    <span className="py-1 px-3 rounded-full text-sm font-normal">
                        {`${url.format}`}
                    </span>
                </div>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center font-normal">{`${url.sizemb} KB`}</div>
            </td>
            <td className="py-3 px-6 text-center">
                <a
                    onClick={() => onDownload()}
                    href={url.url?.replace(/["']/g, "")}
                    className="underline"
                    download
                >
                    <Image src={downloadIcon} alt="" height={24} width={24} />
                </a>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                    {!preview ? (
                        <Image
                            src={previewIcon}
                            alt=""
                            height={24}
                            width={24}
                            onClick={() => {
                                goToPreview();
                                setPreview(!preview);
                            }}
                            className="mx-auto text-lg cursor-pointer"
                        />
                    ) : (
                        <Image
                            src={doNotPreview}
                            alt=""
                            height={24}
                            width={24}
                            onClick={() => {
                                setPreview(!preview);
                            }}
                            className="mx-auto text-lg cursor-pointer"
                        />
                    )}
                </div>
            </td>
        </tr>
    );
};

export default DataFilesSection;
