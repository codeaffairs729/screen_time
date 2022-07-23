import clsx from "clsx";
import {
  UseFormRegisterReturn,
} from "react-hook-form";

const FilterCheckboxField = ({
  label,
  register,
  value,
  className = "",
  defaultChecked,
  dataSelector
}: {
  label?: string;
  value?: any;
  register?: UseFormRegisterReturn;
  className?: string;
  defaultChecked: boolean;
  dataSelector?: string;
}) => {
  return (
    <div data-selector={dataSelector} className={clsx("flex items-center mb-1.5", className)}>
      <input
        type="checkbox"
        {...register}
        className="text-dtech-primary-light focus:ring-0 rounded-sm border-dtech-primary-light"
        value={value}
        defaultChecked={defaultChecked}
      />
      {label && (
        <span className="ml-2 font-medium text-xs text-gray-700">{label}</span>
      )}
    </div>
  );
};

export default FilterCheckboxField;
