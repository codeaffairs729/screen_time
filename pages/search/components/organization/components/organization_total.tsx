import { Menu, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import clsx from "clsx";
import { Fragment, useContext, useState } from "react";
import { OrganizationSearchVMContext } from "pages/search/organization.vm";
import { VscTriangleDown } from "react-icons/vsc";
import Dropdown from "components/UI/drop_down";

const OrganizationTotal = () => {
    const vm = useContext(OrganizationSearchVMContext);
    const options = [
        {
            label: "1",
            onClick: () => {
                vm.setPageSize(1);
            },
        },
        {
            label: "2",
            onClick: () => {
                vm.setPageSize(2);
            },
        },
        {
            label: "4",
            onClick: () => {
                vm.setPageSize(4);
            },
        },
        {
            label: "8",
            onClick: () => {
                vm.setPageSize(8);
            },
        },
    ];
    return (
        <div className="flex">
            <span className="ml-2 mt-1 pr-2 font-medium text-sm">Display</span>
            {/* <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                    <>
                        <Menu.Button className="flex justify-center items-center space-x-1 rounded w-32 h-7 px-3 pr-1.5 py-0.5 text-xs border border-dtech-main-dark rounded">
                            <span className="text-sm font-normal">
                                {vm.pageSize} results
                            </span>
                            <div className="">
                                <VscTriangleDown
                                    className={`ml-2 text-2xl text-inherit text-dtech-main-dark ${
                                        open && "rotate-180"
                                    }`}
                                />
                            </div>
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
                            <Menu.Items className="absolute z-10 right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-dtech-secondary-light">
                                {options.map((o, i) => (
                                    <Menu.Item
                                        as="div"
                                        className="cursor-pointer"
                                    >
                                        <MenuItem
                                            key={o.value}
                                            onClick={() => vm.setPageSize(o)}
                                            option={o}
                                        />
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu> */}
            <div className="flex justify-center items-center space-x-1 h-[28px] border border-dtech-main-dark rounded  h-7 px-7 pr-1.5">
                <Dropdown
                    label={`${vm.pageSize} result`}
                    menuItems={options}
                    menuItemsClasses="!w-32 !left-[-40%] border border-dtech-main-dark"
                    labelClasses=" text-m font-normal pr-2.5 "
                    className="!ml-0 "
                    iconClass="text-dtech-main-dark !ml-2.5"
                />
            </div>
            <div className="text-sm mt-1 ml-1">
                <span className=" pl-2 font-medium ">
                    Total:
                </span>
                <span className=" font-normal text-sm ">
                    12 Organisations
                </span>
            </div>
        </div>
    );
};
// const MenuItem = ({
//     onClick,
//     option,
// }: {
//     onClick: () => void;
//     option: any;
// }) => {
//     return (
//         <Menu.Item
//             as="div"
//             onClick={onClick}
//             className="cursor-pointer hover:bg-dtech-main-light"
//         >
//             <span className="ml-2 font-medium text-xs text-gray-700">
//                 {option}
//             </span>
//         </Menu.Item>
//     );
// };
export default OrganizationTotal;
