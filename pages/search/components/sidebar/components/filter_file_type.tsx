import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FilterCheckboxField from "./filter_checkbox_field";
import FilterSection from "./filter_section";

const FilterFileType = () => {
  const { register, watch } = useForm();
  const watchAll = watch();

  useEffect(() => {
    console.log("watchAll", watchAll);
  }, [watchAll]);
  return (
    <FilterSection label="File type">
      <FilterCheckboxField register={register("file_type")} label="CSV" />
      <FilterCheckboxField register={register("file_type")} label="PDF" />
    </FilterSection>
  );
};

export default FilterFileType;
