import clsx from "clsx";
import { ReactNode } from "react";
import InfoIcon from "components/UI/icons/info_icon";

const FormRow = ({
    label,
    children,
    className = "",
    required = false,
    isTwoRow = false,
    tooltip = "none",
    labelClass = "",
    iconClass = "",
    tooltipClass= "",
}: {
    label: string;
    children: ReactNode;
    className?: string;
    required?: boolean;
    isTwoRow?: boolean;
    tooltip?: string;
    labelClass?: string;
    iconClass?: string;
    tooltipClass?: string;
}) => {
    return (
        <div className={clsx("flex items-center mb-3", className)}>
            <div
                className={clsx(
                    "flex justify-between text-sm font-semibold text-gray-800 flex-grow px-2 py-2 mr-4 w-full",
                    labelClass,
                    isTwoRow ? "mb-3 " : " d-block "
                )}
            >
                <span className="">
                    {label}{" "}
                    <span
                        className={clsx("text-red-600", { hidden: !required })}
                    >
                        *
                    </span>
                </span>
                {tooltip != "none" && (
                    <span className={clsx("ml-6",tooltipClass)}>
                        <InfoIcon title={tooltip} iconClasses={iconClass} />
                    </span>
                )}
            </div>
            {children}
        </div>
    );
};

export default FormRow;
