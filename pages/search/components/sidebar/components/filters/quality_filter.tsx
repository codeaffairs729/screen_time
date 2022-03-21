import StarRating from "components/UI/star_rating";
import { useSearchFilter } from "pages/search/search.vm";
import { ReactNode, useRef } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const QualityFilter = () => {
  const filterValues = useRef([
    { checkbox: false, value: "1", label: "1" },
    { checkbox: false, value: "2", label: "2" },
    { checkbox: false, value: "3", label: "3" },
    { checkbox: false, value: "4", label: "4" },
    { checkbox: false, value: "5", label: "5" },
  ]);
  const { register, fields } = useSearchFilter({
    name: "quality",
    filterOptionItems: filterValues.current,
  });

  return (
    <FilterSection label="Quality">
      {fields.map((field, i) => (
        <StarRow key={field.id} stars={i + 1}>
          <FilterCheckboxField
            register={register(`quality.${i}.checkbox`)}
            // label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        </StarRow>
      ))}
    </FilterSection>
  );
};

const StarRow = ({
  stars,
  children,
}: {
  stars: number;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-start">
      {children}
      <StarRating rating={stars} />
    </div>
  );
};

export default QualityFilter;
