import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Filter, SearchVMContext} from "pages/search/search.vm";
import { startCase } from "lodash-es";
import Dropdown from "components/UI/drop_down";
import { OrganizationSearchVMContext } from "pages/search/organization.vm";
type Option = {
    value: string;
    label: string;
};

const OrganizationSortBy = () => {
    const { setActiveFilter, activeFilter } = useContext(SearchVMContext);
    const options = [
        {
            label: "Most Relevant",
            onClick: () => {
                onChange("relevance");
            },
            value: "relevance",
        },
        {
            label: "High Quality",
            onClick: () => {
                onChange("quality");
            },
            value: "quality",
        },
        {
            label: "Most Popular",
            onClick: () => {
                onChange("popularity");
            },
            value: "popularity",
        },
        {
            label: "Most Recently Updated",
            onClick: () => {
                onChange("updated");
            },
            value: "updated",
        },
        {
            label: "Most Recently Downloaded",
            onClick: () => {
                onChange("downloaded");
            },
            value: "downloaded",
        },
    ];
    const [activeOption, setActiveOption] = useState(options[0]);
    const onChange = (value: string) =>
        setActiveFilter((state: Filter) => ({
            ...state,
            sort_by: [value],
        }));

    useEffect(() => {
        const currentOption = options.filter((option: Option) =>
            activeFilter?.sort_by?.includes(option.value)
        )[0];

        setActiveOption(currentOption);
    }, [activeFilter]);

    return (
        <div className="flex mr-2 ">
            <span className="text-sm font-medium mr-2 mt-2">Sort By: </span>
            {/* <Menu
                id="sortby-dropdown"
                as="div"
                className="relative inline-block text-left"
            >
                {({ open }) => (
                    <>
                        <Menu.Button className="flex justify-center items-center space-x-1 rounded w-32 h-7  px-3 pr-1.5 py-0.5 text-xs border border-dtech-main-dark rounded">
                            <span>
                                {activeOption ? activeOption.label : "Sort by"}
                            </span>
                            <IoMdArrowDropdown
                                className={clsx(
                                    "w-5 h-5 transition ease-in-out delay-150",
                                    {
                                        "rotate-180": open,
                                    }
                                )}
                            />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute z-10 right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-dtech-secondary-light">
                                {options.map((o) => (
                                    <MenuItem
                                        key={o.value}
                                        onClick={() => onChange(o.value)}
                                        option={o}
                                    />
                                ))}
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu> */}

            <div className="flex justify-center items-center  space-x-1 h-7 border border-dtech-main-dark rounded h-7 px-3 pr-1.5 mt-1">
            <Dropdown 
                label={`${activeOption ? activeOption.label : "Sort by"}`}
                menuItems={options}
                menuItemsClasses="!w-60 !left-[-70%] border border-dtech-main-dark"
                labelClasses=" text-m pr-3.5"
                className="!ml-0 "
                iconClass="text-dtech-main-dark !ml-2.5"
            />
            </div>

        </div>
    );
};

// const MenuItem = ({
//     onClick,
//     option,
// }: {
//     onClick: () => void;
//     option: Option;
// }) => {
//     return (
//         <Menu.Item as="div" onClick={onClick} className="cursor-pointer">
//             <span className="ml-2 font-medium text-xs text-gray-700">
//                 {option.label}
//             </span>
//         </Menu.Item>
//     );
// };

export default OrganizationSortBy;
