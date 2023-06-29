import { ReactNode } from "react";
import clsx from "clsx";

const FormRow = ({
    label,
    children,
    className,
}: {
    label: string;
    children?: ReactNode;
    className?: string;
}) => {
    return (
        <div className={clsx("flex items-center mb-3 w-full")}>
            <span className={clsx("mr-2 pl-2 max-w-[160px] w-full py-2 text-sm font-semibold text-gray-800 bg-gray-100", className)}>
                {label}
            </span>
            {children}
        </div>
    );
};

export default FormRow;
