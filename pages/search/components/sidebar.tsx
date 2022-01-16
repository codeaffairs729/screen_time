import clsx from "clsx";

const Sidebar = ({ className = "" }: { className?: string }) => {
  return <div className={clsx("bg-gray-300", className)}>sidebar</div>;
};

export default Sidebar;
