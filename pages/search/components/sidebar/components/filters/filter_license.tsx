import Loader from "components/UI/loader";
import {
  FilterOptionItem,
  SearchVMContext,
  useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterLicense = () => {
  const vm = useContext(SearchVMContext);
  const [filterOptionItems, setFilterOptionItems] = useState<
    FilterOptionItem[] | undefined
  >([]);

  useEffect(() => {
    const licenses = vm.datasets
      ?.map((d) => d.detail.license.type)
      .filter((license, i, a) => a.indexOf(license) == i)
      .map((license) => ({ value: license, label: license, checkbox: false }));
    setFilterOptionItems(licenses);
  }, [vm.datasets]);
  const { register, fields } = useSearchFilter({
    name: "license",
    filterOptionItems,
  });

  return (
    <FilterSection label="License">
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading && fields.length === 0 && (
        <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
          No licenses
        </div>
      )}
      {!vm.isLoading &&
        fields.map((field, i) => (
          <FilterCheckboxField
            key={field.id}
            register={register(`license.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterLicense;
