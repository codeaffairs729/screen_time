import Loader from "components/UI/loader";
import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterDataHost = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);

    useEffect(() => {
        const dataHost = vm.filterOptions?.data_host?.map((format) => ({
            value: format,
            label: format,
            checkbox: false,
        }));
        setFilterOptionItems(dataHost);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "data_host",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="data-host-filter-section"
            label="Data Host"
        >
            {vm.isLoading && (
                <div className="m-3 flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {!vm.isLoading && fields.length === 0 && (
                <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
                    No data host
                </div>
            )}
            {!vm.isLoading &&
                fields.map((field, i) => (
                    <FilterCheckboxField
                        dataSelector="data_host"
                        key={field.id}
                        register={register(`data_host.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterDataHost;
