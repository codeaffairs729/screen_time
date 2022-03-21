import {
  FilterOptionItem,
  SearchVMContext,
  useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";
import Loader from "components/UI/loader";

const FilterDomain = () => {
  const vm = useContext(SearchVMContext);
  const [filterOptionItems, setFilterOptionItems] = useState<
    FilterOptionItem[] | undefined
  >([]);

  useEffect(() => {
    const domains = vm.datasets
      ?.map((d) => d.detail.domain)
      .filter((domain, i, a) => a.indexOf(domain) == i)
      .map((domain) => ({ value: domain, label: domain, checkbox: false }));
    setFilterOptionItems(domains);
  }, [vm.datasets]);

  const { register, fields } = useSearchFilter({
    name: "domain",
    filterOptionItems,
  });

  return (
    <FilterSection label="Domain">
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading && fields.length === 0 && (
        <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
          No domains
        </div>
      )}
      {!vm.isLoading &&
        fields.map((field, i) => (
          <FilterCheckboxField
            key={field.id}
            register={register(`domain.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterDomain;
