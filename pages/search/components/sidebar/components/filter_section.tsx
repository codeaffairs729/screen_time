import { ReactNode } from "react";

const FilterSection = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="px-2 py-0.5">
      <h4 className="text-dtech-primary-dark text-sm font-medium mb-1">{label}</h4>
      <div className="max-h-80 overflow-auto">{children}</div>
      <hr />
    </div>
  );
};

export default FilterSection;