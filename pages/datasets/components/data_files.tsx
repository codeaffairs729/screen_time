import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import { DatasetUrl } from "models/dataset.model";
import { BsCloudDownloadFill, BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { NotificationsVMContext } from "pages/workspace/notification.vm";

const DataFilesSection = ({ goToPreview }: { goToPreview: () => void }) => {
    const vm = useContext(DatasetDetailVMContext);
    const user = useSelector((state: RootState) => state.auth.user);
    const { createFeedbackNotification } = useContext(NotificationsVMContext);

    if (!vm.dataset) {
        return <div />;
    }

    return (
        <div>
            <table className="min-w-max w-full table-auto bg-white rounded">
                <thead>
                    <tr className="bg-gray-200 text-dtech-secondary-dark text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Format</th>
                        <th className="py-3 px-6 text-center">Size</th>
                        <th className="py-3 px-6 text-center">Download</th>
                        <th className="py-3 px-6 text-center">Preview</th>
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
    let description = "Unknown";
    if (url.description?.replace(/['"]+/g, "") && url.description != "null") {
        description = url.description?.replace(/['"]+/g, "");
    } else if (url.format?.replace(/['"]+/g, "")) {
        description = url.format?.replace(/['"]+/g, "") + " data";
    }
    let sizemb = "Unknown";
    if (url.sizemb && url.sizemb != "null") {
        sizemb = url.sizemb;
    }
    return (
        <tr className="border-b border-gray-200 bg-[#FEFEFE] hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center font-medium">
                    {description}
                </div>
            </td>
            <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                        {`${url.format}`}
                    </span>
                </div>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">{`${sizemb} MB`}</div>
            </td>
            <td className="py-3 px-6 text-center">
                <a
                    onClick={() => onDownload()}
                    href={url.url?.replace(/["']/g, "")}
                    className="underline"
                    download
                >
                    <BsCloudDownloadFill className="mx-auto text-lg" />
                </a>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                    <BsEyeFill
                        className="mx-auto text-lg"
                        onClick={() => {
                            goToPreview();
                        }}
                    />
                </div>
            </td>
        </tr>
    );
};

export default DataFilesSection;
