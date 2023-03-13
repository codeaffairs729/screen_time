import clsx from "clsx";
import Loader from "components/UI/loader";
import { IoSearchOutline } from "react-icons/io5";

const SearchIcon = ({ isLoading }: { isLoading: boolean }) => {
  let content;

  if (isLoading) {
      content = <Loader sizeClass="h-full" />;
  } else {
      content = (
          <IoSearchOutline
              className={clsx("text-dtech-main-dark")}
              size="auto"
          />
      );
  }
  return (
      <div className="rotate-90 flex items-center p-2 ml-1">
          {content}
      </div>
  );
};

export default SearchIcon;