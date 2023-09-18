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
    tooltipClass = "",
    iconClasses=""
}: {
    label: string;
    children: ReactNode;
    className?: string;
    required?: boolean;
    isTwoRow?: boolean;
    tooltip?: string;
    labelClass?: string;
    tooltipClass?: string;
    iconClasses?: string;
}) => {
    return (
        <div className={clsx("flex items-center mb-3", className)}>
            <div
                className={clsx(
                    "flex text-xl font-normal text-gray-800 flex-grow px-2 py-2 ",
                    isTwoRow ? "mb-3 w-full" : "mr-2  max-w-[275px]"
                )}
            >
                <span className={clsx(labelClass)}>
                    {label}{" "}
                    {tooltip != "none" && (
                        <span className="">
                            <InfoIcon title={tooltip} tooltipClassName={clsx(tooltipClass)} iconClasses={clsx(iconClasses)} />
                        </span>
                    )}
                </span>
            </div>
            {children}
        </div>
    );
};

export default FormRow;
