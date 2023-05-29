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
}: {
    label: string;
    children: ReactNode;
    className?: string;
    required?: boolean;
    isTwoRow?: boolean;
    tooltip?: string;
}) => {
    return (
        <div className={clsx("flex items-center mb-3", className)}>
            <div
                className={clsx(
                    "flex justify-between text-sm font-semibold text-gray-800 max-w-[275px] flex-grow px-2 py-2 mr-4",
                    isTwoRow ? "mb-3 " : " d-block "
                )}
            >
                <span className=" w-40">
                    {label}{" "}
                    <span
                        className={clsx("text-red-600", { hidden: !required })}
                    >
                        *
                    </span>
                </span>
                {tooltip != "none" && (
                    <span className="ml-6">
                        <InfoIcon title={tooltip} />
                    </span>
                )}
            </div>
            {children}
        </div>
    );
};

export default FormRow;
