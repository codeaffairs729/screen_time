import { ReactNode } from "react";

const FormRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center mb-3 w-full">
      <span className="mr-2 pl-2 max-w-[160px] w-full py-2 text-sm font-semibold text-gray-800 bg-gray-100">
        {label}
      </span>
      {children}
    </div>
  );
};

export default FormRow;
