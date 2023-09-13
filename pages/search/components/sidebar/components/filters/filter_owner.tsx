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
  const [itemShow, setItemShow] = useState(6);
  const [seeMore, setSeeMore] = useState(true);

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
                fields
                    .slice(0, itemShow)
                    .map((field, i) => (
                        <FilterCheckboxField
                            dataSelector="domains-filter"
                            key={field.id}
                            register={register(`domains.${i}.checkbox`)}
                            label={field.value}
                            value={field.value}
                            count={field.label}
                            defaultChecked={!!field.checkbox}
                        />
                    ))}
            {fields.length > 6 && seeMore && (
                <button
                className="text-xs text-dtech-main-dark mx-2"
                    onClick={() => {
                        setItemShow(fields.length), setSeeMore(!seeMore);
                    }}
                >
                    see more...
                </button>
            )}
    </FilterSection>
  );
};

export default FilterOwner;
