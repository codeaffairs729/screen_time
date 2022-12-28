import Image from "next/image";
import { BsFillEyeFill, BsHeartFill} from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";

const DatasetStat = () => {
    return (
        <div className="my-4">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="flex justify-center items-center mr-6">
                        <Image
                            src="/images/icons/dataset.svg"
                            height={20}
                            width={20}
                        />
                        <span className="max-w-24 text-m font-normal ml-2">Datasets</span>
                        <span className="ml-2 font-medium text-sm">856</span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <BsHeartFill className="h-5 w-5 mr-2" />
                        <span className=" max-w-24 text-m font-normal">
                            Added to favourites
                        </span>
                        <span className="ml-2 font-medium text-sm">253</span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <BsFillEyeFill className="h-5 w-5 mr-2" />
                        <span className="max-w-24 text-m font-normal">Viewed</span>
                        <span className="ml-2 font-medium text-sm">323</span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <MdFileDownload className="h-5 w-5 mr-2" />
                        <span className="max-w-24 text-m font-normal">Downloaded</span>
                        <span className="ml-2 font-medium text-sm">453</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DatasetStat;
