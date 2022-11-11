import Loader from "components/UI/loader";
import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterUsageRights = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);

    useEffect(() => {
        const usageRights = vm.filterOptions?.usage_rights?.map((format) => ({
            value: format,
            label: format,
            checkbox: false,
        }));
        setFilterOptionItems(usageRights);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "usage_rights",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="usage_rights-filter-section"
            label="Usage Rights"
        >
            {vm.isLoading && (
                <div className="m-3 flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {!vm.isLoading && fields.length === 0 && (
                <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
                    No usage rights
                </div>
            )}
            {!vm.isLoading &&
                fields.map((field, i) => (
                    <FilterCheckboxField
                        dataSelector="usage_rights"
                        key={field.id}
                        register={register(`usage_rights.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterUsageRights;
