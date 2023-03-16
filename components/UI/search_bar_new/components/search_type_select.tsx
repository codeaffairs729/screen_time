import { Listbox, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateSearchType } from "store/search/search.action";

const SearchTypeSelect = () => {
    const searchTypes = [{ label: "Dataset" }, { label: "Organisation" }];
    const [selected, setSelected] = useState(searchTypes[0]);
    const savedSearchType = useSelector(
        (state: RootState) => state.search.type
    );
    const dispatch = useDispatch();
    useEffect(() => {
        const filteredSearchTypes = searchTypes.filter(
            (st) => st.label.toLowerCase() == savedSearchType.toLowerCase()
        );
        if (filteredSearchTypes.length > 0) {
            setSelected(filteredSearchTypes[0]);
        }
    }, []);

    return (
        <div className="flex items-center">
            <Listbox
                by="label"
                value={selected}
                onChange={(searchType) => {
                    setSelected(searchType);
                    dispatch(updateSearchType(searchType.label.toLowerCase()));
                }}
            >
                <div className="relative">
                    <Listbox.Button className="relative cursor-default pl-0 pr-10 text-right focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiOutlineChevronUpDown aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute right-0 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                            {searchTypes.map((searchType, i) => (
                                <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-dtech-main-light"
                                                : "text-dtech-dark-grey"
                                        }`
                                    }
                                    value={searchType}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate text-dtech-dark-grey ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {searchType.label}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-dtech-dark-grey">
                                                    <BsCheck aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default SearchTypeSelect;
