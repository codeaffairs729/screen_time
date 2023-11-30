import { formatLabel } from "pages/organisation/organisation_detail.vm";

const Label = ({
    labelPrefix,
    label,
}: {
    labelPrefix: string;
    label: string;
}) => {
    return (
        <div className="flex select-none outline-none flex-col text-dtech-dark-teal text-left sm:text-xl text-sm">
            <span>{labelPrefix}</span>
            {/* <span>{formatLabel(label)}</span> */}
        </div>
    );
};

export default Label;
