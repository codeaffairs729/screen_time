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

const FilterFileType = () => {
    const vm = useContext(SearchVMContext);
    const { isMobile, mobileFilter, setMobileFilter } = vm;
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);
    const [itemShow, setItemShow] = useState(6);
    const [seeMore, setSeeMore] = useState(true);

    useEffect(() => {
        //   const fileFormats = vm.datasets
        //     ?.map((d) => d.urls.map((u) => u.format))
        //     .reduce((a, b) => [...a, ...b], [])
        //     .filter((f) => f)
        //     .filter((format, i, a) => a.indexOf(format) == i)
        //     .map((format) => ({ value: format, label: format, checkbox: false }));
        //   setFilterOptionItems(fileFormats);
        const fileFormats = vm.filterOptions?.file_formats?.map(
            (format: any) => ({
                value: format.value,
                label: format.count,
                checkbox: false,
            })
        );
        setFilterOptionItems(fileFormats);
    }, [vm.filterOptions]);

    const { register, fields } = useSearchFilter({
        name: "file_formats",
        filterOptionItems,
        ismobile: isMobile,
        mobileFilter: mobileFilter,
        setMobileFilter: setMobileFilter,
    });

    return (
        <FilterSection
            dataSelector="file-formats-filter-section"
            label="File Formats"
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

export default FilterFileType;
