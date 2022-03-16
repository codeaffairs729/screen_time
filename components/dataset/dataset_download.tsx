import clsx from "clsx";
import { DatasetUrl } from "models/dataset.model";
import Image from "next/image";

const DatasetDownload = ({
  urls,
  className = "",
}: {
  urls: DatasetUrl[];
  className?: string;
}) => {
  return (
    <div className={clsx("flex", className)}>
      <span className="text-xs font-medium text-gray-800 mr-1">Data:</span>
      <div>
        {urls && urls.length > 0 ? (
          urls.map((url, i) => (
            <DatasetDownloadItem
              key={i}
              label={`${url.format}, ${url.sizemb} MB`}
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
  url,
}: {
  label: string;
  url: string;
}) => {
  const newUrl = url?.replace(/["']/g, "");

  return (
    <a href={newUrl} className="flex space-x-1" download>
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
