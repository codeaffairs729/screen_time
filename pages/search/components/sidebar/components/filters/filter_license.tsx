import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLicense = () => {
  const { register, watch, control } = useForm();
  const vm = useContext(SearchVMContext);
  const licenseState = useWatch({
    control,
    name: "license",
    defaultValue: [],
  });

  useEffect(() => {
    vm.setActiveFilter((state: Filter) => ({
      ...state,
      license: licenseState,
    }));
  }, [licenseState]);

  return (
    <FilterSection label="License">
      <FilterCheckboxField register={register("license")} label="Open" value="Open" />
      <FilterCheckboxField register={register("license")} label="OGL" value="OGL" />
      <FilterCheckboxField register={register("license")} label="Closed" value="Closed" />
    </FilterSection>
  );
};

export default FilterLicense;
