import { useWatchFilter } from "common/hooks";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterOwner = () => {
  const vm = useContext(SearchVMContext);
  const {register}= useWatchFilter({setActiveFilter: vm.setActiveFilter, name: 'owner'});

  return (
    <FilterSection label="Owner">
      <FilterCheckboxField register={register("owner")} label="NHS" value="NHS" />
      <FilterCheckboxField register={register("owner")} label="ONS" value="ONS" />
    </FilterSection>
  );
};

export default FilterOwner;
