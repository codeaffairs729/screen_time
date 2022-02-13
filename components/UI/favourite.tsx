import Image from "next/image";

const Favourite = ({
  isFavourited = false,
  readonly = false,
  onClick,
}: {
  isFavourited: boolean;
  readonly?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button aria-label="Favoruite dataset" onClick={onClick}>
      <Image
        src={`/images/icons/favourite/${
          isFavourited ? "favourited" : "not_favourited"
        }.svg`}
        width="40px"
        height="40px"
        alt="favourite"
      />
    </button>
  );
};

export default Favourite;
