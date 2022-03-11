import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FieldProps } from "common/type";
import { Fragment, useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { useController } from "react-hook-form";

export type Option = {
  value: any;
  label: string;
};

const DropdownField = ({
  options,
  className = "",
  placeholder,
  formControl,
}: {
  className?: string;
  options: Option[];
} & FieldProps) => {
  const [selected, setSelected] = useState<Option>();
  const [query, setQuery] = useState("");

  const {
    fieldState: { error },
    field: { onChange, name },
  } = useController({
    ...formControl,
    defaultValue:
      formControl["defaultValue"] == undefined
        ? ""
        : formControl["defaultValue"],
  });

  const filteredOtions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={clsx(className)}>
      <Combobox
        value={selected}
        onChange={(o) => {
          onChange(o?.value);
          setSelected(o);
        }}
      >
        <div className="relative">
          <div className="relative w-full text-left bg-white rounded-lg cursor-default">
            <Combobox.Input
              className="w-full rounded-lg focus:ring-dtech-secondary-light border-2 border-dtech-secondary-light focus:border-dtech-secondary-light disabled:border-gray-300 disabled:bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder:text-gray-500 placeholder:text-sm placeholder:font-bold"
              displayValue={(option: Option) => option.label}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              name={name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineSelector className="w-5 h-5" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOtions.length === 0 && query !== "" ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                options.map((option, i) => (
                  <ComboOption key={i} option={option} />
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {error && Object.keys(error).length > 0 && (
        <div className="text-xs font-light text-red-800 ml-1 mt-1">
          {error["message"]}
        </div>
      )}
    </div>
  );
};

const ComboOption = ({ option }: { option: Option }) => {
  return (
    <Combobox.Option
      className={({ active }) =>
        `cursor-default select-none relative py-2 pl-10 pr-4 ${
          active ? "text-white bg-dtech-secondary-light" : "text-gray-900"
        }`
      }
      value={option}
    >
      {({ selected, active }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {option.label}
          </span>
          {selected ? (
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                active ? "text-white" : "text-dtech-secondary-light"
              }`}
            >
              {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
              <BsCheck />
            </span>
          ) : null}
        </>
      )}
    </Combobox.Option>
  );
};

export default DropdownField;