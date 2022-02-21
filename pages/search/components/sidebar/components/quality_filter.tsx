import StarRating from "components/UI/star_rating";
import Image from "next/image";
import FilterCheckboxField from "./filter_checkbox_field";
import FilterSection from "./filter_section";

const QualityFilter = () => {
  return (
    <FilterSection label="Quality">
      {[...Array(5)].map((_, i) => (
        <StarRow key={i} stars={i + 1} />
      ))}
    </FilterSection>
  );
};

const StarRow = ({ stars }: { stars: number }) => {
  console.log("stars", stars);

  return (
    <div className="flex items-center justify-start">
      <FilterCheckboxField className="mr-1" />
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
