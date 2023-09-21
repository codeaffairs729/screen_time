import Link from "next/link";
import { Data } from "components/UI/result_card";
import DataStats from "components/UI/result_card/data_stat";
import Image from "next/image";
import {  useState } from "react";
import { BsChevronDown, BsEyeFill, BsHeartFill } from "react-icons/bs";
import DataproviderStats from "pages/search/organisation/components/data_provider_stats";


interface DataProviderCardProps {
    data: Data;
    isMobile: boolean;
}

const DataProviderCard = ({ data, isMobile }: DataProviderCardProps) => {
    const { title } = data || {};
    const href = `/${data.recordType ? data.recordType : "datasets"}/${
        data.id
    }`;
    console.log({ data });
    const { stats } = data || {};
    const [showProvider, setShowProvider] = useState<boolean>(false);

    return (
        <div
            className={` border border-gray-100 rounded-md md:rounded-xl shadow-custom-2  min-h-[100%] max-w-[90%]  md:max-h-[10%] md:min-w-[100%] `}
        >
            <div
                className={`flex flex-col justify-center  items-center  ${
                    isMobile && showProvider && "!justify-end"
                }`}
            >
                <div
                    className="w-full px-3 py-2 relative "
                    onClick={() => setShowProvider(!showProvider)}
                >
                    <BsChevronDown
                        className={`font-normal absolute right-2 h-6 w-6 p-1 cursor-pointer float-right text-gray-500 border border-none rounded-full hover:bg-[#6DCDCB] hover:bg-opacity-[55%] active:bg-[#512C71] active:bg-opacity-[80%] active:text-white ${
                            showProvider && "rotate-180"
                        } transition-all`}
                        strokeWidth="1.5"
                    />
                </div>
                {!showProvider ? (
                    <FrontCard data={data} isMobile={isMobile} />
                ) : (
                    <BackCard data={data} isMobile={isMobile} />
                )}
                {!showProvider && isMobile && stats && (
                    <DataproviderMobileFrontStats stats={stats} />
                )}
            </div>


            <div
                className={`hover:bg-[#D9EFFC] active:bg-[#512C71] active:bg-opacity-[80%] text-dtech-new-main-light active:text-white  break-word overflow-hidden flex flex-col items-center justify-center py-4 md:py-6  relative  ${
                    !showProvider &&
                    " border-t-[1px] md:border-t-2 border-gray-300"
                }`}
            >
                <div
                    className={`flex flex-row items-center justify-between  flex-wrap w-full `}
                >
                    <Link href={href}>
                        <a className="font-bold md:text-base text-xs  leading-[10.75px] absolute  left-1 md:left-3 ">
                            {title}
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    );
};

const FrontCard = ({ data, isMobile }: { data: Data; isMobile: boolean }) => {
    const { imgUrl, title } = data || {};

    const dummyImg = title
        .split(" ")
        .join(".")
        .split(".")
        .map((item) => item[0].toUpperCase())
        .join("");
    return (
        <div className="p-2 flex flex-col justify-center items-center overflow-hidden h-[77.94px] md:h-40 w-full">
            {imgUrl ? (
                <img
                    src={imgUrl}
                    alt=""
                    className="object-contain md:h-40 md:w-full h-[77.94px] w-[225.35px]"
                    style={{ objectFit: "contain" }}
                />
            ) : (
                <div className="object-cover">{dummyImg}</div>
            )}
            <div className=" h-[14px]"></div>
        </div>
    );
};

const BackCard = ({ data, isMobile }: { data: Data; isMobile: boolean }) => {
    const { description, stats } = data || {};
    const words = description.split(/\s+/);
    const descriptionWord = isMobile ? words.slice(0, 12) : words.slice(0, 15);

    return (
        <div className={` mx-3 md:mx-5 md:my-3  `}>
            <div className={`text-[12px] md:text-[16px] md:font-normal leading-[18.75px] overflow-hidden over md:my-3 ${isMobile && "min-h-[103px]"}`}>
                {descriptionWord.join(" ")}...
            </div>
            {stats && !isMobile && (
                <div className="w-[129px] md:w-[300px]">
                    <DataproviderStats stats={stats} className="mt-5" />
                </div>
            )}
        </div>
    );
};

export default DataProviderCard;

const DataproviderMobileFrontStats = ({
    stats,
    className,
}: {
    stats: DataStats;
    className?: string;
}) => {
    const {
        datasetsCount = 0,
        favoritesCount = 0,
        viewCount = 0,
        downloadCount = 0,
    } = stats || {};

    return (
        <div className={`w-full ${className}`}>
            <div className="flex flex-row justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center ">
                        <Image
                            src="/images/provider-detail-page/new_mobile_dataset.svg"
                            alt=""
                            height={20}
                            width={10}
                        />
                        <span className="ml-1 font-normal text-base text-[#727272]">
                            {datasetsCount}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center ">
                        <BsEyeFill className=" w-4 h-4 text-[#727272] " />
                        <span className="ml-1 font-normal text-base text-[#727272] ">
                            {viewCount}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center ">
                        <BsHeartFill className=" w-4 h-4 text-[#727272] " />
                        <span className="ml-1 font-normal text-base text-[#727272] ">
                            {favoritesCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
