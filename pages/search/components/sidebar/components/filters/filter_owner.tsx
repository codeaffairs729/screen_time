import Loader from "components/UI/loader";
import {
  FilterOptionItem,
  SearchVMContext,
  useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterOwner = () => {
  const vm = useContext(SearchVMContext);
  const [filterOptionItems, setFilterOptionItems] = useState<
    FilterOptionItem[] | undefined
  >([]);

  useEffect(() => {
    const owners = vm.datasets
      ?.map((d) => d.owner.organisation)
      .filter((owner, i, a) => a.indexOf(owner) == i)
      .map((owner) => ({ value: owner, label: owner, checkbox: false }));
    setFilterOptionItems(owners);
  }, [vm.datasets]);

  const { register, fields } = useSearchFilter({
    name: "org",
    filterOptionItems,
  });

  return (
    <FilterSection label="Owner">
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading && fields.length === 0 && (
        <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
          No owners
        </div>
      )}
      {!vm.isLoading &&
        fields.map((field, i) => (
          <FilterCheckboxField
            key={field.id}
            register={register(`org.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterOwner;
