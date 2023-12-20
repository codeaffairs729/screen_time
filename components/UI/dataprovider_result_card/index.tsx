import Link from "next/link";
import { Data } from "components/UI/result_card";
import DataStats from "components/UI/result_card/data_stat";
import Image from "next/image";
import {  useState } from "react";
import { BsChevronDown, BsEyeFill, BsHeartFill } from "react-icons/bs";
import DataproviderStats from "pages/search/organisation/components/data_provider_stats";
import { useRouter } from "next/router";
// Import the routeChange utility



interface DataProviderCardProps {
    data: Data;
    isMobile: boolean;
    imgCss?: string;
}

const DataProviderCard = ({ data, isMobile, imgCss="" }: DataProviderCardProps) => {
    const { title } = data || {};
    const href = `/${data.recordType ? data.recordType : "datasets"}/${
        data?.id
    }`;
    const { stats } = data || {};
    const router = useRouter();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [showProvider, setShowProvider] = useState<boolean>(false);

    return (
        <div
            className={` border border-gray-100 rounded-md md:rounded-xl shadow-card-shadow  hover:shadow-hover-shadow  md:min-h-[100%] md:w-full w-[90%] min-h-[112px]  mr-4 flex flex-col justify-between `}
        >
            <div
                className={`flex flex-col justify-center  items-center  ${
                    (isMobile && showProvider) ? "!justify-end":""
                }`}
            >
                <div
                    className="w-full relative "
                    onClick={() => setShowProvider(!showProvider)}
                >
                    <BsChevronDown
                        className={`font-normal absolute right-2 top-2 h-6 w-6 p-1 cursor-pointer float-right text-gray-500 border border-none rounded-full hover:bg-[#6DCDCB] hover:bg-opacity-[55%] active:bg-[#512C71] active:bg-opacity-[80%] active:text-white ${
                            showProvider && "rotate-180"
                        } transition-all`}
                        strokeWidth="1.5"
                    />
                </div>
                {!showProvider ? (
                    <FrontCard data={data} isMobile={isMobile} imgCss={imgCss} />
                ) : (
                            <BackCard data={data} isMobile={isMobile} />
                )}
                {/* {!showProvider && isMobile && stats && (
                    <DataproviderMobileFrontStats stats={stats} />
                )} */}
            </div>


            <div
                className={`hover:bg-dtech-light-teal hover:bg-opacity-[55%] hover:rounded-b-xl active:text-black active:border-b-2 active:border-black active:bg-dtech-dark-yellow active:rounded-b-xl active:bg-opacity-[80%] text-dtech-new-main-light  break-word  flex flex-col items-center justify-center md:py-6 py-3 relative  cursor-pointer ${
                    !showProvider &&
                    " border-[#EBEBEB]"
                }`}
                onClick={() => router.push(href)}
                onMouseEnter={() => setIsHover(true)}
                onMouseDown={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div
                    className={`flex flex-row items-center justify-between  flex-wrap w-full `}
                >
                    {/* <Link href={href}> */}
                    <span className={`font-bold md:text-base text-xs font-roboto leading-normal absolute  left-1 md:left-5  ${isHover && " underline underline-offset-2 text-dtech-main-dark"}`}>
                            {title}
                        </span>
                    {/* </Link> */}
                </div>
            </div>

        </div>
    );
};

const FrontCard = ({ data, isMobile,imgCss="" }: { data: Data; isMobile: boolean, imgCss?: string }) => {
    const { imgUrl, title } = data || {};

    const dummyImg = title
        .split(" ")
        .join(".")
        .split(".")
        .map((item) => item[0].toUpperCase())
        .join("");
    return (
        <div className="p-2 flex flex-col justify-center items-center overflow-hidden h-[77.94px] md:h-40 md:min-h-[138px] min-h-[114px] w-full cursor-auto">
            {imgUrl ? (
                <img
                    src={imgUrl}
                    alt=""
                    className={`${imgCss} `}
                />
            ) : (
                <div className="p-2 flex flex-col justify-center items-center overflow-hidden h-[77.94px] md:h-40 w-full font-extrabold text-[#EBEBEB] ">
                    <div>{dummyImg}</div>
                    </div>
            )}
        </div>
    );
};

const BackCard = ({ data, isMobile }: { data: Data; isMobile: boolean }) => {
    const { description, stats } = data ?? { description: '', stats: null };
    const words = (description || '').split(/\s+/);

    const descriptionWord = isMobile ? words.slice(0, 18) : words.slice(0, 40);

    return (
        <div
            className={` mx-3 md:mx-5 h-[77.94px] w-[100%] md:max-w-[90%] md:h-40 md:min-h-[138px] min-h-[114px] flex flex-col justify-between p-3 md:p-0`}
        >
            <div className={`text-[12px] md:font-normal tracking-tighter md:leading-[15.75px] leading-3 overflow-hidden over md:mt-6
             ${isMobile ? "min-h-[103px]" : "min-h-[50px]"}
             `}>
                {descriptionWord.join(" ")}...
            </div>
            {stats && !isMobile && (
                <div className="">
                    <DataproviderStats stats={stats} className="" />
                </div>
            )}
        </div>
    );
};

export default DataProviderCard;
