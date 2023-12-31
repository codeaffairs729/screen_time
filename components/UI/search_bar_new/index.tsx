import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import Http from "common/http";
import debounce from "debounce-promise";
import { useHttpCall } from "common/hooks";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateSearchType } from "store/search/search.action";
import { useRouter } from "next/router";
import SearchTypeSelect, { SearchTypes } from "./components/search_type_select";
import SearchIcon from "./components/search_icon";
import EmptyResults from "./components/empty_results";
import ComboboxOption, { Option } from "./components/combobox_option";

const SearchBar = ({
    className = "",
    onChange,
}: {
    className?: string;
    onChange: (
        searchType: string,
        searchOption: { label: string; value: string }
    ) => void;
}) => {
    const [selected, setSelected] = useState<Option>();
    const [query, setQuery] = useState("");
    const openAutoCompleteBtn = useRef(null);
    const [open, setOpen] = useState<boolean>(false);
    const protocol = window.location.protocol || "http:";
    const host =
    window.location.hostname !== "localhost"
        ? window.location.hostname
        : "localhost:3000";
    const fullUrl = `${protocol}//${host}`;
    const searchType = useSelector((state: RootState) => state.search.type);
    const {
        data: options,
        error,
        isLoading,
        execute: executeLodAutocomplete,
    } = useHttpCall<Option[]>([]);

    // Debounced call to api to fetch autocomplete results
    const lodAutocomplete = useMemo(
        () =>
            debounce(
                (inputVal: string) =>
                    executeLodAutocomplete(
                        () =>
                            Http.get(`/api/autocomplete?query=${inputVal}`, {
                                baseUrl: fullUrl,
                            }),
                        {
                            postProcess: (res) =>
                                res.map((t: string[], i: number) => ({
                                    id: i + 1,
                                    name: t,
                                })),
                        }
                    ),
                1
            ),
        []
    );

    useEffect(() => {
        if (!selected) return;
        onChange(searchType, { label: "User input", value: selected.name });
    }, [selected]);

    useEffect(() => {
        if (
            query.trim() == "" ||
            searchType == SearchTypes.ORGANISATION.value
        ) {
            return;
        }
        lodAutocomplete(query);
    }, [query]);
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setSelected(selected);
                    setOpen(false);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }
    const {
        query: { q },
    } = useRouter();
    useEffect(() => {
        if (q) {
            setQuery(q as string);
        }
    }, [q]);
    const handleInputClick = (event: any) => {
        event.stopPropagation();
        setOpen(!open);
    };
    return (
        <div className={clsx("", className)}>
            <Combobox value={selected} onChange={setSelected} nullable>
                <div className="relative w-full h-full">
                    <div className="relative flex items-center w-full h-full border border-dtech-main-dark focus-within:border-dtech-secondary-dark focus-within:ring-2 focus-within:ring-dtech-secondary-dark cursor-default rounded-full bg-white text-left focus-within:outline-none sm:text-sm">
                        <SearchIcon isLoading={false} />
                        <Combobox.Input
                            className="w-full max-h-[99%] border-none px-2 align-middle text-gray-900 h-full focus:ring-0 text-[19px] leading-[22px]"
                            onFocus={() =>
                                (openAutoCompleteBtn.current as any)?.click()
                            }
                            displayValue={(option: Option) => query}
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            onClick={(e) => handleInputClick(e)}
                        />
                        <Combobox.Button
                            ref={openAutoCompleteBtn}
                            className=""
                        ></Combobox.Button>
                        <SearchTypeSelect />
                    </div>
                    {
                        <Transition
                            as={Fragment}
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Combobox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
                                ref={myRef}
                            >
                                {query.length > 0 && (
                                    <ComboboxOption
                                        setOpen={setOpen}
                                        item={{
                                            id: 0,
                                            name: query,
                                        }}
                                    />
                                )}
                                {!(options.length === 0 && query !== "") &&
                                    options.map((option) => (
                                        <ComboboxOption
                                            setOpen={setOpen}
                                            key={option.id}
                                            item={option}
                                        />
                                    ))}
                            </Combobox.Options>
                        </Transition>
                    }
                </div>
            </Combobox>
        </div>
    );
};

export default SearchBar;
