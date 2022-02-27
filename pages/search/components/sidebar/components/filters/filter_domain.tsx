import { useWatchFilter } from "common/hooks";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterDomain = () => {
  const vm = useContext(SearchVMContext);
  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "domain",
  });

  return (
    <FilterSection label="Domain">
      <FilterCheckboxField
        register={register("domain")}
        label="Entertainment"
        value="entertainment"
      />
      <FilterCheckboxField
        register={register("domain")}
        label="Health"
        value="health"
      />
    </FilterSection>
  );
};

export default FilterDomain;
