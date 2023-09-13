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
  const {isMobile, mobileFilter,setMobileFilter  } = vm;
  const [filterOptionItems, setFilterOptionItems] = useState<
    FilterOptionItem[] | undefined
  >([]);

  useEffect(() => {
    // const owners = vm.datasets
    //   ?.map((d) => d.owner.organisation)
    //   .filter((owner, i, a) => a.indexOf(owner) == i)
    //   .map((owner) => ({ value: owner, label: owner, checkbox: false }));
    // setFilterOptionItems(owners);
    const owners = vm.filterOptions?.data_owner?.map((owner:any) => ({
      value: owner.value,
      label: owner.count,
      checkbox: false,
    }));
    setFilterOptionItems(owners);
  }, [vm.datasets]);

  const { register, fields } = useSearchFilter({
    name: "data_owner",
    filterOptionItems,
    ismobile: isMobile,
    mobileFilter: mobileFilter,
    setMobileFilter:setMobileFilter
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
            dataSelector="data-owner"
            key={field.id}
            register={register(`data_owner.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            count={field.label}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterOwner;
