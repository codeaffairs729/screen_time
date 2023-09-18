import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";
import Loader from "components/UI/loader";
import { BsChevronDown } from "react-icons/bs";

const FilterDomain = () => {
    const vm = useContext(SearchVMContext);
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);
    const [itemShow, setItemShow] = useState(6);
    const [seeMore, setSeeMore] = useState(true);

    useEffect(() => {
        const domains = vm.filterOptions?.domains?.map((domain: any) => ({
            value: domain.value,
            label: domain.count,
            checkbox: false,
        })) ?? [];
        setFilterOptionItems(domains);
    }, [vm.filterOptions]);

    const { register, fields, control, setValue } = useSearchFilter({
        name: "domains",
        filterOptionItems,
    });

    return (
        <FilterSection
            dataSelector="domains-filter-section"
            label="Domains"
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
                            dataSelector="domains-filter"
                            key={field.id}
                            register={register(`domains.${i}.checkbox`)}
                            label={field.value}
                            value={field.value}
                            count={field.label}
                            defaultChecked={!!field.checkbox}
                            name={`domains.${i}.checkbox`}
                            control={control}
                            setValue={setValue}
                        />
                    ))}
            {fields.length > 6 && seeMore && (
                <div
                    className="flex items-center font-normal text-sm text-[#0065BD] mx-7 cursor-pointer mt-3"
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

export default FilterDomain;
