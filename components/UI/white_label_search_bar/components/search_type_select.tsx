import { Listbox, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateSearchType } from "store/search/search.action";
import { useRouter } from "next/router";
import clsx from "clsx";
export const SearchTypes = {
    DATASET: { label: "Dataset", value: "dataset", imgPath: "/images/icons/datasets.svg", imagePathOnHover: "/images/icons/datasets_hover.svg"},
    ORGANISATION: { label: "Data Provider", value: "organisation", imgPath: "/images/icons/data_providers.svg", imagePathOnHover: "/images/icons/data_providers_hover.svg" },
    TOPICS: { label: "Topics", value: "topics", imgPath: "/images/icons/topics.svg", imagePathOnHover: "/images/icons/topics_hover.svg" },
    REGIONS: { label: "Regions", value: "regions", imgPath: "/images/icons/regions.svg", imagePathOnHover: "/images/icons/regions_hover.svg" },

};

const SearchTypeSelect = () => {
    const searchTypes = [
        { label: SearchTypes.DATASET.label, value: SearchTypes.DATASET.value, path: SearchTypes.DATASET.imgPath, imagePathOnHover: SearchTypes.DATASET.imagePathOnHover },
        { label: SearchTypes.ORGANISATION.label, value: SearchTypes.ORGANISATION.value, path: SearchTypes.ORGANISATION.imgPath, imagePathOnHover: SearchTypes.ORGANISATION.imagePathOnHover},
        // { label: SearchTypes.TOPICS.label, value: SearchTypes.TOPICS.value, path: SearchTypes.TOPICS.imgPath, imagePathOnHover: SearchTypes.TOPICS.imagePathOnHover},
        // { label: SearchTypes.REGIONS.label, value: SearchTypes.REGIONS.value, path: SearchTypes.REGIONS.imgPath, imagePathOnHover: SearchTypes.REGIONS.imagePathOnHover},
    ];
    const [isHovered, setIsHovered] = useState(false);
    const [selected, setSelected] = useState(searchTypes[0]);
    const savedSearchType = useSelector(
        (state: RootState) => state.search.type
    );
    const dispatch = useDispatch();
    const router =useRouter()
    useEffect(() => {
        if(router.route!=='/'){
        const filteredSearchTypes = searchTypes.filter(
            (st) => st.value.toLowerCase() == savedSearchType.toLowerCase()
        );
        if (filteredSearchTypes.length > 0) {
            setSelected(filteredSearchTypes[0]);
        }}
        else{
            dispatch(updateSearchType(selected.value))
        }
    }, []);


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    
    return (
        <div className="flex items-center">
            <Listbox
                by="label"
                value={selected}
                onChange={(searchType) => {
                    setSelected(searchType);
                    dispatch(updateSearchType(searchType.value));
                }}
            >
                <div className="relative">
                    <Listbox.Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave} className="relative cursor-default pl-0 pr-10 text-right focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-dtech-new-main-light font-bold text-lg">{selected.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <img src="/images/icons/arrows/arrow_down.svg"/>
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
                                        `relative cursor-default select-none  pl-10  pr-4 ${
                                            active
                                            ? "bg-dtech-new-main-light text-white"
                                                : "text-dtech-dark-grey"
                                        }`
                                    }
                                    value={searchType}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`truncate p-2 text-[#727272] hover:text-white flex flex-row space-x-2 ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {!active&&<div className=""><img src={searchType.path} /></div>}
                                                {active&&<div className=""><img src={searchType.imagePathOnHover} /></div>}
                                                <div className={clsx(active&&"text-white")}>{searchType.label}</div>
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
