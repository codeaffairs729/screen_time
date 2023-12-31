import clsx from "clsx"
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Transition } from '@headlessui/react';

const HelpComponent = ({ item, index, isMobile }: { item: any, index: any, isMobile: any }) => {
    const [showDesc, setShowDesc] = useState(false);
    return (<div className=" sm:px-[10%]  ">
        <div key={item.label + index} className={clsx("px-6 py-10 mb-8 sm:px-0 md:bg-white bg-[#E0E0E0]", /*index % 2 != 0 ? "flex-row-reverse" : " bg-[#EBEBEB]" */)}>
            <div className="flex flex-row justify-center items-center" >
                <div className={clsx("w-1/2 sm:w-[50%] flex max-h-full md:p-8", showDesc && " items-start sm:items-center")}>
                    <img src={item.img} />
                </div>
                <div className="flex flex-col w-3/5 mx-2">
                    <div className=" text-dtech-new-main-light md:text-[22px] text-[14px] font-[700] my-2">
                        {item.label}
                    </div>
                    <div className="text-[#333333] font-[700] md:font-[400] md:text-[19px] text-[12px] sm:my-8">
                        {item.title}
                    </div>
                    {!isMobile&&<Transition
                        show={showDesc}
                        enter="transition-all duration-1000"
                        enterFrom="opacity-0 max-h-0"
                        enterTo="opacity-100 max-h-full"
                        leave="transition-all duration-100"
                        leaveFrom="opacity-100 max-h-full"
                        leaveTo="opacity-0 max-h-0"
                    >
                        <ul className={clsx("my-4 w-[100%] sm:ml-5 max-w-fit")}>
                            {item.summary.map((summ: any, i: any) => {
                                return (
                                    <li className="text-[#C3C3C3] md:text-[25px] my-1 text-sm list-disc" key={i}>
                                        <span className="text-[#000000] md:text-[16px] font-[400]">{summ}</span>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </Transition>}
                    <div
                        className="font-[700] !text-dtech-new-main-light hover:bg-[#6DCDCB] hover:text-black  active:bg-dtech-main-dark active:!text-white focus:bg-dtech-main-dark focus:!text-white  w-fit  text-[12px] sm:text-[16px] sm:mt-8 sm:px-3 p-1 mt-4 cursor-pointer rounded-full"
                        onClick={() => setShowDesc(!showDesc)}
                    >
                        {
                            showDesc
                                ?
                                !isMobile&&<div className="flex flex-row items-center justify-center ">
                                    <div>Read Less</div><HiOutlineChevronUp size={30} className="my-2 ml-2" />
                                </div>
                                :
                                <div className="flex flex-row items-center justify-center ">
                                    <div>Read More</div><HiOutlineChevronDown size={30} className="my-2 ml-2" />
                                </div>
                        }
                    </div>
                </div>
            </div>
            {isMobile&&<div className="grid w-[100%]">
                <Transition
                    show={showDesc}
                    enter="transition-all duration-1000"
                    enterFrom="opacity-0 max-h-0"
                    enterTo="opacity-100 max-h-full"
                    leave="transition-all duration-100"
                    leaveFrom="opacity-100 max-h-full"
                    leaveTo="opacity-0 max-h-0"
                >
                    <ul className={clsx("my-4 w-[100%] sm:ml-5 max-w-fit")}>
                        {item.summary.map((summ: any, i: any) => {
                            return (
                                <li className="text-[#000000] sm:text-[#C3C3C3] md:text-[25px] my-1 text-sm list-disc" key={i}>
                                    <span className="text-[#000000] text-[12px] font-[400]">{summ}</span>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </Transition>
                <div className="flex justify-center items-center">
                    <div
                        className="font-[700] !text-dtech-new-main-light hover:bg-[#6DCDCB] hover:text-black  active:bg-dtech-main-dark active:!text-white focus:bg-dtech-main-dark focus:!text-white  w-fit  text-[12px] sm:mt-8 sm:px-3 p-1 mt-4 cursor-pointer rounded-full"
                        onClick={() => setShowDesc(!showDesc)}
                    >
                        {
                            showDesc&&<div className="flex flex-row items-center justify-center ">
                                <div>Read Less</div><HiOutlineChevronUp size={30} className="my-2 ml-2" />
                            </div>
                        }
                    </div>
                </div>
            </div>}
        </div>
    </div>

    )

}
export default HelpComponent