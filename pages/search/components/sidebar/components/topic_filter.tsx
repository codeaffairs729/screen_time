import { SearchVMContext } from "pages/search/search.vm";
import { useContext } from "react";
import FilterCheckboxField from "./filter_checkbox_field";
import FilterSection from "./filter_section";
import Loader from "components/UI/loader";

const TopicFilter = () => {
  const vm = useContext(SearchVMContext);
  const topics =
    vm.datasets?.reduce((a, b) => {
      b.detail.topics.forEach((t) => a.add(t));
      return a;
    }, new Set<string>()) ?? new Set<string>();

  return (
    <FilterSection label="Topics">
      {Array.from(topics)?.map((t, i) => (
        <FilterCheckboxField key={i} label={t} />
      ))}
      {vm.isLoading && (
        <div className="h-20 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </FilterSection>
  );
};


export default TopicFilter;