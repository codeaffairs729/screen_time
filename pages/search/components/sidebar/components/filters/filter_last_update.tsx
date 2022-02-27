import { useWatchFilter } from "common/hooks";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLastUpdate = () => {
  const vm = useContext(SearchVMContext);
  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "last_update",
  });

  return (
    <FilterSection label="Last Updated">
      <FilterCheckboxField
        register={register("last_update")}
        label="Past Week"
        value="past_week"
      />
      <FilterCheckboxField
        register={register("last_update")}
        label="Past Month"
        value="Past_month"
      />
      <FilterCheckboxField
        register={register("last_update")}
        label="Past Year"
        value="past_year"
      />
    </FilterSection>
  );
};

export default FilterLastUpdate;
