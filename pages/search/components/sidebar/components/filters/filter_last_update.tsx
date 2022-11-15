import { FilterOptionItem, useSearchFilter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useRef } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLastUpdate = () => {
  const vm = useContext(SearchVMContext);
  const filterValues = useRef<FilterOptionItem[]>([
    { checkbox: false, label: "Past Week", value: "past_week" },
    { checkbox: false, label: "Past Month", value: "past_month" },
    { checkbox: false, label: "Past Year", value: "past_year" },
  ]);
  const { register, fields } = useSearchFilter({
    name: "last_update",
    filterOptionItems: filterValues.current,
  });

  return (
    <FilterSection label="Last Updated" disable={(vm.isLoading)}>
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`last_update.${i}.checkbox`)}
          label={field.label}
          value={field.value}
          defaultChecked={!!field.checkbox}
        />
      ))}
    </FilterSection>
  );
};

export default FilterLastUpdate;
