import clsx from "clsx";
import Http from "common/http";
import Dataset from "models/dataset.model.v4";
import Image from "next/image";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { usereventDatasetDownload } from "services/usermetrics.service";

const DatasetDownload = ({
    dataset,
    className = "",
}: {
    dataset: Dataset;
    className?: string;
}) => {
    const urls = dataset.urls;
    return (
        <div className={clsx("flex", className)}>
            <span className="text-xs font-medium text-gray-800 mr-1">
                Data:
            </span>
            <div>
                {urls && urls.length > 0 ? (
                    urls.map((url, i) => (
                        <DatasetDownloadItem
                            key={i}
                            dataset={dataset}
                            label={`${
                                url.description.replace(/['"]+/g, "")
                                    ? url.description.replace(/['"]+/g, "") +
                                      ": "
                                    : ""
                            }${url.format}, ${url.sizemb} MB`}
                            url={url.url}
                        />
                    ))
                ) : (
                    <span className="text-xs block text-gray-600">None</span>
                )}
            </div>
        </div>
    );
};

const DatasetDownloadItem = ({
    label,
    dataset,
    url,
}: {
    label: string;
    dataset: Dataset;
    url: string;
}) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const updateDownloadStat = () => {
        Http.post(`/v1/datasets/${dataset.id}/downloads`);
        usereventDatasetDownload(dataset, url);
    };
    const newUrl = url?.replace(/["']/g, "");

    return (
        <a
            href={newUrl}
            className="flex space-x-1"
            onClick={updateDownloadStat}
            download
        >
            <Image
                src="/images/icons/folder.svg"
                width="20px"
                height="20px"
                alt="folder icon"
            />
            <span className="text-xs font-medium underline">{label}</span>
        </a>
    );
};

export default DatasetDownload;
