import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FieldProps } from "common/type";
import { Fragment, useEffect, useState, useRef } from "react";
import {
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineSelector,
} from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { useController } from "react-hook-form";
import ReactTooltip from "react-tooltip";
import { useRouter } from "next/router";
export type Option = {
    value: any;
    label: string;
};
const TOOLTIP_VALUE = [
    {
        id: "Open",
        value: "Available to use, free of charge, without a user account.",
    },
    {
        id: "Semi-open",
        value: "Available to use, free of charge, via a free user account.",
    },
    {
        id: "Restricted",
        value: " Access to the data involves an application process,possibly for reasons of security or sensitivity of the subject matter (application fees may apply).",
    },
    {
        id: "Closed",
        value: "Available on a commercial basis only (whether the commercial model is a one-time fee or a subscription).",
    },
    {
        id: "Static",
        value: "Data observations recorded, stored and made available as data files. These data files are typically not updated in real-time. E.g. Survey results.csv, Car sale trends.xlsx.",
    },
    {
        id: "Mixed",
        value: " A combination of Static and Streaming data.",
    },
    {
        id: "Streaming",
        value: "Data observations that are continuously generated in real-time or near real-time and not necessarily recored and stored in databases or files. These are typically made available via APIs. E.g. Telemetry data, Feeds from social networks, In-game player activity, Stock market prices.",
    },
    {
        id: "Once",
        value: "A one-off static dataset, no updates expected.",
    },
    {
        id: "Ad hoc",
        value: "Dataset updated as and when required, no fixed schedule.",
    },
    {
        id: "Within",
        value: "Dataset updated multiple times a day.",
    },
    {
        id: "Daily",
        value: "Dataset updated once a day.",
    },
    {
        id: "Weekly",
        value: "Dataset updated once a week.",
    },
    {
        id: "Monthly",
        value: "Dataset updated once a month.",
    },
    {
        id: "Quarterly",
        value: "Dataset updated once every 3 months.",
    },
    {
        id: "Semi-annual",
        value: "Dataset updated once every 6 months.",
    },
    {
        id: "Annually",
        value: "Dataset updated once every 12 months.",
    },
];
const DropdownField = ({
    newDropdown,
    options,
    className = "",
    placeholder,
    formControl,
    dataSelector,
    inputClass = "",
    errorPosition = false,
    newDropdownIcon = false,
    optionClass = "",
    signupDropdown,
    newOptionclass,
    dropDownCss = "",
}: {
    newDropdown?: boolean;
    className?: string;
    options: Option[];
    inputClass?: string;
    errorPosition?: boolean;
    newDropdownIcon?: boolean;
    optionClass?: string;
    signupDropdown?: boolean;
    newOptionclass?: boolean;
    dropDownCss?: string;
} & FieldProps) => {
    // const [selected, setSelected] = useState<Option>();
    const [selected, setSelected] = useState<Option>();
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const {
        fieldState: { error },
        field: { onChange, name, value },
    } = useController({
        ...formControl,
        defaultValue:
            formControl["defaultValue"] == undefined
                ? ""
                : formControl["defaultValue"],
    });

    const router = useRouter();
    const path = router.asPath;

    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setSelected(selected);
                    setIsOpen(false);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }
    useEffect(() => {
        const newValue = value || formControl["defaultValue"];
        if (![undefined, null].includes(newValue)) {
            const option = options.find((o) => o.value == newValue);
            if (option) {
                setSelected(option);
                onChange(option?.value);
            }
        } else {
            setSelected(undefined);
            onChange(null);
        }
    }, [value, formControl["defaultValue"]]);
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
            ref={myRef}
        >
            {errorPosition && hasError && (
                <div className="text-xs text-red-800 ml-1 mt-1 mb-2">
                    {error["message"]}
                </div>
            )}
            <Combobox
                value={selected}
                onChange={(o) => {
                    onChange(o?.value);
                    setSelected(o as any);
                }}
                nullable
            >
                <div className="relative w-full text-left cursor-default ">
                    <Combobox.Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full"
                    >
                        {isOpen && newOptionclass ? (
                            <Combobox.Input
                                className={clsx(
                                    `w-full sm:ml-0 ${
                                        path === "/signup"
                                            ? "rounded-t-[23px]"
                                            : "rounded-t-[30px]"
                                    } max-h-[99%] border-[3px] border-dtech-light-teal border-b-0 text-gray-900 h-full focus:!ring-0 focus:!outline-none focus:!border-dtech-light-teal`,
                                    inputClass,
                                    newDropdown &&
                                        isOpen &&
                                        "focus:ring-yellow-400 "
                                )}
                                displayValue={(option: Option) => option?.label}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder={placeholder}
                                name={name}
                            />
                        ) : (
                            <Combobox.Input
                                className={clsx(
                                    "w-full rounded-[30px] focus:!ring-[#6DCDCB] border-2 border-dtech-main-dark focus:border-dtech-main-dark disabled:border-gray-300 disabled:bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder:text-gray-500 placeholder:text-sm placeholder:font-bold ",
                                    inputClass,
                                    newDropdown &&
                                        isOpen &&
                                        "focus:ring-yellow-400 "
                                )}
                                displayValue={(option: Option) => option?.label}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder={placeholder}
                                name={name}
                            />
                        )}
                    </Combobox.Button>
                    <Combobox.Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute inset-y-0 right-0 flex items-center pr-2 mt-[1x]"
                    >
                        {newDropdown ? (
                            <img
                                className={
                                    isOpen
                                        ? " rounded-md text-[#0065BD] relative left-2 p-[14px]"
                                        : "rounded-md text-black relative left-2 p-[13px]"
                                }
                                src={
                                    isOpen
                                        ? "images/icons/arrows/fe_arrow-up.svg"
                                        : "images/icons/arrows/black_down_arrow.svg"
                                }
                            />
                        ) : newDropdownIcon ? (
                            <HiOutlineChevronUp className="w-5 h-5" />
                        ) : (
                            <HiOutlineChevronDown
                                className={`w-5 h-5 transition-all ${
                                    isOpen && " rotate-180"
                                }`}
                            />
                        )}
                    </Combobox.Button>
                    <Transition
                        show={isOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options
                            onClick={() => setIsOpen(!isOpen)}
                            className={`absolute z-10 w-full py-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  ${dropDownCss}`}
                        >
                            {signupDropdown ? (
                                <div className="overflow-auto max-h-60 custom-scrollbar">
                                    {filteredOtions.length === 0 &&
                                    query === "" ? (
                                        <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredOtions.map((option, i) => (
                                            <ComboOption
                                                key={i}
                                                option={option}
                                            />
                                        ))
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {filteredOtions.length === 0 &&
                                    query === "" ? (
                                        <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredOtions.map((option, i) => (
                                            <ComboOption
                                                key={i}
                                                option={option}
                                            />
                                        ))
                                    )}
                                </div>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
            {!errorPosition && hasError && (
                <div className="text-xs text-red-800 ml-1 mt-1">
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
                `cursor-default select-none border-b-[1px] border-[#EBEBEB] relative py-2 pl-10 pr-4 ${
                    active ? " bg-[#6DCDCB] bg-opacity-[55%]" : "text-gray-900"
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
                        data-tip
                        data-for={option.label}
                    >
                        {option.label}
                    </span>
                    {TOOLTIP_VALUE?.map((tooltip, index) => (
                        <ReactTooltip
                            id={tooltip?.id}
                            place="top"
                            effect="solid"
                            key={index}
                        >
                            {tooltip?.value}
                        </ReactTooltip>
                    ))}
                    {selected ? (
                        <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-dtech-main-dark"
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
export default DropdownField;
