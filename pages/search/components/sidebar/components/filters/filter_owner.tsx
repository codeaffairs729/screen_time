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
    // const owners = vm.datasets
    //   ?.map((d) => d.owner.organisation)
    //   .filter((owner, i, a) => a.indexOf(owner) == i)
    //   .map((owner) => ({ value: owner, label: owner, checkbox: false }));
    // setFilterOptionItems(owners);
    const owners = vm.filterOptions?.data_owners?.map((owner) => ({
      value: owner,
      label: owner,
      checkbox: false,
    }));
    setFilterOptionItems(owners);
  }, [vm.datasets]);

  const { register, fields } = useSearchFilter({
    name: "data_owners",
    filterOptionItems,
  });

  return (
    <FilterSection
      dataSelector="data-owners-filter-section"
      label="Data Owners"
      disable={(vm.isLoading || !fields.length)}
    >
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading &&
        fields.map((field, i) => (
          <FilterCheckboxField
            dataSelector="data-owners"
            key={field.id}
            register={register(`data_owners.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterOwner;
