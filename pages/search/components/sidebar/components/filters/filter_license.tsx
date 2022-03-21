import { useSearchFilter } from "pages/search/search.vm";
import { useRef } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLicense = () => {
  const filterValues = useRef([
    { checkbox: false, value: "Open", label: "Open" },
    { checkbox: false, value: "OGL", label: "OGL" },
    { checkbox: false, value: "Closed", label: "Closed" },
  ]);
  const { register, fields } = useSearchFilter({
    name: "license",
    filterOptionItems: filterValues.current,
  });

  return (
    <FilterSection label="License">
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`license.${i}.checkbox`)}
          label={field.value}
          value={field.value}
          defaultChecked={!!field.checkbox}
        />
      ))}
    </FilterSection>
  );
};

export default FilterLicense;
