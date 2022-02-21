import { DatasetUrl } from "models/dataset.model";
import Image from "next/image";

const DatasetDownload = ({ urls }: { urls: DatasetUrl[] }) => {
  if (!urls || urls.length < 1) return <div />;
  return (
    <>
      {urls.length > 0 && (
        <div className="flex">
          <span className="text-xs font-semibold mr-1">Data:</span>
          <div>
            {urls.map((url, i) => (
              <DatasetDownloadItem
                key={i}
                label={`${url.format}`}
                url={url.url}
              />
            ))}
          </div>
        </div>
      )}
    </>
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
    <a href={newUrl} className="flex" download>
      <Image
        src="/images/icons/folder.svg"
        width="20px"
        height="20px"
        alt="folder icon"
      />
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
};

export default DatasetDownload;
