import Image from "next/image";
import Loader from "../loader";

const FavouriteBtn = ({
  isFavourited = false,
  isDisabled = false,
  isLoading = false,
  onClick,
}: {
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
      className="flex items-center justify-center"
    >
      {!isLoading ? (
        <Image
          src={`/images/icons/favourite/${
            isFavourited ? "favourited" : "not_favourited"
          }.svg`}
          width="40px"
          height="40px"
          alt="favourite"
        />
      ) : (
        <Loader />
      )}
    </button>
  );
};

export default FavouriteBtn;
