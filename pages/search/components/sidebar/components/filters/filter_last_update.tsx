import { FilterOptionItem, useSearchFilter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLastUpdate = () => {
  const vm = useContext(SearchVMContext);
  const {isMobile, mobileFilter,setMobileFilter } = vm;
  const [filterOptions, setFilterOptions] = useState<
        FilterOptionItem[] | undefined
    >([]);
  useEffect(() => {
    const filterValues = vm.filterOptions?.last_updated?.map((format: any) => ({
      value: format.value,
      label: format.count,
      checkbox: false,
    }));
    // const filterValues = [
    //   { checkbox: false, label: "Past Day", value: "Past day" },
    //   { checkbox: false, label: "Past Week", value: "Past 7 days" },
    //   { checkbox: false, label: "Past Month", value: "Past 30 days" },
    //   { checkbox: false, label: "Past 3 Months", value: "Past 90 days" },
    // ]

    setFilterOptions(filterValues);
  }, [vm.filterOptions]);

  const { register, fields,control, setValue } = useSearchFilter({
    name: "last_updated",
    filterOptionItems: filterOptions,
  });

  return (
    <FilterSection label="Last Updated" disable={(vm.isLoading)}>
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`last_updated.${i}.checkbox`)}
          label={field.value}
          value={field.label}
          count={field.label}
          defaultChecked={!!field.checkbox}
          name={`last_updated.${i}.checkbox`}
          control={control}
          setValue={setValue}
        />
      ))}
    </FilterSection>
  );
};

export default FilterLastUpdate;
