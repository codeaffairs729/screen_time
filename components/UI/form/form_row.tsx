import clsx from "clsx";
import { ReactNode } from "react";

const FormRow = ({
  label,
  children,
  className = "",
  required = false,
  isTwoRow = false,
  labelClass ="",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  isTwoRow?: boolean;
  labelClass?: string;
}) => {
  return (
    <div className={clsx("flex items-center mb-3", className)}>
      <span
        className={clsx(
          "text-sm font-medium text-gray-800 bg-gray-100 flex-grow",
          isTwoRow ? "pl-2 py-2 mb-3 w-full" : "mr-4 pl-2 py-2 d-block w-[160px]"
        ,labelClass)}
      >
        {label}{" "}
        <span className={clsx("text-red-600", { hidden: !required })}>*</span>
      </span>
      {children}
    </div>
  );
};

export default FormRow;
