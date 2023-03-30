import { type } from "os";
import React, { ReactNode, useState } from "react";
import { BsCheck, BsChevronDown } from "react-icons/bs";

const Accordion = ({
    feature,
    guest,
    essential,
    professional,
    premium,
    index,
    children,
}: {
    feature: string;
    guest: string | boolean;
    essential: string | boolean;
    professional: string | boolean;
    premium: string | boolean;
    index: number;
    children?: Array<ReactNode>;
}) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div>
            <div className="flex flex-row rounded-xl ">
                <div
                    className={`w-[28%] ${
                        isActive && " bg-[#D3D3D3]"
                    } flex-wrap flex justify-between p-8 border-4 border-grey h-  ${
                        !children &&
                        typeof guest != "boolean" &&
                        " items-center h-64"
                    } ${
                        !children &&
                        feature != "Features" &&
                        "h-[50px]  text-xs !p-[4px] "
                    }
                    ${
                        feature == "Features" &&
                        " !justify-center !items-center pb-52"
                    }`}
                    style={{ height: "inherit" }}
                >
                    <div>{feature}</div><div>
                    {children && (
                        <div
                            className=" cursor-pointer"
                            onClick={() => setIsActive(!isActive)}
                        >
                            <BsChevronDown size={25} />
                        </div>
                    )}

                    </div>
                </div>
                <div className=" w-[18%] bg-[#E4C3F9] flex flex-wrap justify-center text-lg items-center border-4 border-white">
                    {typeof guest == "boolean" ? (
                        guest ? (
                            <BsCheck size={40} />
                        ) : (
                            "_"
                        )
                    ) : guest == "Guest (free)" ? (
                        <div
                            className=" pb-36 font-medium break-words"
                            style={{ overflowWrap: "anywhere" }}
                        >
                            <div>{guest.split(" ")[0]}</div>
                            <div>{guest.split(" ")[1]}</div>
                        </div>
                    ) : (
                        guest
                    )}
                </div>
                <div className=" w-[18%] bg-[#E3B7FF] flex flex-wrap break-words justify-center text-lg items-center border-4 border-white">
                    {typeof essential == "boolean" ? (
                        essential ? (
                            <BsCheck size={40} />
                        ) : (
                            "_"
                        )
                    ) : index == 0 ? (
                        <div className="flex flex-col justify-center font-medium items-center">
                            <div
                                className=" mb-14   flex flex-col justify-center items-center"
                                style={{ overflowWrap: "anywhere" }}
                            >
                                <div>{essential.split(" ")[0]}</div>
                                <div>{essential.split(" ")[1]}</div>
                                <div> {essential.split(" ")[2]}</div>
                            </div>
                            <div className="">
                                <button className=" bg-white shadow-xl rounded-full p-1 text-xs md:!px-10 flex md:text-xl md:p-4">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    ) : (
                        essential
                    )}
                </div>
                <div className=" w-[18%] bg-[#D396FA] flex flex-wrap break-words justify-center text-lg items-center border-4 border-white">
                    {typeof professional == "boolean" ? (
                        professional ? (
                            <BsCheck size={40} />
                        ) : (
                            "_"
                        )
                    ) : index == 0 ? (
                        <div
                            className="flex flex-col justify-center items-center"
                            style={{ overflowWrap: "anywhere" }}
                        >
                            <div className=" font-medium ">{premium}</div>
                            <div className="text-center my-6 mx-">
                                <div className=" text-xl font-medium">
                                    <h1>£15/user/month</h1>
                                </div>
                                <div className=" text-xs font-medium">
                                    <h6>
                                        Discounted bundles available for
                                        organisations
                                    </h6>
                                </div>
                            </div>
                            <div className="">
                                <button className=" bg-white shadow-xl rounded-full p-1 text-xs !flex md:text-xl md:!px-10 md:p-4">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    ) : (
                        professional
                    )}
                </div>
                <div className=" w-[18%] bg-[#B46DE2] flex text-white justify-center text-lg items-center border-4 border-white">
                    {typeof premium == "boolean" ? (
                        premium ? (
                            <BsCheck size={40} />
                        ) : (
                            "_"
                        )
                    ) : index == 0 ? (
                        <div
                            className="flex flex-col justify-center items-center"
                            style={{ overflowWrap: "anywhere" }}
                        >
                            <div className=" font-medium ">{premium}</div>
                            <div className="text-center my-6">
                                <div className="text-xl font-medium">
                                    <h1>£20/user/month</h1>
                                </div>
                                <div className=" text-xs font-medium">
                                    <h6>
                                        Discounted bundles available for
                                        organisations
                                    </h6>
                                </div>
                            </div>
                            <div className="">
                                <button className=" bg-white !text-black shadow-xl  rounded-full p-1  text-xs flex md:text-xl md:p-4 md:!px-10">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    ) : (
                        premium
                    )}
                </div>
            </div>

            {
                isActive && children
                // <div className="flex flex-row rounded-xl ">
                //     <div className=" w-[20%] flex justify-between p-4 border-4 border-grey">
                //     <div>{feature}</div>
                //         <div>{isActive ? "-" : "+"}</div>
                //     </div>
                //     <div className=" w-[20%] bg-[#E4C3F9] text-center border-4 border-white">
                //         {guest}
                //     </div>
                //     <div className=" w-[20%] bg-[#E3B7FF] text-center border-4 border-white">
                //         {essential}
                //     </div>
                //     <div className=" w-[20%] bg-[#D396FA] text-center border-4 border-white">
                //         {professional}
                //     </div>
                //     <div className=" w-[20%] bg-[#B46DE2] text-center border-4 border-white">
                //         {premium}
                //     </div>
                // </div>
            }
        </div>
    );
};

export default Accordion;
