import { DataStats } from "models/organisation.model";
import Image from "next/image";
import { BsFillEyeFill, BsHeartFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";

const DataStats = ({ stats }: { stats: DataStats | undefined }) => {
    const {
        datasetsCount = 0,
        favoritesCount = 0,
        viewCount = 0,
        downloadCount = 0,
    } = stats || {};

    return (
        <div className="my-4">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="flex justify-center items-center mr-6">
                        <Image
                            src="/images/icons/dataset.svg"
                            alt=""
                            height={20}
                            width={20}
                        />
                        <span className="max-w-24 text-m font-normal ml-2">
                            Datasets
                        </span>
                        <span className="ml-2 font-medium text-sm">
                            {datasetsCount}
                        </span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <BsHeartFill className="h-5 w-5 mr-2" />
                        <span className=" max-w-24 text-m font-normal">
                            Added to favourites
                        </span>
                        <span className="ml-2 font-medium text-sm">
                            {favoritesCount}
                        </span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <BsFillEyeFill className="h-5 w-5 mr-2" />
                        <span className="max-w-24 text-m font-normal">
                            Viewed
                        </span>
                        <span className="ml-2 font-medium text-sm">
                            {viewCount}
                        </span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <MdFileDownload className="h-5 w-5 mr-2" />
                        <span className="max-w-24 text-m font-normal">
                            Downloaded
                        </span>
                        <span className="ml-2 font-medium text-sm">
                            {downloadCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DataStats;
