import Image from "next/image";
import { BsEyeFill, BsHeartFill } from "react-icons/bs";
import { DataStats } from "models/organisation.model";

const DataproviderStats = ({ stats,className }: { stats: DataStats, className?: string }) => {
    const {
        datasetsCount = 0,
        favoritesCount = 0,
        viewCount = 0,
        downloadCount = 0,
    } = stats || {};

    return (
        <div className={`w-full ${className}`}>
            <div className="flex flex-row justify-start xl:space-x-10 md:space-x-4 items-center">
                <div className="md:flex flex-col justify-center hidden ">
                    <div className="flex flex-row items-center ">
                        {/* <Image
                            src="/images/provider-detail-page/new_dataset.svg"
                            alt=""
                            height={25}
                            width={30}
                            className="!w-6 !h-5 !min-w-0 !min-h-0"
                        /> */}
                        <span className=" font-normal font-roboto leading-normal text-base">
                            {datasetsCount}
                        </span>
                    </div>
                    <div className="max-w-24 text-dtech-light-grey3 text-[12px] font-normal ">
                        Datasets
                    </div>
                </div>

                <div className="md:flex flex-col justify-center hidden ">
                    <div className="flex flex-row items-center ">
                        {/* <span className="w-[30px] h-[30px] flex">
                            <BsHeartFill className=" w-6 h-5 text-[#333333] m-auto" />
                        </span> */}
                        <span className=" font-normal text-base">
                            {favoritesCount}
                        </span>
                    </div>
                    <div className="max-w-24 text-[12px] font-normal text-dtech-light-grey3">
                        Likes
                    </div>
                </div>

                <div className="md:flex flex-col justify-center hidden ">
                    <div className="flex flex-row items-center ">
                        {/* <span className="w-[30px] h-[30px] flex">
                            <BsEyeFill className=" w-6 h-6 text-[#333333] m-auto" />
                        </span> */}
                        <span className=" font-normal text-base">
                            {viewCount}
                        </span>
                    </div>
                    <div className="max-w-24 text-[12px] font-normal text-dtech-light-grey3">
                        Views
                    </div>
                </div>

                <div className="md:flex flex-col justify-center hidden ">
                    <div className="flex flex-row items-center ">
                        {/* <Image
                            src="/images/provider-detail-page/new_download.svg"
                            alt=""
                            height={30}
                            width={30}
                            className="!w-6 !h-5 !min-w-0 !min-h-0"
                        /> */}
                        <span className=" font-normal text-base">
                            {downloadCount}
                        </span>
                    </div>
                    <div className="max-w-24 text-[12px] font-normal text-dtech-light-grey3">
                        Downloads
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataproviderStats;