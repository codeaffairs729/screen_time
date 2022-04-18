import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import Loader from "../loader";

const PrimaryBtn = ({
  label,
  onClick,
  isLoading = false,
  isDisabled = false,
  className = "bg-dtech-primary-dark",
}: {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        "text-sm font-medium text-white w-full rounded px-3 py-1 flex justify-center disabled:bg-gray-400",
        className
      )}
    >
      {isLoading ? <Loader /> : label}
    </button>
  );
};

export default PrimaryBtn;
