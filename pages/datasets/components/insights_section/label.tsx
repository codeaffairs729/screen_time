import { formatLabel } from "pages/datasets/dataset_detail.vm";

const DatasetLabel = ({
    labelPrefix,
    label,
}: {
    labelPrefix: string;
    label: string;
}) => {
    return (
        <div className="flex select-none outline-none flex-col text-dtech-main-dark text-left">
            <span>{labelPrefix}</span>
            <span>{formatLabel(label)}</span>
        </div>
    );
};

export default DatasetLabel;