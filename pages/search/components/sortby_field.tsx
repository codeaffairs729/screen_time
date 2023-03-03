import { useContext, useEffect, useState } from "react";
import { Filter, SearchVMContext } from "pages/search/search.vm";
import Dropdown from "components/UI/drop_down";

type Option = {
    value: string;
    label: string;
};

const OPTIONS = [
    {
        label: "Relevance",
        value: "relevance",
    },
    {
        label: "Metadata Quality",
        value: "metadata_quality",
    },
    {
        label: "Last Updated",
        value: "last_updated_timestamp",
    },
    // {
    //     label: "Last Downloaded",
    //     value: "downloaded",
    // },
];

const RecordsSortBy = () => {
    const { setActiveFilter, activeFilter, setCurrentPageNo } =
        useContext(SearchVMContext);
    const onChange = (value: string) => {
        setCurrentPageNo(1);
        setActiveFilter((state: Filter) => ({
            ...state,
            sort_by: [value],
        }));
    };
    const options = OPTIONS.map((option) => ({
        ...option,
        onClick: () => onChange(option.value),
    }));
    const [activeOption, setActiveOption] = useState(options[0]);

    useEffect(() => {
        const currentOption = options.filter((option: Option) =>
            activeFilter?.sort_by?.includes(option.value)
        )[0];

        setActiveOption(currentOption);
    }, [activeFilter]);

    return (
        <div className="flex mr-2 ">
            <span className="text-sm font-medium mr-2 mt-2">Sort By: </span>

            <div className="flex justify-center items-center  space-x-1 h-7 border border-dtech-main-dark rounded px-3 pr-1.5 mt-1">
                <Dropdown
                    label={`${activeOption ? activeOption.label : "Sort by"}`}
                    menuItems={options}
                    menuItemsClasses="!w-60 rounded-[10px]"
                    labelClasses=" text-m pr-3.5"
                    className="!ml-0 "
                    iconClass="text-dtech-main-dark !ml-2.5"
                    itemsClasses="rounded-[10px] shadow-none "
                />
            </div>
        </div>
    );
};

export default RecordsSortBy;
