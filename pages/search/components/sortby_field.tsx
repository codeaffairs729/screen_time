import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useWatchFilter } from "common/hooks";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { SearchVMContext } from "../search.vm";

const SortbyField = () => {
  // const { register, watch } = useForm();
  // const fieldwatch = watch();
  // console.log("fieldwatch", fieldwatch);
  const vm = useContext(SearchVMContext);
  const { register } = useWatchFilter({
    setActiveFilter: vm.setActiveFilter,
    name: "sort_by",
  });

  return (
    <div className="w-56 ml-auto mr-2 mb-2">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button className="flex justify-center items-center space-x-1 rounded w-full px-3 pr-1.5 py-0.5 text-xs font-semibold text-white bg-dtech-secondary-light">
              <span>Sort by</span>
              <IoMdArrowDropdown
                className={clsx("w-5 h-5 transition ease-in-out delay-150", {
                  "rotate-180": open,
                })}
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
                <div className="px-1 py-1 flex flex-col space-y-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Checkbox
                        label="High Quality"
                        register={register("sort_by")}
                        value="high_quality"
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Checkbox
                        label="Most Popular"
                        register={register("sort_by")}
                        value="most_popular"
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Checkbox
                        label="Most recently updated"
                        register={register("sort_by")}
                        value="most_recently_updated"
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Checkbox
                        label="Most recently downloaded"
                        register={register("sort_by")}
                        value="most_recently_downloaded"
                      />
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

const Checkbox = ({
  label,
  register,
  value,
}: {
  label: string;
  register?: UseFormRegisterReturn;
  value: string;
}) => {
  return (
    <div className="flex items-center">
      <input
        {...register}
        type="checkbox"
        className="text-dtech-primary-light focus:ring-0 rounded-sm border-dtech-primary-light"
        value={value}
      />
      <span className="ml-2 font-medium text-xs text-gray-700">{label}</span>
    </div>
  );
};

export default SortbyField;
