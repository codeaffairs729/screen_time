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
        // const domains = vm.datasets
        //   ?.map((d) => d.detail.domain)
        //   .filter((domain, i, a) => a.indexOf(domain) == i)
        //   .map((domain) => ({ value: domain, label: domain, checkbox: false }));
        // setFilterOptionItems(domains);
        const domains = vm.filterOptions?.domains?.map((domain:any) => ({
            value: domain.value,
            label: domain.count,
            checkbox: false,
        }));
        setFilterOptionItems(domains);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "domains",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="domains-filter-section"
            label="Domains"
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
                        dataSelector="domains-filter"
                        key={field.id}
                        register={register(`domains.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterDomain;
