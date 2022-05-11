import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Filter, SearchVMContext } from "../search.vm";
import { startCase } from "lodash-es";

type Option = {
  value: string;
  label: string;
};

const SortbyField = () => {
  const { setActiveFilter, activeFilter } = useContext(SearchVMContext);
  const options: Option[] = [
    {
      label: "Most Relevant",
      value: "relevance",
    },
    {
      label: "High Quality",
      value: "quality",
    },
    {
      label: "Most Popular",
      value: "popularity",
    },
    {
      label: "Most Recently Updated",
      value: "updated",
    },
    {
      label: "Most Recently Downloaded",
      value: "downloaded",
    },
  ];
  const [activeOption, setActiveOption] = useState<Option>(options[0]);
  useEffect(() => {
    setActiveFilter((state: Filter) => ({
      ...state,
      sort_by: [activeOption.value],
    }));
  }, [activeOption]);

  return (
    <div className="mr-2 mb-2">
      <Menu id="sortby-dropdown" as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button className="flex justify-center items-center space-x-1 rounded w-full px-3 pr-1.5 py-0.5 text-xs font-semibold text-white bg-dtech-secondary-light">
              <span>{activeOption ? activeOption.label : "Sort by"}</span>
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
              <Menu.Items
                className="absolute z-10 right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-dtech-secondary-light"
              >
                {options.map((o) => (
                  <MenuItem
                    key={o.value}
                    onClick={() => setActiveOption(o)}
                    option={o}
                  />
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

const MenuItem = ({
  onClick,
  option,
}: {
  onClick: () => void;
  option: Option;
}) => {
  return (
    <Menu.Item as="div" onClick={onClick} className="cursor-pointer">
      <span className="ml-2 font-medium text-xs text-gray-700">
        {option.label}
      </span>
    </Menu.Item>
  );
};

export default SortbyField;
