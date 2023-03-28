import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HelpCard = ({
    cardNumber,
    imageOne,
    imageTwo,
    title,
    shortDesc,
    desc,
    cardUrl,
    cardUrlLabel,
}: {
    cardNumber: number;
    imageOne: string|StaticImageData;
    imageTwo: string|StaticImageData;
    title: string;
    shortDesc: string;
    desc: string[];
    cardUrl: string;
    cardUrlLabel: string;
}) => {
    const [showDesc, setShowDesc] = useState(false);
    const [image, setImage] = useState(true);

    return (
        <div
            className={`shadow-lg w-[100%] border-2 my-2 rounded-lg  flex flex-col ${
                (cardNumber % 2 ==0) ? "md:flex-row" : "md:flex-row-reverse"
            }`}
        >
            <div className=" my-[1%] flex flex-col items-center w-[100%] md:mx-16">
                <div className="">
                    <Image
                        src={image ? imageOne : imageTwo}
                        height={450}
                        width={450}
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
            <div className=" my-[4%] flex flex-col md:mx-20 ">
                <div className=" shadow-md mx-1 my-2 text-center bg-inherit border-2 rounded-xl flex flex-col justify-between">
                    <div>
                        <div className="text-dtech-main-dark text-4xl my-6 ml-4 font-sans font-bold break-words">
                            <span className=" text-dtech-main-light bold text-6xl mr-5">
                                {cardNumber + 1}
                            </span>
                            {title}
                        </div>
                        <div className="text-dtech-main-dark text-1xl my-6">
                            {shortDesc}
                        </div>
                        {showDesc && (
                            <div className="text-dtech-main-dark text-1xl my-10">
                                {desc.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-left  mx-8"
                                    >
                                        <div className="select-none outline-none  w-2 h-2 bg-black rounded-full mr-2 mt-[7px]"></div>
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
                        {showDesc ? <div>Read Less</div> : <div>Read More</div>}
                    </div>
                </div>{" "}
                <div className="w-[420px] mx-1 my-5 rounded-full p-5 text-2xl text-white justify-between text-center bg-dtech-main-dark max-w-full font-bold underline">
                    <Link href={cardUrl}>
                        <a target="_blank">{cardUrlLabel}</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default HelpCard;
