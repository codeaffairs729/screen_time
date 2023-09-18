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

const FilterKeywords = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);
    const [itemShow, setItemShow] = useState(6);
    const [seeMore, setSeeMore] = useState(true);

    useEffect(() => {
        const keywords = vm.filterOptions?.keywords?.map((format:any) => ({
            value: format.value,
            label: format.count,
            checkbox: false,
        })) ?? [];
        setFilterOptionItems(keywords);
    }, [vm.filterOptions]);

    const { register, fields, control, setValue   } = useSearchFilter({
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
                fields
                    .slice(0, itemShow)
                    .map((field, i) => (
                        <FilterCheckboxField
                            dataSelector="keywords"
                            key={field.id}
                            register={register(`keywords.${i}.checkbox`)}
                            label={field.value}
                            value={field.value}
                            count={field.label}
                            defaultChecked={!!field.checkbox}
                            name={`keywords.${i}.checkbox`}
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

export default FilterKeywords;
