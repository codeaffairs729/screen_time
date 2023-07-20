import clsx from "clsx"
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Transition } from '@headlessui/react';

const HelpComponent = ({ item, index }: { item: any, index: any }) => {
    const [showDesc, setShowDesc] = useState(false);
    return (<div className=" sm:px-[10%]">
        <div key={item.label + index} className={clsx("flex flex-row justify-center px-6 py-4 sm:px-0 ", index % 2 != 0 ? "flex-row-reverse" : " bg-dtech-light-grey")}>
            <div className={clsx("w-1/2 sm:w-[50%] flex max-h-[108px] sm:max-h-full", showDesc && " items-start sm:items-center")}>
                <img src={item.img} />
            </div>
            <div className="flex flex-col w-3/5 mx-2">
                <div className=" text-dtech-new-main-light sm:text-xl font-bold my-2">
                    {item.label}
                </div>
                <div className="text-[#333333] font-bold sm:text-lg text-sm sm:my-8">
                    {item.title}
                </div>
                <Transition
                    show={showDesc}
                    enter="transition-all duration-1000"
                    enterFrom="opacity-0 max-h-0"
                    enterTo="opacity-100 max-h-full"
                    leave="transition-all duration-100"
                    leaveFrom="opacity-100 max-h-full"
                    leaveTo="opacity-0 max-h-0"
                >
                    <ul className={clsx("my-4 w-[184%]", index % 2 == 0 ? "-ml-[131px] sm:ml-0 max-w-fit" : "")}>
                        {item.summary.map((summ: any, i: any) => {
                            return (
                                <li className="text-[#000000] text-sm list-disc" key={i}>
                                    {summ}
                                </li>
                            )
                        }
                        )}
                    </ul>
                </Transition>
                <div
                    className="hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] active:bg-[#FDD522] focus:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black bg-dtech-new-main-light animate-pulse active:animate-ping text-dtech-main-light w-fit border-dtech-main-dark border-2 text-sm sm:text-lg font-sans sm:mt-8 sm:p-3 p-1 mt-4 cursor-pointer"
                    onClick={() => setShowDesc(!showDesc)}
                >
                    {
                        showDesc
                            ?
                            <div className="flex flex-row">
                                Read Less<HiOutlineChevronUp className="my-2 animate-bounce ml-2" />
                            </div>
                            :
                            <div className="flex flex-row">
                                Read More<HiOutlineChevronDown className="my-2 animate-bounce ml-2" />
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>

    )

}
export default HelpComponent