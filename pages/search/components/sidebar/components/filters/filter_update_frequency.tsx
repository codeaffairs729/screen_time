import Loader from "components/UI/loader";
import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterUpdateFrequency = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);

    useEffect(() => {
        const updateFrequency = vm.filterOptions?.update_frequency?.map((format:any) => ({
            value: format.value,
            label: format.count,
            checkbox: false,
        }));
        setFilterOptionItems(updateFrequency);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "update_frequency",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="update-frequency-filter-section"
            label="Update Frequency"
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
                        dataSelector="update_frequency"
                        key={field.id}
                        register={register(`update_frequency.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterUpdateFrequency;
