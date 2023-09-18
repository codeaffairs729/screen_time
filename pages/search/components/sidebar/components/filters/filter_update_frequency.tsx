import Loader from "components/UI/loader";
import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";
import { BsChevronDown } from "react-icons/bs";

const FilterUpdateFrequency = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);
    const [itemShow, setItemShow] = useState(6);
    const [seeMore, setSeeMore] = useState(true);

    useEffect(() => {
        const updateFrequency = vm.filterOptions?.update_frequency?.map((format:any) => ({
            value: format.value,
            label: format.count,
            checkbox: false,
        })) ?? [];
        setFilterOptionItems(updateFrequency);
    }, [vm.filterOptions]);

    const { register, fields, control, setValue   } = useSearchFilter({
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
                fields
                    .slice(0, itemShow)
                    .map((field, i) => (
                        <FilterCheckboxField
                            dataSelector="update_frequency"
                            key={field.id}
                            register={register(`update_frequency.${i}.checkbox`)}
                            label={field.value}
                            value={field.value}
                            count={field.label}
                            defaultChecked={!!field.checkbox}
                            name={`update_frequency.${i}.checkbox`}
                            control={control}
                            setValue={setValue}
                        />
                    ))}
            {fields.length > 6 && seeMore && (
                <div
                className="flex items-center font-normal text-sm text-[#0065BD] mx-7 cursor-pointer  mt-3"
                onClick={() => {
                    setItemShow(fields.length), setSeeMore(!seeMore);
                }}
            >
                <div>See more</div>
                <BsChevronDown
                    className={`
                font-normal h-4 w-6 `}
                    strokeWidth="1.5"
                />
            </div>
            )}
        </FilterSection>
    );
};

export default FilterUpdateFrequency;
