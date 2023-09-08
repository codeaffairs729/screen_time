import { DataStats } from "models/organisation.model";
import Image from "next/image";
import { BsFillEyeFill, BsHeartFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";

const DataStatsSearchPage = ({ stats }: { stats: DataStats | undefined }) => {
    const {
        datasetsCount = 0,
        favoritesCount = 0,
        viewCount = 0,
        downloadCount = 0,
    } = stats || {};

    return (
        <div className="my-4 w-full">
            <div className="flex justify-between w-full">
                <div className="flex justify-evenly w-full">
                    <div className="flex flex-col sm:flex-row justify-evenly w-1/2">
                        <div className="flex justify-center items-center mr-6">
                            <Image
                                src="/images/provider-detail-page/datasets.svg"
                                alt=""
                                height={20}
                                width={20}
                            />
                            <span className="max-w-24 text-m font-normal ml-1">
                                Datasets
                            </span>
                            <span className="ml-2 font-medium text-sm text-[#727272]">
                                {datasetsCount}
                            </span>
                        </div>
                        <div className="flex justify-center -ml-8 sm:ml-8 mt-4 sm:mt-0 items-center mr-6">
                            <Image
                                src="/images/provider-detail-page/like.svg"
                                alt=""
                                height={20}
                                width={20}
                            />
                            <span className=" max-w-24 ml-1 text-m font-normal">
                                Likes
                            </span>
                            <span className="ml-2 font-medium text-sm text-[#727272]">
                                {favoritesCount}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-evenly w-1/2">

                        <div className="flex justify-center items-center mr-6">
                            <Image
                                src="/images/provider-detail-page/download.svg"
                                alt=""
                                height={20}
                                width={20}
                            />
                            <span className="max-w-24 text-m font-normal ml-1">
                                Downloads
                            </span>
                            <span className="ml-2 font-medium text-sm text-[#727272]">
                                {downloadCount}
                            </span>
                        </div>
                        <div className="flex justify-center  -ml-6 sm:ml-6 mt-4 sm:mt-0 items-center mr-6">
                            <Image
                                src="/images/provider-detail-page/views.svg"
                                alt=""
                                height={20}
                                width={20}
                            />
                            <span className="max-w-24 text-m font-normal ml-1">
                                Views
                            </span>
                            <span className="ml-2 font-medium text-sm text-[#727272]">
                                {viewCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DataStatsSearchPage;
