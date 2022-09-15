import clsx from "clsx";
import InfoIcon from "components/UI/icons/info_icon";
import { ReactNode } from "react";

const LabelledRow = ({
    label,
    tooltip,
    children,
    className = "",
    displayContext,
}: {
    label: string;
    tooltip?: string;
    children: ReactNode;
    className?: string;
    displayContext?: String;
}) => {
    return (
        <div
            data-testid={displayContext}
            className={clsx("flex space-x-1", className)}
        >
            <span className="text-xs font-medium whitespace-nowrap">
                {label}
                {tooltip && <InfoIcon className="ml-1" title={tooltip} />}:
            </span>
            {children !== null || children !== undefined ? (
                <span className="text-xs">{children}</span>
            ) : (
                <span className="text-xs text-gray-600">Unkown</span>
            )}
        </div>
    );
};

export default LabelledRow;
