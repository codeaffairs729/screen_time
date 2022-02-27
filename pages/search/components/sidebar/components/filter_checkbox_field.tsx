import clsx from "clsx";
import {
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

const FilterCheckboxField = ({
  label,
  register,
  value,
  className = "",
}: {
  label?: string;
  value?: any;
  register?: UseFormRegisterReturn;
  className?: string;
}) => {
  return (
    <div className={clsx("flex items-center mb-1.5", className)}>
      <input
        type="checkbox"
        {...register}
        className="text-dtech-primary-light focus:ring-0 rounded-sm border-dtech-primary-light"
        value={value}
      />
      {label && (
        <span className="ml-2 font-medium text-xs text-gray-700">{label}</span>
      )}
    </div>
  );
};

export default FilterCheckboxField;
