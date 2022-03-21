import { useSearchFilter } from "pages/search/search.vm";
import { useRef } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLocation = () => {
  const filterValues = useRef([
    { checkbox: false, value: "Scotland", label: "Scotland" },
    { checkbox: false, value: "Unspecified", label: "Unspecified" },
  ]);
  const { register, fields } = useSearchFilter({
    name: "location",
    filterOptionItems: filterValues.current,
  });

  return (
    <FilterSection label="Location">
      {fields.map((field, i) => (
        <FilterCheckboxField
          key={field.id}
          register={register(`location.${i}.checkbox`)}
          label={field.value}
          value={field.value}
          defaultChecked={!!field.checkbox}
        />
      ))}
    </FilterSection>
  );
};

export default FilterLocation;
