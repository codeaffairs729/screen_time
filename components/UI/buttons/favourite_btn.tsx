import clsx from "clsx";
import Image from "next/image";
import Loader from "../loader";

const FavouriteBtn = ({
  className = "",
  isFavourited = false,
  isDisabled = false,
  isLoading = false,
  onClick,
}: {
  className?: string;
  isFavourited: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      aria-label="Favoruite dataset"
      onClick={onClick}
      disabled={isDisabled}
      className={clsx("flex items-center justify-center", className)}
    >
      {!isLoading ? (
        <Image
          src={`/images/icons/favourite/${
            isFavourited ? "favourited" : "not_favourited"
          }.svg`}
          width="25px"
          height="25px"
          alt="favourite"
        />
      ) : (
        <Loader className="m-0.5" />
      )}
    </button>
  );
};

export default FavouriteBtn;
