import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HelpCard = ({
    cardNumber,
    image,
    setImage,
    imageOne,
    imageTwo,
    title,
    shortDesc,
    desc,
    cardUrl,
    cardUrlLabel
}: {
    cardNumber:number
    image: boolean;
    setImage: Function;
    imageOne: StaticImageData;
    imageTwo: StaticImageData;
    title: string;
    shortDesc: string;
    desc: string[];
    cardUrl: string;
    cardUrlLabel: string;
}) => {
    const [showDesc, setShowDesc] = useState(false);
    return (
        <div>
            <div className=" shadow-lg w-max border-2 my-2 rounded-lg flex flex-col md:flex-row">
                <div className=" mx-[10%] my-[4%] flex flex-col items-center">
                    <div className="">
                        <Image className=""
                            src={image ? imageOne : imageTwo}
                            height={1000}
                            width={1000}
                        />
                    </div>
                    <div className="flex flex-row">
                        <div
                            className={`w-4 h-4  m-3 rounded-full ${
                                image ? `bg-dtech-main-dark` : `bg-[#DBCFE2]`
                            }`}
                            onClick={() => setImage(true)}
                        ></div>
                        <div
                            className={`w-4 h-4  m-3 rounded-full ${
                                image ? `bg-[#DBCFE2]` : `bg-dtech-main-dark`
                            }`}
                            onClick={() => setImage(false)}
                        ></div>
                    </div>
                </div>
                <div className=" mx-[10%] my-[4%] flex flex-col ">
                    <div className=" shadow-md mx-1 my-2 text-center bg-inherit border-2 rounded-xl flex flex-col justify-between">
                        <div>
                            <div className="text-dtech-main-dark text-4xl my-6 ml-4 font-sans font-bold break-words">
                                <span className=" text-dtech-main-light bold text-6xl mr-5">{cardNumber+1}</span>{title}
                            </div>
                            <div className="text-dtech-main-dark text-1xl my-6">
                                {shortDesc}
                            </div>
                            {showDesc && (
                                <div className="text-dtech-main-dark text-1xl my-10">
                                    {desc.map((item, index) => (
                                        <div key={index} className="flex justify-left items-center mx-8">
                                            <div className="select-none outline-none  w-2 h-2 bg-black rounded-full mr-1"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className=" bg-dtech-main-light text-dtech-main-dark text-lg font-sans p-5 cursor-pointer"
                            onClick={() => setShowDesc(!showDesc)}
                        >
                            {showDesc ? (
                                <div>Read Less</div>
                            ) : (
                                <div>Read More</div>
                            )}
                        </div>
                    </div>{" "}
                    <div className="w-[420px] mx-1 my-5 rounded-full p-5 text-2xl text-white justify-between text-center bg-dtech-main-dark max-w-full font-bold underline">
                                    
                        <Link href={cardUrl}><a target="_blank">Try Dtechtive</a></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HelpCard;
