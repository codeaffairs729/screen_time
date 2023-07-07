import Loader from "components/UI/loader";
import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterKeywords = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);

    useEffect(() => {
        const keywords = vm.filterOptions?.keywords?.map((format:any) => ({
            value: format.value,
            label: format.value,
            checkbox: false,
        }));
        setFilterOptionItems(keywords);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "keywords",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="keywords-filter-section"
            label="Keywords"
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
                        dataSelector="keywords"
                        key={field.id}
                        register={register(`keywords.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterKeywords;
