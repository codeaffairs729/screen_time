import clsx from "clsx";

const HeaderValue = ({
  header,
  value,
  className = "",
}: {
  header: string;
  value: string;
  className?: string;
}) => {
  return (
    <div className={clsx("flex", className)}>
      <span className="text-sm font-medium text-gray-600 mr-1 text-left">{header}:</span>
      <span className="text-sm text-gray-600 font-light">{value}</span>
    </div>
  );
};

export default HeaderValue;
