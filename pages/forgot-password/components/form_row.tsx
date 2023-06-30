import clsx from "clsx";
import { ReactNode } from "react";

const FormRow = ({
  label,
  children,
  className
}: {
  label: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("flex items-center mb-3", className)}>
      <span className={clsx("mr-12 pl-2 w-40 py-2 text-sm font-semibold text-gray-800 bg-gray-100", className)}>
        {label}
      </span>
      {children}
    </div>
  );
};

export default FormRow;
