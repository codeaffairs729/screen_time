import clsx from "clsx";
import Dataset from "models/dataset.model";

const DataOwner = ({ dataset, className="" }: { dataset: Dataset, className?: string }) => {
  return (
    <div className={clsx("flex", className)}>
      <span className="text-xs text-gray-800 font-medium mr-1 whitespace-nowrap">
        Data Owner:
      </span>
      <span className="text-xs">{dataset.owner.name}</span>
    </div>
  );
};

export default DataOwner;
