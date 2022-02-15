import clsx from "clsx";
import Loader from "../loader";

const PrimaryBtn = ({
  label,
  onClick,
  isLoading = false,
  isDisabled = false,
  className = "",
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
        "bg-dtech-primary-dark text-sm font-medium text-white w-full rounded px-3 py-1 flex justify-center",
        className
      )}
    >
      {isLoading ? <Loader /> : label}
    </button>
  );
};

export default PrimaryBtn;
