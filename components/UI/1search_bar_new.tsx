import { Fragment, useEffect, useMemo, useState } from "react";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import Http from "common/http";
import debounce from "debounce-promise";
import { useHttpCall } from "common/hooks";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { BsCheck } from "react-icons/bs";
import clsx from "clsx";
import Loader from "./loader";
import Dropdown, { MenuItemType } from "./drop_down";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateSearchType } from "store/search/search.action";
import { useRouter } from "next/router";

interface Option {
    id: number;
    name: string;
}

// const lodAutocomplete = (inputValue: string) =>
//     debounce(async (inputValue: string) => {
//         if (!inputValue) return;
//         const res = await Http.get<[]>("", {
//             baseUrl: `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}/completion/${inputValue}`,
//             extraHeaders: {
//                 "Content-type": "application/json",
//                 "x-api-key": process.env.NEXT_PUBLIC_MARK_KEY,
//             },
//         });
//         return res.map((t, i) => ({
//             id: i,
//             name: t[0],
//         }));
//     }, 500);

const SearchBar = ({ className = "" }) => {
    const [selected, setSelected] = useState<Option>();
    const [query, setQuery] = useState("");
    const router = useRouter();
    const {
        data: options,
        error,
        isLoading,
        execute: executeLodAutocomplete,
    } = useHttpCall<Option[]>([]);

    const lodAutocomplete = useMemo(
        () =>
            debounce(
                (inputVal: string) =>
                    executeLodAutocomplete(
                        () =>
                            Http.get(`/completion/${inputVal}`, {
                                baseUrl:
                                    process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
                                extraHeaders: {
                                    "Content-type": "application/json",
                                    "x-api-key":
                                        process.env.NEXT_PUBLIC_MARK_KEY,
                                },
                            }),
                        {
                            postProcess: (res) =>
                                res.map((t: string[], i: number) => ({
                                    id: i + 1,
                                    name: t[0],
                                })),
                        }
                    ),
                1000
            ),
        []
    );

    const searchType = useSelector((state: RootState) => state.search.type);

    useEffect(() => {
        if (!selected) return;
        const searchTypeQ = searchType === "dataset" ? "" : searchType;
        router.push({
            pathname: `/search/${searchTypeQ}`,
            query: { q: selected.name },
        });
    }, [selected]);

    useEffect(() => {
        if (query.trim() == "") {
            return;
        }
        lodAutocomplete(query);
    }, [query]);

    return (
        <div className={className}>
            <Combobox value={selected} onChange={setSelected} nullable>
                <div className="relative mt-1">
                    <div className="relative w-full border border-dtech-main-dark focus-within:border-dtech-secondary-dark focus-within:ring-2 focus-within:ring-dtech-secondary-dark cursor-default overflow-hidden rounded-full bg-white text-left focus-within:outline-none sm:text-sm">
                        <SearchIcon isLoading={isLoading} />
                        <Combobox.Button as="div">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-14 pr-10 text-gray-900 h-14 text-[19px] leading-[22px]"
                                displayValue={(option: Option) =>query
                                }
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                        </Combobox.Button>
                    </div>
                    <SearchTypeSelect />
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        // afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {query.length > 0 && (
                                <ComboboxOption
                                    item={{
                                        id: 0,
                                        name: query,
                                    }}
                                />
                            )}
                            {options.length === 0 && query !== "" ? (
                                <EmptyResults isLoading={isLoading} />
                            ) : (
                                options.map((option) => (
                                    <ComboboxOption
                                        key={option.id}
                                        item={option}
                                    />
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default SearchBar;

const SearchIcon = ({ isLoading }: { isLoading: boolean }) => {
    let content;

    if (isLoading) {
        content = <Loader />;
    } else {
        content = (
            <IoSearchOutline
                className={clsx("text-dtech-main-dark scale-[2]")}
            />
        );
    }
    return (
        <div className="absolute inset-y-0 left-6 rotate-90 flex items-center">
            {content}
        </div>
    );
};

const ComboboxOption = ({ item }: { item: Option }) => {
    return (
        <Combobox.Option
            className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-teal-600 text-white" : "text-gray-900"
                }`
            }
            value={item}
        >
            {({ selected, active }) => (
                <>
                    <span
                        className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                        }`}
                    >
                        {item.name}
                    </span>
                    {selected ? (
                        <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                            }`}
                        >
                            <BsCheck aria-hidden="true" />
                        </span>
                    ) : null}
                </>
            )}
        </Combobox.Option>
    );
};

const EmptyResults = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-700 text-sm">
            {isLoading ? "Loading..." : "Nothing found."}
        </div>
    );
};

const SearchTypeSelect = () => {
    const searchTypes: MenuItemType[] = [
        { label: "Dataset" },
        { label: "Organisation" },
    ];
    const [selected, setSelected] = useState(searchTypes[0]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSearchType(selected.label.toLowerCase()));
    }, []);

    return (
        <div className="absolute inset-y-0 right-5 flex items-center w-40">
            <Listbox by="label" value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-right focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
