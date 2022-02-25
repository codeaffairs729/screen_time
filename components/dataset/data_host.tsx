import clsx from "clsx";
import Dataset from "models/dataset.model";

const DataHost = ({ dataset, className }: { dataset: Dataset, className?: string }) => {
  return (
    <div className={clsx("flex", className)}>
      <span className="text-xs font-medium mr-1 whitespace-nowrap">
        Data Host:
      </span>
      <a
        href={dataset.detail.hostUrl}
        target="_blank"
        rel="noreferrer"
        className="text-xs underline"
      >
        {dataset.detail.hostName}
      </a>
    </div>
  );
};

export default DataHost;
