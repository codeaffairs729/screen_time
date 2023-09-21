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
        const fileFormats = vm.filterOptions?.file_formats?.sort((a:any, b:any) => a.value.localeCompare(b.value)).map(
            (format: any) => ({
                value: format.value,
                label: format.count,
                checkbox: false,
            })
        ) ?? [];
        setFilterOptionItems(fileFormats);
    }, [vm.filterOptions]);

    const { register, fields, control, setValue  } = useSearchFilter({
        name: "file_formats",
        filterOptionItems,
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
                            dataSelector="file-formats"
                            key={field.id}
                            register={register(`file_formats.${i}.checkbox`)}
                            label={field.value}
                            value={field.value}
                            count={field.label}
                            defaultChecked={!!field.checkbox}
                            name={`file_formats.${i}.checkbox`}
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

export default FilterFileType;
