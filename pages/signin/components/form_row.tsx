import { ReactNode } from "react";

const FormRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center mb-3">
      <span className="mr-4 pl-2 w-40 py-2 text-sm font-semibold text-gray-800 bg-gray-100">
        {label}
      </span>
      {children}
    </div>
  );
};

export default FormRow;
