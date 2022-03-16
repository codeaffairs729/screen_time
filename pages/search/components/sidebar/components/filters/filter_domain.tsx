import { useWatchFilter } from "common/hooks";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";
import { uniq } from "lodash-es";
import Loader from "components/UI/loader";

const FilterDomain = () => {
  const vm = useContext(SearchVMContext);
  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "domain",
  });

  const [domains, setDomains] = useState<string[]>([]);

  useEffect(() => {
    if (vm.datasets?.length) {
      const datasetDomains = vm.datasets
        .filter((d) => d.detail.domain)
        .map((d) => d.detail.domain);
      setDomains(uniq(datasetDomains));
    }
  }, [vm.datasets]);

  return (
    <FilterSection label="Domain">
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading && domains.length === 0 && (
        <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
          No domains
        </div>
      )}
      {!vm.isLoading &&
        domains.map((d, i) => (
          <FilterCheckboxField
            key={i}
            register={register("domain")}
            label={d}
            value={d}
          />
        ))}
      {/* <FilterCheckboxField
        register={register("domain")}
        label="Entertainment"
        value="entertainment"
      />
      <FilterCheckboxField
        register={register("domain")}
        label="Health"
        value="health"
      /> */}
    </FilterSection>
  );
};

export default FilterDomain;
