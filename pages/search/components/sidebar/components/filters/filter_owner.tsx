import { useSearchFilter } from "pages/search/search.vm";
import { useRef } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterOwner = () => {
  const filterValues = useRef([
    { checkbox: false, value: "NHS", label: "NHS" },
    { checkbox: false, value: "ONS", label: "ONS" },
  ]);
  const { register, fields } = useSearchFilter({
    name: "owner",
    filterOptionItems: filterValues.current,
  });

  return (
    <FilterSection label="Owner">
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`owner.${i}.checkbox`)}
          label={field.value}
          value={field.value}
          defaultChecked={!!field.checkbox}
        />
      ))}
    </FilterSection>
  );
};

export default FilterOwner;
