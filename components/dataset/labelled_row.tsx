import clsx from "clsx";
import InfoIcon from "components/UI/icons/info_icon";
import { ReactNode } from "react";

const LabelledRow = ({
    label,
    tooltip,
    children,
    className = "",
    displayContext,
    labelClasses = "",
    childClasses = "",
}: {
    label: string;
    tooltip?: string;
    children: ReactNode;
    className?: string;
    displayContext?: String;
    labelClasses?: string;
    childClasses?: string;
}) => {
    return (
        <div
            data-testid={displayContext}
            className={clsx("flex space-x-1", className)}
        >
            <span
                className={clsx(
                    "text-xs font-medium whitespace-nowrap",
                    labelClasses
                )}
            >
                {label}
                {tooltip && <InfoIcon className="ml-1" title={tooltip} />}
            </span>
            {children !== null || children !== undefined ? (
                <span className={clsx("text-xs", childClasses)}>
                    {children}
                </span>
            ) : (
                <span className={clsx("text-xs text-gray-600", childClasses)}>
                    Unknown
                </span>
            )}
        </div>
    );
};

export default LabelledRow;
