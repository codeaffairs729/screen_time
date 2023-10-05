import clsx from "clsx";
import Loader from "../loader";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const PrimaryBtn = ({
    label,
    onClick,
    isLoading = false,
    isDisabled = false,
    className = "bg-dtech-primary-dark",
    dataSelector,
    dropdownIcon = false,
    isOpen = false,
    iconClass = "",
}: {
    label: string;
    onClick?: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    dataSelector?: string;
    dropdownIcon?: boolean;
    isOpen?: boolean;
    iconClass?: string;
}) => {
    return (
        <button
            data-selector={dataSelector}
            type="button"
            onClick={onClick}
            disabled={isDisabled}
            className={clsx(
                "text-sm font-medium text-white w-full rounded px-3 py-1 flex justify-center disabled:bg-gray-400",
                className
            )}
        >
            {
                isLoading
                  ? <Loader />
                  : dropdownIcon
                    ? (<div className="flex">
                        {label}
                        {isOpen ? <HiOutlineChevronUp className={clsx("w-5 h-5", iconClass)} /> : <HiOutlineChevronDown className={clsx("w-5 h-5", iconClass)} />}
                      </div>)
                    : label
            }
        </button>
    );
};

export default PrimaryBtn;
