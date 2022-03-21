import Loader from "components/UI/loader";
import {
  FilterOptionItem,
  SearchVMContext,
  useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLocation = () => {
  const vm = useContext(SearchVMContext);
  const [filterOptionItems, setFilterOptionItems] = useState<
    FilterOptionItem[] | undefined
  >([]);

  useEffect(() => {
    const locations = vm.datasets
      ?.map((d) => d.detail.locations)
      .reduce((a, b) => [...a, ...b], [])
      .filter((location, i, a) => a.indexOf(location) == i)
      .map((location) => ({
        value: location,
        label: location,
        checkbox: false,
      }));
    setFilterOptionItems(locations);
  }, [vm.datasets]);
  const { register, fields } = useSearchFilter({
    name: "location",
    filterOptionItems,
  });

  return (
    <FilterSection label="Location">
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading && fields.length === 0 && (
        <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
          No locations
        </div>
      )}
      {!vm.isLoading &&
        fields.map((field, i) => (
          <FilterCheckboxField
            key={field.id}
            register={register(`location.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterLocation;
