import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

const FilterCheckboxField = ({
  label,
  register,
  value,
  className = "",
  defaultChecked,
  dataSelector,
}: {
  label?: string;
  value?: any;
  register?: UseFormRegisterReturn;
  className?: string;
  defaultChecked: boolean;
  dataSelector?: string;
}) => {
	return (
		<div
			data-selector={dataSelector}
			className={clsx("flex items-start mb-1.5", className)}
		>
			<input
				type="checkbox"
				{...register}
				className="focus:ring-0 rounded-sm border-dtech-main-dark text-dtech-main-dark"
				value={value}
				defaultChecked={defaultChecked}
			/>
			{label && (
				<span className="ml-2 text-sm">{label}</span>
			)}
		</div>
	);
};

export default FilterCheckboxField;
