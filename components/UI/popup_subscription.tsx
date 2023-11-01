import React from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import UpgradeBtn from "./buttons/upgrade_btn";
import { FreeBtn } from "./buttons/free_btn";

const Professional = [
    { id: 1, name: "Search & navigation features " },
    { id: 2, name: "Data Set View page " },
    { id: 3, name: "My accounts page " },
    { id: 4, name: "General " },
];

const Essential = [
    { id: 1, name: "Search & navigation features " },
    { id: 2, name: "Data Set View page  " },
    { id: 3, name: "My accounts page  " },
];

const Premium = [
    { id: 1, name: "Data Set View page " },
    { id: 2, name: "Data provider, topic & region view Page " },
    { id: 3, name: "My Workspace page  " },
    { id: 4, name: "My accounts page " },
    { id: 5, name: "General " },
];

const options = [
    { id: 1, name: "Professional" },
    { id: 2, name: "Essential" },
    { id: 3, name: "Premium " },
];

const PopupSubscription = ({ handlePopup }: { handlePopup:any }) => {
    const [selected1, setSelected1] = useState(options[0]);
    const [selected2, setSelected2] = useState(options[1]);
    const [selected3, setSelected3] = useState(options[2]);
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? Professional
            : Professional.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const filteredEssential =
        query === ""
            ? Essential
            : Essential.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const filteredPremium =
        query === ""
            ? Premium
            : Premium.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );
    return (
        <div className="flex justify-center h-screen items-center relative">
            <div className="flex flex-col sm:hidden gap-10">
                <div className="w-72">
                    <p className="text-[#6E498E] text-[19px] text-center font-bold">
                        We have got a plan that’s perfect for you !
                    </p>
                </div>
                <Combobox value={selected1} onChange={setSelected1}>
                    <div className="relative mt-1 w-64">
                        <div className="relative w-full rounded-[30px] cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[1px] border-[#727272]">
                            <Combobox.Input
                                className="w-full border-none py-4 pl-3 text-base font-bold leading-5 focus:ring-0 text-center text-[#4CA7A5]"
                                displayValue={(person: any) => person?.name}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-black"
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
                            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-[1px] border-[#6DCDCB] rounded-[30px]">
                                {filteredPeople.length === 0 && query !== "" ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 ">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredPeople.map((person) => (
                                        <Combobox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-teal-600 text-white"
                                                        : "text-gray-900"
                                                }`
                                            }
                                            value={person}
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
                                                        {person.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-teal-600"
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
                        <div className="flex justify-center">
                            <UpgradeBtn />
                        </div>
                    </div>
                </Combobox>
                <Combobox value={selected2} onChange={setSelected2}>
                    <div className="relative mt-1 w-64">
                        <div className="relative w-full z-[2] cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ">
                            <Combobox.Input
                                className="w-full border-t-[3px] border-[#4CA7A5] py-4 pl-3 text-base font-bold leading-5 focus:ring-0 text-center bg-[#6DCDCB] text-[#333333]"
                                displayValue={(person: any) => person.name}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-black"
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
                            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-[1px] border-[#6DCDCB] ">
                                {filteredEssential.length === 0 &&
                                query !== "" ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 ">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredEssential.map((person) => (
                                        <Combobox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-teal-600 text-white"
                                                        : "text-gray-900"
                                                }`
                                            }
                                            value={person}
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
                                                        {person.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-teal-600"
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
                        <div className="absolute z-[1] top-[-38px] right-[-75px] m-auto w-32">
                            <img
                                className=""
                                src="/images/freepik--standard-option--inject-4.svg"
                                alt="freepik svg"
                            />
                        </div>
                        <div>
                            <FreeBtn />
                        </div>
                    </div>
                </Combobox>
                <Combobox value={selected3} onChange={setSelected3}>
                    <div className="relative mt-1 w-64">
                        <div className="relative w-full cursor-default overflow-hidden rounded-[30px] bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[1px] border-[#727272]">
                            <Combobox.Input
                                className="w-full border-none py-4 pl-3 text-base font-bold leading-5  focus:ring-0 text-center text-[#4CA7A5]"
                                displayValue={(person: any) => person.name}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-black"
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
                            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-[1px] border-[#6DCDCB] rounded-[30px]">
                                {filteredPremium.length === 0 &&
                                query !== "" ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredPremium.map((person) => (
                                        <Combobox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-teal-600 text-white"
                                                        : "text-gray-900"
                                                }`
                                            }
                                            value={person}
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
                                                        {person.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-teal-600"
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
                        <div className="flex justify-center ">
                            <UpgradeBtn />
                        </div>
                    </div>
                    <div className="flex ml-16">
                        <button
                            className="rounded-[30px] border-2 border-[#6E498E] py-2 px-12 text-[#6E498E]"
                            onClick={() => handlePopup()}
                        >
                            Skip
                        </button>
                    </div>
                </Combobox>
            </div>
            <div className="h-screen hidden sm:flex">
                <h1 className="text-[#6DCDCB] text-center top-24 m-auto right-0 left-0 text-[44px] font-bold absolute">
                    We have got a plan that’s perfect for you
                </h1>
                <div className="flex justify-center items-center h-full gap-x-24 md:gap-x-20">
                    <div className="text-center">
                        <div className="shadow-[0px_4px_20px_0px_rgba(56,_56,_56,_0.25)] ">
                            <div className="border-t-[3px] border-[#4CA7A5] shadow-[0px_4px_20px_0px_rgba(56,_56,_56,_0.25)]">
                                <p className="text-[#6E498E] py-3 px-20 xl:py-3 xl:px-20 font-bold">
                                    Professional
                                </p>
                            </div>
                            <div className="py-8 flex gap-4 flex-col">
                                <p><span><img src="" alt="" /></span>Search & navigation features </p>
                                <p>Data Set View page </p>
                                <p>My accounts page </p>
                                <p>General </p>
                            </div>
                        </div>
                        <UpgradeBtn />
                    </div>

                    <div className="text-center pb-[120px] relative">
                        <div className="shadow-[0px_4px_20px_0px_rgba(56,_56,_56,_0.25)]">
                            <div className="bg-[#6DCDCB] border-t-[3px] border-[#4CA7A5] ">
                                <p className="text-black py-3 px-24 font-bold">
                                    Essential
                                </p>
                            </div>
                            <div className="py-8 flex gap-4 flex-col">
                                <p>Search & navigation features </p>
                                <p>Data Set View page </p>
                                <p>My accounts page </p>
                            </div>
                        </div>
                        <div className="border-t-[3px] border-[#4CA7A5]">
                            <FreeBtn />
                        </div>
                        <img
                            className="absolute top-[-48px] left-[158px] right-0 m-auto"
                            src="/images/freepik--standard-option--inject-4.svg"
                            alt="freepik svg"
                        />
                    </div>

                    <div className="text-center ">
                        <div className="shadow-[0px_4px_20px_0px_rgba(56,_56,_56,_0.25)] ">
                            <div className="border-t-[3px] border-[#4CA7A5] shadow-[0px_4px_20px_0px_rgba(56,_56,_56,_0.25)]">
                                <p className="text-[#6E498E] py-3 px-32 font-bold">
                                    Professional
                                </p>
                            </div>
                            <div className="py-8 flex gap-4 flex-col">
                                <p>Data Set View page </p>
                                <p>Data provider, topic & region view page </p>
                                <p>My workspace page </p>
                                <p>My accounts page </p>
                                <p>General </p>
                            </div>
                        </div>
                        <UpgradeBtn />
                    </div>
                </div>
                <div className="absolute bottom-10 right-36">
                    <button
                        className="rounded-[30px] border-2 border-[#6E498E] py-2 px-6 text-[#6E498E]"
                        onClick={() => handlePopup()}
                    >
                        Skip
                    </button>
                </div>
            </div>
            <div className="flex absolute top-0 left-0">
                <div className=" bg-[#6E498E] h-screen w-4 sm:hidden md:relative md:w-8"></div>
                <div className=" bg-[#6DCDCB] h-screen w-2 sm:hidden sm:ml-0 md:relative md:w-8"></div>
            </div>
        </div>
    );
};

export default PopupSubscription;
