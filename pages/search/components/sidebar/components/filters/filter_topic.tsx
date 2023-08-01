import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";
import Loader from "components/UI/loader";

const FilterTopic = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);

    useEffect(() => {
        // const topics = vm.datasets?.reduce((a, b) => {
        //   b.detail.topics.forEach((t) => a.add(t));
        //   return a;
        // }, new Set<string>());
        // setFilterOptionItems(
        //   topics
        //     ? Array.from(topics).map((t) => ({
        //         checkbox: false,
        //         value: t,
        //         label: t,
        //       }))
        //     : undefined
        // );
        const topics = vm.filterOptions?.topics?.map((t:any) => ({
            checkbox: false,
            value: t.value,
            label: t.count,
        }));
        setFilterOptionItems(topics);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "topics",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="topics-filter-section"
            label="Topics"
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
                        dataSelector="topics-filter"
                        key={field.id}
                        register={register(`topics.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterTopic;
