import { useWatchFilter } from "common/hooks";
import StarRating from "components/UI/star_rating";
import Image from "next/image";
import { SearchVMContext } from "pages/search/search.vm";
import { useContext } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const QualityFilter = () => {
  const vm = useContext(SearchVMContext);
  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "quality",
  });

  return (
    <FilterSection label="Quality">
      {[...Array(5)].map((_, i) => (
        <StarRow register={register} key={i} stars={i + 1} />
      ))}
    </FilterSection>
  );
};

const StarRow = ({ stars, register }: { stars: number; register: any }) => {
  return (
    <div className="flex items-center justify-start">
      <FilterCheckboxField
        value={stars}
        register={register("quality")}
        className="mr-1 mb-0"
      />
      {/* {[...Array(stars).map((_,i)=>(<Image
        src={`/images/icons/star/${type}_star.svg`}
        width="14px"
        height="14px"
        alt={`${type} star`}
      />))]} */}
      <StarRating rating={stars} />
    </div>
  );
};

export default QualityFilter;
