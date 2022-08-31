import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function OptionDropdown({
    items,
    activeItem,
    changeFunc,
}: {
    items: string[];
    activeItem: string;
    changeFunc: (d: string) => void;
}) {
    // const [selected, setSelected] = useState(people[2]);
    const [query, setQuery] = useState("");

    const filteredItems =
        query === ""
            ? items
            : items.filter((item) =>
                  item
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="w-72 text-left">
            <Combobox value={activeItem} onChange={changeFunc}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left">
                        <Combobox.Input
                            className="w-full rounded-lg py-2 pl-3 pr-10 text-md font-semibold leading-5 text-gray-900 border-[0px] bg-[#f5f5f5]"
                            displayValue={(item: string) => item}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredItems.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredItems.map((item, idx) => (
                                    <Combobox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${
                                                active ? "bg-gray-200" : ""
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {item}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-gray-900"
                                                                : "text-gray-900"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
