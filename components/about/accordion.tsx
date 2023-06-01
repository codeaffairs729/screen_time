import Router from "next/router";
import { type } from "os";
import React, { ReactNode, useState } from "react";
import { BsCheck, BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "store";
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
    guest?: string | boolean;
    essential: string | boolean;
    professional: string | boolean;
    premium: string | boolean;
    index: number;
    children?: Array<ReactNode>;
}) => {
    const [isActive, setIsActive] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const handleClick = () => {
        if (!user) {
            Router.push("/signup?signup_type=individual");
        }
    };

    return (
        <div  >
            <div className="flex  flex-row "  >
                <div
                    className={` ${index==0 && "rounded-t-3xl "} w-[32%]   ${
                        isActive && "bg-[#E4C3F9]"
                    } flex-wrap  flex justify-between p-8 border-t-4 border-r-4 border-l-4 ${index==5 && "border-b-4"} border-grey h-  ${
                        !children &&
                        typeof guest != "boolean" &&
                        " items-center  h-64  "
                    } ${
                        !children &&
                        feature != "Features" &&
                        "h-[50px]   text-xs !p-[4px] "
                    }
                    ${
                        feature == "Features" &&
                        " !justify-center !items-center pb-52 "
                    }`}
                    style={{ height: "inherit" }}
                >
                   <div className="flex items-stretch">
                    <div className=" mt-11 justify-center text-xl items-center">{feature}</div>
                    
                    <div className=" ml-3 mt-11 justify-center text-xl items-center" >
                        {children && (
                            <div
                                className=" cursor-pointer "
                                onClick={() => setIsActive(!isActive)}
                            >
                                <BsChevronDown style={{ fontSize: '2.5rem' , color: '#3f0068'}} />
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                {guest !== undefined ? (
                    <div className={` w-[22%] ${index==0 && "rounded-t-3xl "} bg-[#E4C3F9]  flex flex-wrap justify-center text-lg items-center border-4 border-white`}>
                        {typeof guest == "boolean" ? (
                            guest ? (
                                <BsCheck style={{ fontSize: '5rem' }}/>
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
                ) : (
                    ""
                )}

                <div className={` w-[22%]  ${index == 0 && "rounded-t-3xl"} bg-[#E3B7FF]  flex flex-wrap break-words justify-center text-lg items-center border-4 border-white`}>
                
                    {typeof essential == "boolean" ?  (
                        essential ? (
                            <BsCheck style={{ fontSize: '2rem' }} />
                        ) : (
                            "_"
                        )
                    ) : index == 0 ? (
                        <div className={`flex flex-col  justify-center font-medium items-center"`}  >
                            <div
                               className="flex flex-col justify-center items-center"
                               style={{ overflowWrap: "anywhere" }}
                            >
                                <div>{essential.split(" ")[0]}</div>
                                <div >{essential.split(" ")[1]}</div>
                                <div> {essential.split(" ")[2]}</div>
                            </div>
                            
                            <div className="  text-center my-6 mx-">
                                <div className="  text-xl font-medium">
                                    <h1> </h1>
                                </div>
                                
                                </div>
                            <div >
                            <button
                                    className=" bg-white shadow-xl rounded-full p-1 text-xs !flex md:text-xl md:!px-10 md:p-4"
                                    onClick={handleClick}
                                >
                                    {!user ? (
                                        <div>Sign Up</div>
                                    ) : (
                                        <div>Subscribed</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : 
                        <div>
                            {(children &&
                                children.filter(
                                    (item: any) =>
                                        item.props.essential === false
                                ).length) == 0 ? (
                                <BsCheck  style={{ fontSize: '5rem' }} />
                            ) : (
                                essential
                            )}
                        </div>
                    } 
                
                </div>
                <div className={` w-[22%] ${index == 0 && "rounded-t-3xl "} bg-[#D396FA] flex flex-wrap break-words justify-center text-lg items-center border-4 border-white`}>
                    {typeof professional == "boolean" ? (
                        professional ? (
                            <BsCheck style={{ fontSize: '5rem' }} />
                        ) : (
                            "_"
                        )
                    ) : index == 0 ? (
                        <div
                        className="flex flex-col justify-center items-center"
                        style={{ overflowWrap: "anywhere" }}
                        >
                            <div className="">{professional}</div>
                            <div className="  text-center my-6 mx-">
                                <div className="  text-xl font-medium">
                                    <h1> </h1>
                                </div>
                                <div className=" text-xs font-medium">
                                    <h6>
                                        Discounted bundles available for
                                        organisations
                                    </h6>
                                </div>
                            </div>
                            <div >
                                <button
                                    className=" bg-white shadow-xl rounded-full p-1 text-xs !flex md:text-xl md:!px-10 md:p-4"
                                    onClick={handleClick}
                                >
                                    {!user ? (
                                        <div>Sign Up</div>
                                    ) : (
                                        <div>Upgrade</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (children &&
                          children.filter(
                              (item: any) => item.props.professional === false
                          ).length) == 0 ? (
                        <BsCheck style={{ fontSize: '5rem' }} />
                    ) : (
                        professional
                    )}
                </div>
                <div className={`w-[22%] ${index == 0 && "rounded-t-2xl"}  bg-[#B46DE2] flex flex-wrap break-words justify-center text-lg items-center border-4 border-white`} >
                    {typeof premium == "boolean" ? (
                        premium ? (
                            <BsCheck style={{ fontSize: '3rem' }} />
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
                                    <h1> </h1>
                                </div>
                                <div className=" text-xs font-medium">
                                    <h6>
                                        Discounted bundles available for
                                        organisations
                                    </h6>
                                </div>
                            </div>
                            <div className="">
                                <button
                                    className=" bg-white shadow-xl rounded-full p-1 text-xs !flex md:text-xl md:!px-10 md:p-4"
                                    onClick={handleClick}
                                >
                                    {!user ? (
                                        <div>Sign Up</div>
                                    ) : (
                                        <div>Upgrade</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (children &&
                          children.filter(
                              (item: any) => item.props.premium === false
                          ).length) == 0 ? (
                        <BsCheck style={{ fontSize: '5rem' }} />
                    ) : (
                        premium
                    )}
                </div>
            </div>

            
               { isActive && children
              
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
