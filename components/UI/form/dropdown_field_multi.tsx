import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FieldProps } from "common/type";
import { Fragment, useState } from "react";
import { HiOutlineChevronDown, HiOutlineSelector } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { useController } from "react-hook-form";

export type Option = {
    value: any;
    label: string;
};

const DropdownFieldMulti = ({
    options,
    className = "",
    inputfieldClassName = "",
    placeholder,
    formControl,
    dataSelector,
    newDropdownIcon = false,
}: {
    className?: string;
    inputfieldClassName?: string;
    newDropdownIcon?: boolean;
    options: Option[];
} & FieldProps) => {
    const [selected, setSelected] = useState<Option[]>([]);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const {
        fieldState: { error },
        field: { onChange, name , value},
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
    const hasError = error && Object.keys(error).length > 0;

    return (
        <div
            data-selector={dataSelector}
            className={clsx("w-full relative", className)}
        >
            <Combobox
                value={selected}
                onChange={(o: any) => {
                    const seen:any = {};
                    const duplicates:any = [];

                    o.forEach((obj:any, index:any) => {
                        if (seen[obj.value]) {
                            seen[obj.value].push(index);
                        } else {
                            seen[obj.value] = [index];
                        }
                    });

                    Object.values(seen).forEach((indices:any) => {
                        if (indices.length > 1) {
                            duplicates.push(...indices);
                        }
                    });

                    duplicates
                        .sort()
                        .reverse()
                        .forEach((index:any) => {
                            o.splice(index, 1);
                        });

                    let values = o.map((option: Option) => {
                        return option.value;
                    });
                    onChange(values);
                    setSelected(o);
                }}
                nullable
                multiple
            >
                <div className="relative w-full text-left bg-white rounded-lg cursor-default">
                    <Combobox.Button className=" w-full ">
                        <Combobox.Input
                            className={clsx(
                                "w-full rounded-lg focus:ring-dtech-secondary-light border-2 border-dtech-main-dark focus:border-dtech-main-dark disabled:border-gray-300 disabled:bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder:text-gray-500 placeholder:text-sm placeholder:font-bold",
                                { "border-red-700": hasError },
                                inputfieldClassName
                            )}
                            displayValue={(selOpts: Option[]) => {
                                let dispString = "";
                                selOpts.forEach((option: Option, idx) => {
                                    if (idx === 0) {
                                        dispString = `${option.label}`;
                                    } else {
                                        dispString = `${option.label}, ${dispString}`;
                                    }
                                });
                                return dispString;
                            }}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder}
                            name={name}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            {
                                newDropdownIcon
                                    ? <HiOutlineChevronDown className="w-5 h-5" />
                                    : <HiOutlineSelector className="w-5 h-5" />
                            }
                        </Combobox.Button>
                    </Combobox.Button>
                </div>
                <Transition
                    // show={isOpen}

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
                                <ComboOption key={i} option={option} selected={selected}/>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
            {hasError && (
                <div className="text-xs text-red-800 ml-1 mt-1">
                    {error["message"]}
                </div>
            )}
        </div>
    );
};

const ComboOption = ({ option, selected }: { option: Option, selected:any}) => {
    return (
        <Combobox.Option
            className={({ active }) =>
                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                    active
                        ? "text-white bg-dtech-main-dark"
                        : "text-gray-900"
                }`
            }
            value={option}
        >
            {({  active }) => (
                <>
                    <span
                        className={`block truncate ${
                            selected.includes(option.value) ? "font-medium" : "font-normal"
                        }`}
                    >
                        {option.label}
                    </span>
                    {selected.some((obj:any) => JSON.stringify(obj) === JSON.stringify(option)) ? (
                        <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                    ? "text-white"
                                    : "text-dtech-secondary-light"
                            }`}
                        >
                            <BsCheck />
                        </span>
                    ) : null}
                </>
            )}
        </Combobox.Option>
    );
};

export default DropdownFieldMulti;
