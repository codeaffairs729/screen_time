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
    onFocusSearchBar,
    onBlurSearchBar,

}: {
    className?: string;
    onChange: (
        searchType: string,
        searchOption: { label: string; value: string }
    ) => void;
    onFocusSearchBar?: any;
    onBlurSearchBar?: any;
}) => {
    const [selected, setSelected] = useState<Option>();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false)
    const [oldOptions, setOldOptions] = useState<Option[]>([]);
    const openAutoCompleteBtn = useRef(null);

    const searchType = useSelector((state: RootState) => state.search.type);
    const {
        data: options,
        error,
        isLoading,
        execute: executeLodAutocomplete,
    } = useHttpCall<Option[]>([]);
    const [newOptions, setNewOptions] = useState<Option[]>(options);
    // Debounced call to api to fetch autocomplete results
    const lodAutocomplete = useMemo(
        () =>
            debounce(
                (inputVal: string) =>
                    executeLodAutocomplete(
                        () =>
                            Http.get(`/api/autocomplete?query=${inputVal}`, {
                                baseUrl:
                                    process.env.NEXT_PUBLIC_WEBCLIENT_ROOT
                            }),
                        {
                            postProcess: (res) =>
                                res?.map((t: string, i: number) => ({
                                    id: i + 1,
                                    name: t,
                                })),
                        }
                    ),
                1
            ),
        []
    );
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setSelected(selected);
                    setOpen(false)
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    useEffect(() => {
        if (!selected) return;
        onChange(searchType, { label: "User input", value: selected.name });
    }, [selected]);

    useEffect(() => {
        if (
            query.trim() == "" ||
            searchType == SearchTypes.ORGANISATION.value ||
            searchType == SearchTypes.TOPICS.value
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
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter'|| event.key === 'NumpadEnter') {
            onChange(searchType, { label: "User input", value: query });
            handleOnBlur()
            setOpen(false)
        }
    };
    const handleDeleteOption = (id: number) => {
        // Remove the selected option from the search history
        if (id === 0) {
            setQuery("")
        }
        setNewOptions((prevOptions) => prevOptions.filter((option) => option.id !== id));
    };
    const handleOnBlur = () => {
        onBlurSearchBar()
    }
    useEffect(() => {
        setNewOptions(options)
    }, [options])
    return (
        < div
            onFocus={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    onFocusSearchBar()
                }
            }}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    handleOnBlur()
                }
            }}
            className={clsx("flex z-20", className, `${(((query.length > 0 && open) || (newOptions.length > 0 && open)) || isLoading) && " !rounded-b-none border-b-0 rounded-t-3xl"
                }`)}>
            <Combobox value={selected} onChange={setSelected} nullable>
                <div className="flex flex-row w-full h-full relative">
                    <div className="relative rounded-full ml-4 flex items-center w-full h-full  cursor-default  text-left focus-within:outline-none sm:text-sm">
                        <Combobox.Input
                            placeholder="Search"
                            className="w-full shadow-[0, 0, 0, 350px, #212121]  sm:ml-0 !rounded-l-full max-h-[99%] border-none px-1 align-middle text-gray-900 h-full focus:ring-0 text-[19px] leading-[22px]"
                            onFocus={() => {
                                (openAutoCompleteBtn.current as any)?.click()
                            }
                            }
                            onKeyDown={handleKeyDown}
                            displayValue={(option: Option) => query}
                            value={query}
                            onChange={(event) => {
                                setOpen(true)
                                setOldOptions(newOptions);
                                setQuery(event.target.value)
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(!open)
                            }}
                        />
                        <Combobox.Button
                            ref={openAutoCompleteBtn}
                            className=""
                        ></Combobox.Button>
                    </div>
                    <Transition
                        show={open && (oldOptions.length > 0 || newOptions.length > 0)}
                        as={Fragment}
                    >
                        <Combobox.Options className={`absolute mt-8 -ml-[0.4%] border-[3px] border-dtech-light-teal border-t-0 sm:mt-9 max-h-60 w-[100.7%] rounded-b-3xl scrollable-container overflow-auto bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20 ${oldOptions.length == 0 && newOptions.length == 0 && "hidden"}`} ref={myRef}>
                            {query.length > 0 && (
                                <ComboboxOption
                                    key={query.length}
                                    setOpen={setOpen}
                                    item={{
                                        id: 0,
                                        name: query,
                                    }}
                                    onDelete={handleDeleteOption}
                                    handleOnBlur={handleOnBlur}
                                />
                            )}
                            {options.length === 0 && query !== "" ? (
                                oldOptions?.map((option) => (
                                    <ComboboxOption
                                        setOpen={setOpen}
                                        key={option.id}
                                        item={option}
                                        onDelete={handleDeleteOption}
                                        handleOnBlur={handleOnBlur}
                                    />
                                ))
                            ) : (
                                newOptions.map((option) => (
                                    <ComboboxOption
                                        setOpen={setOpen}
                                        key={option.id}
                                        item={option}
                                        onDelete={handleDeleteOption}
                                        handleOnBlur={handleOnBlur}
                                    />
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                    <div className="  text-dtech-main-dark flex flex-row px-1">
                        <div className="h-3/4 w-[1px] mx-3 my-[4px] bg-[#333333]">&nbsp;</div>
                        <SearchTypeSelect />
                        {/* <SearchIcon isLoading={false} /> */}
                    </div>
                </div>
            </Combobox>

        </div>
    );
};

export default NewSearchBar;