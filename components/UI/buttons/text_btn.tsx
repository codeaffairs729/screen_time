import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import Loader from "../loader";

const TextBtn = ({
  label,
  onClick,
  isLoading = false,
  isDisabled = false,
  className = "",
  dataSelector,
}: {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  dataSelector?: string;
}) => {
  return (
    <button
      data-selector={dataSelector}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        className
      )}
    >
      {isLoading ? <Loader /> : label}
    </button>
  );
};

export default TextBtn;
