import Loader from "components/UI/loader";
import {
  FilterOptionItem,
  SearchVMContext,
  useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterFileType = () => {
  const vm = useContext(SearchVMContext);
  const [filterOptionItems, setFilterOptionItems] = useState<
    FilterOptionItem[] | undefined
  >([]);

  useEffect(() => {
    const fileFormats = vm.datasets
      ?.map((d) => d.urls.map((u) => u.format))
      .reduce((a, b) => [...a, ...b], [])
      .filter((f) => f)
      .filter((format, i, a) => a.indexOf(format) == i)
      .map((format) => ({ value: format, label: format, checkbox: false }));
    setFilterOptionItems(fileFormats);
  }, [vm.datasets]);

  const { register, fields } = useSearchFilter({
    name: "file_type",
    filterOptionItems,
  });

  return (
    <FilterSection label="File type">
      {vm.isLoading && (
        <div className="m-3 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!vm.isLoading && fields.length === 0 && (
        <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
          No file types
        </div>
      )}
      {!vm.isLoading &&
        fields.map((field, i) => (
          <FilterCheckboxField
            key={field.id}
            register={register(`file_type.${i}.checkbox`)}
            label={field.value}
            value={field.value}
            defaultChecked={!!field.checkbox}
          />
        ))}
    </FilterSection>
  );
};

export default FilterFileType;
