import { FilterOptionItem, useSearchFilter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLastUpdate = () => {
  const vm = useContext(SearchVMContext);
  const [filterOptions, setFilterOptions] = useState<
        FilterOptionItem[] | undefined
    >([]);

  useEffect(() => {
    const filterValues = [
      { checkbox: false, label: "Past Week", value: "past_week" },
      { checkbox: false, label: "Past Month", value: "past_month" },
      { checkbox: false, label: "Past Year", value: "past_year" },
    ]

    setFilterOptions(filterValues);
  }, [vm.filterOptions]);

  const { register, fields } = useSearchFilter({
    name: "last_updated",
    filterOptionItems: filterOptions,
  });

  return (
    <FilterSection label="Last Updated" disable={(vm.isLoading)}>
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`last_updated.${i}.checkbox`)}
          label={field.label}
          value={field.value}
          defaultChecked={!!field.checkbox}
        />
      ))}
    </FilterSection>
  );
};

export default FilterLastUpdate;
