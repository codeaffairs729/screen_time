import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import { DatasetUrl } from "models/dataset.model";
import { BsCloudDownloadFill, BsEyeFill } from "react-icons/bs";

const DataFilesSection = ({ goToPreview }: { goToPreview: () => void }) => {
    const vm = useContext(DatasetDetailVMContext);
    if (!vm.dataset) {
        return <div />;
    }
    console.log(vm.dataset);
    return (
        <div className="p-3">
            {/* <DatasetDownload className="flex-col" dataset={vm.dataset} /> */}

            <div className="bg-white rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Format</th>
                            <th className="py-3 px-6 text-center">Size</th>
                            <th className="py-3 px-6 text-center">Download</th>
                            <th className="py-3 px-6 text-center">Preview</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light" data-testid="data-files">
                        {vm.dataset.urls.length > 0 ? (
                            vm.dataset.urls.map((url, i) => {
                                return (
                                    <DataFileRow
                                        url={url}
                                        key={i}
                                        goToPreview={goToPreview}
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
}: {
    url: DatasetUrl;
    goToPreview: () => void;
}) => {
    return (
        <tr className="border-b border-gray-200 bg-[#FEFEFE] hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center font-medium">{`${
                    url.description.replace(/['"]+/g, "")
                        ? url.description.replace(/['"]+/g, "")
                        : "Unknown"
                }`}</div>
            </td>
            <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                        {`${url.format}`}
                    </span>
                </div>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">{`${url.sizemb} MB`}</div>
            </td>
            <td className="py-3 px-6 text-center">
                <a
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
