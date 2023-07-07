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
        const dataHost = vm.filterOptions?.data_hosts?.map((format:any) => ({
            value: format.value,
            label: format.value,
            checkbox: false,
        }));
        setFilterOptionItems(dataHost);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "data_hosts",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="data-hosts-filter-section"
            label="Data Hosts"
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
                        dataSelector="data_hosts"
                        key={field.id}
                        register={register(`data_hosts.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterDataHost;
