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

const FilterUsageRights = () => {
    const vm = useContext(SearchVMContext);
    const { isMobile, mobileFilter, setMobileFilter } = vm;
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);
    const [itemShow, setItemShow] = useState(6);
    const [seeMore, setSeeMore] = useState(true);

    useEffect(() => {
        const usageRights = vm.filterOptions?.usage_rights?.map(
            (format: any) => ({
                value: format.value,
                label: format.count,
                checkbox: false,
            })
        );
        setFilterOptionItems(usageRights);
    }, [vm.filterOptions]);

    const { register, fields, control, setValue   } = useSearchFilter({
        name: "usage_rights",
        filterOptionItems,
    });
    return (
        <FilterSection
            dataSelector="usage_rights-filter-section"
            label="Usage Rights"
            disable={vm.isLoading || !fields.length}
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
                            dataSelector="usage_rights"
                            key={field.id}
                            register={register(`usage_rights.${i}.checkbox`)}
                            label={field.value}
                            value={field.value}
                            count={field.label}
                            defaultChecked={!!field.checkbox}
                            name={`usage_rights.${i}.checkbox`}
                            control={control}
                            setValue={setValue}
                        />
                    ))}
            {fields.length > 6 && seeMore && (
                <div
                className="flex items-center font-normal text-sm text-[#0065BD] mx-7 cursor-pointer"
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

export default FilterUsageRights;
