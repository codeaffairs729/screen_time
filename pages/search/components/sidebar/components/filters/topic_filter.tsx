import { SearchVMContext } from "pages/search/search.vm";
import { useContext } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";
import Loader from "components/UI/loader";
import { useForm } from "react-hook-form";
import { useWatchFilter } from "common/hooks";

const TopicFilter = () => {
  const vm = useContext(SearchVMContext);
  const topics =
    vm.datasets?.reduce((a, b) => {
      b.detail.topics.forEach((t) => a.add(t));
      return a;
    }, new Set<string>()) ?? new Set<string>();

  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "topic",
  });

  return (
    <FilterSection label="Topics">
      {Array.from(topics)?.map((t, i) => (
        <FilterCheckboxField
          register={register(`topic`)}
          key={i}
          label={t}
          value={t}
        />
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
