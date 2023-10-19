import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";

const SubscriptionDropdown = ({ label }: { label: string }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            {label.toLocaleLowerCase() !== "essential" ? (
                <>
                    <div
                        className={`flex flex-col items-center border  py-4 px-4 w-60 ${
                            open
                                ? "rounded-3xl border-[#6DCDCB] !px-2"
                                : "rounded-full px-10 shadow-md"
                        }`}
                    >
                        <div
                            className="flex flex-row items-center "
                            onClick={() => setOpen(!open)}
                        >
                            <span className="text-[#4CA7A5] text-base font-bold">
                                {label}
                            </span>
                            <div className="absolute pl-[8rem]">
                                <VscTriangleDown
                                    className={`w-3 h-3 text-2xl text-inherit transition-all ${
                                        open && "rotate-180"
                                    }`}
                                />
                            </div>
                        </div>
                        {open && (
                            <div className="text-center mt-5 text-[#727272">
                                {[
                                    "Search & navigation features",
                                    "Data Set View page",
                                    "My accounts page",
                                    "General",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-center items-center text-sm font-normal"
                                    >
                                        <span className="mx-2">
                                            <BsCheck2 className=" text-[#4CA7A5] w-5 h-5" strokeWidth={1} />
                                        </span>
                                        <span className="">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className=" flex justify-center items-center bg-dtech-new-main-light m-4 p-4 w-[127px] h-[40px] rounded-full mx-2 cursor-pointer"
                        onClick={() => {}}
                    >
                        <span className="text-white">Upgrade</span>
                    </button>
                </>
            ) : (
                <div className="border border-t-2 my-1.5 border-t-[#4CA7A5]">
                    <div className="bg-[#6DCDCB] h-14 w-60 flex flex-row justify-center items-center ">
                        <div
                            className="flex flex-row items-center "
                            onClick={() => setOpen(!open)}
                        >
                            <div className="text-base font-bold">{label}</div>
                            <div className="absolute pl-[7rem]">
                                <VscTriangleDown
                                    className={`w-3 h-3 text-2xl text-inherit transition-all ${
                                        open && "rotate-180"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                    {open && (
                        <div className="text-center mt-5 mb-2 ">
                            {[
                                "Search & navigation features",
                                "Data Set View page",
                                "My accounts page",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-center items-center text-sm font-normal"
                                >
                                    <span className="mx-2">
                                        <BsCheck2 className=" text-[#4CA7A5] w-5 h-5 " strokeWidth={1} />
                                    </span>
                                    <span className="">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SubscriptionDropdown;
