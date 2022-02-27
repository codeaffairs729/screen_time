import { useWatchFilter } from "common/hooks";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterFileType = () => {
  const vm = useContext(SearchVMContext);
  const {register}= useWatchFilter({setActiveFilter: vm.setActiveFilter, name: 'file_type'});

  return (
    <FilterSection label="File type">
      <FilterCheckboxField register={register("file_type")} label="CSV" value="CSV" />
      <FilterCheckboxField register={register("file_type")} label="PDF" value="PDF" />
    </FilterSection>
  );
};

export default FilterFileType;
