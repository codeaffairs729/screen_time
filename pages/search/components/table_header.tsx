import clsx from "clsx";
import { ReactNode } from "react";

const TableHeader = () => {
  return (
    <>
      <HeaderItem className="min-w-[350px]">Dataset</HeaderItem>
      <HeaderItem>Popularity</HeaderItem>
      <HeaderItem>Quality</HeaderItem>
      <HeaderItem>Last updated</HeaderItem>
      <HeaderItem>Last Download</HeaderItem>
      <HeaderItem>Favourites</HeaderItem>
    </>
  );
};

const HeaderItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "text-sm font-bold outline outline-1 outline-gray-300 px-2 py-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TableHeader;
