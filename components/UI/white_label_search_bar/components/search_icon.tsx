import clsx from "clsx";
import Loader from "components/UI/loader";

const SearchIcon = ({ isLoading }: { isLoading: boolean }) => {
  let content;

  if (isLoading) {
      content = <Loader sizeClass="h-full" />;
  } else {
      content = (
          <img src="/images/icons/new_search_icon.svg"/>
      );
  }
  return (
      <div className=" flex items-center justify-center p-0 mx-1 h-full">
          {content}
      </div>
  );
};

export default SearchIcon;