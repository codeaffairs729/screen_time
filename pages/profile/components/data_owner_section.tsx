import clsx from "clsx";
import HeaderValue from "./header_value";

const DataOwnerSection = ({ className="" }: { className: string }) => {
  return (
    <div className={clsx("md:border-r md:pr-10 pt-2 mt-1", className)}>
      <h4 className="font-semibold mb-3 text-dtech-secondary-dark">
        Data Owner
      </h4>
      <HeaderValue className="mb-2" header="Your likes" value="0" />
      <HeaderValue className="mb-2" header="Your Favourites" value="0" />
      <HeaderValue
        className="mb-2 flex-col"
        header="Biography"
        value="Tell us about yourself..."
      />
    </div>
  );
};

export default DataOwnerSection;
