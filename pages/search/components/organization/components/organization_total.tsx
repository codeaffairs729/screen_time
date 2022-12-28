import { Menu, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import clsx from "clsx";
import { Fragment, useContext, useState } from "react";
import { OrganizationSearchVMContext } from "pages/search/organisation.vm";
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
            <div className="flex justify-center items-center space-x-1 h-[28px] border border-dtech-main-dark rounded  h-7 px-7 pr-1.5">
                <Dropdown
                    label={`${vm.pageSize} result`}
                    menuItems={options}
                    menuItemsClasses="!w-32 border border-dtech-main-dark"
                    labelClasses=" text-m font-normal pr-2.5 "
                    className="!ml-0 "
                    iconClass="text-dtech-main-dark !ml-2.5"
                />
            </div>
            <div className="text-sm mt-1 ml-1">
                <span className=" pl-2 font-medium ">Total:</span>
                <span className=" font-normal text-sm ">12 Organisations</span>
            </div>
        </div>
    );
};

export default OrganizationTotal;
