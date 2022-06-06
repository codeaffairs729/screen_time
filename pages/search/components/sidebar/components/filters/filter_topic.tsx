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
        const topics = vm.filterOptions?.topic?.map((t) => ({
            checkbox: false,
            value: t,
            label: t,
        }));
        setFilterOptionItems(topics);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "topic",
        filterOptionItems,
    });

    return (
        <FilterSection label="Topics">
            {vm.isLoading && (
                <div className="m-3 flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {!vm.isLoading && fields.length === 0 && (
                <div className="m-3 text-xs text-gray-500 flex items-center justify-center">
                    No topics
                </div>
            )}
            {!vm.isLoading &&
                fields.map((field, i) => (
                    <FilterCheckboxField
                        key={field.id}
                        register={register(`topic.${i}.checkbox`)}
                        label={field.value}
                        value={field.value}
                        defaultChecked={!!field.checkbox}
                    />
                ))}
        </FilterSection>
    );
};

export default FilterTopic;
