import Loader from "components/UI/loader";
import {
    FilterOptionItem,
    SearchVMContext,
    useSearchFilter,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterDataHost = () => {
    const vm = useContext(SearchVMContext);
    const {isMobile,mobileFilter,setMobileFilter } = vm;
    const [filterOptionItems, setFilterOptionItems] = useState<
        FilterOptionItem[] | undefined
    >([]);
    const [itemShow, setItemShow] = useState(6);
    const [seeMore, setSeeMore] = useState(true);

    useEffect(() => {
        const dataHost = vm.filterOptions?.data_host?.map((format:any) => ({
            value: format.value,
            label: format.count,
            checkbox: false,
        }));
        setFilterOptionItems(dataHost);
    }, [vm.filterOptions]);
    
    const { register, fields } = useSearchFilter({
        name: "data_host",
        filterOptionItems,
        ismobile: isMobile,
        mobileFilter: mobileFilter,
        setMobileFilter:setMobileFilter
    });

    return (
        <FilterSection
            dataSelector="data-hosts-filter-section"
            label="Data Hosts"
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
                <button
                className="text-xs text-dtech-main-dark mx-2"
                    onClick={() => {
                        setItemShow(fields.length), setSeeMore(!seeMore);
                    }}
                >
                    see more...
                </button>
            )}
        </FilterSection>
    );
};

export default FilterDataHost;
