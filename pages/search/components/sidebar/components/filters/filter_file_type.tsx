import { useSearchFilter } from "pages/search/search.vm";
import { useRef } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterFileType = () => {
  const filterValues = useRef([
    { checkbox: false, value: "CSV", label: "CSV" },
    { checkbox: false, value: "PDF", label: "PDF" },
  ]);

  const { register, fields } = useSearchFilter({
    name: "file_type",
    filterOptionItems: filterValues.current,
  });

  return (
    <FilterSection label="File type">
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`file_type.${i}.checkbox`)}
          label={field.value}
          value={field.value}
          defaultChecked={!!field.checkbox}
        />
      ))}
    </FilterSection>
  );
};

export default FilterFileType;
