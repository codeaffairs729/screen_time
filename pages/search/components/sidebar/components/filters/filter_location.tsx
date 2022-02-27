import { useWatchFilter } from "common/hooks";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLocation = () => {
  const vm = useContext(SearchVMContext);
  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "location",
  });

  return (
    <FilterSection label="Location">
      <FilterCheckboxField
        register={register("location")}
        label="Scotland"
        value="scotland"
      />
      <FilterCheckboxField
        register={register("location")}
        label="Unspecified"
        value="unspecified"
      />
    </FilterSection>
  );
};

export default FilterLocation;
