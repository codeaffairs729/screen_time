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

const NewSearchBar = ({
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
                            Http.get(`/v5/autocomplete/suggestions/${inputVal}`, {
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
                                res.map((t: string, i: number) => ({
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

    const {
        query: { q },
    } = useRouter();
    useEffect(() => {
        if (q) {
            setQuery(q as string);
        }
    }, [q]);

    return (
        <div className={clsx("flex flex-row", className)}>
            <Combobox value={selected} onChange={setSelected} nullable>
                <div className="relative w-full h-full">
                    <div className="relative flex items-center w-full h-full border cursor-default  bg-white text-left focus-within:outline-none sm:text-sm">
                        <Combobox.Input
                            placeholder="Search"
                            className="w-full max-h-[99%] border-none px-2 align-middle text-gray-900 h-full focus:ring-0 text-[19px] leading-[22px]"
                            onFocus={() =>
                                (openAutoCompleteBtn.current as any)?.click()
                            }
                            displayValue={(option: Option) => query}
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button
                            ref={openAutoCompleteBtn}
                            className=""
                        ></Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
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
                <div className="h-3/4 w-[1px] mx-3 my-[4px] bg-[#333333]"></div>
            <SearchTypeSelect />
            </Combobox>
            <div className="w-14 bg-dtech-new-main-light">
            <SearchIcon isLoading={isLoading} />
            </div>

        </div>
    );
};

export default NewSearchBar;