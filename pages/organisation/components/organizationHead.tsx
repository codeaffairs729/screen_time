import MetaRating from "components/UI/metaRating";
import DatasetAction from "components/UI/dataset_action";
import Image from "next/image";
import { BsHeartFill, BsFillEyeFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
const OrganisationHead = () => {
    const title = "NatureScot Data Services";
    const description =
        "NatureScot collects data and information on many aspects of Scotland’s environment. Their online data services let people access this knowledge easily.";
    const dataQuality = 3;
    const imgUrl = "";
    const domains = ["Health and care"];
    const topics = ["Diseases"];
    const keywords = ["Survey"];

    return (
        <div className="px-4">
            <div className="flex justify-between items-center">
                <div className="text-dtech-dark-grey text-lg font-semibold">
                    {title}
                </div>
                <div className="flex justify-between items-center">
                    <MetaRating dataQuality={dataQuality} />
                    <button className="ml-8 text-m w-[105px] border cursor-pointer rounded border-[#5F5F63]">
                        Open
                    </button>
                </div>
                <DatasetAction
                    dataset={{ id: 1 }}
                    // onFavorite={() => {}}
                    // handleBookmark={() => {}}
                    handleShare={() => {}}
                />
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <span className="text-sm w-2/3">{description}</span>
                    <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt=""
                        className="h-[100px] w-[140px]"
                    />
                </div>
                <div className="flex justify-start items-end">
                    <MetaInfoEntity entityName="Domains" entities={domains} />
                    <MetaInfoEntity entityName="Topics" entities={topics} />
                    <MetaInfoEntity entityName="Keywords" entities={keywords} />
                </div>
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="flex justify-center items-center mr-6">
                            <BsHeartFill className="h-[20px] w-[20px] mr-2" />
                            <span className=" max-w-[100px] text-m">
                                Added to favourites
                            </span>
                            <span>253</span>
                        </div>
                        <div className="flex justify-center items-center mr-6">
                            <BsFillEyeFill className="h-[20px] w-[20px] mr-2" />
                            <span className="max-w-[100px] text-m">Viewed</span>
                            <span className="ml-2">3233</span>
                        </div>
                        <div className="flex justify-center items-center mr-6">
                            <MdFileDownload className="h-[20px] w-[20px] mr-2" />
                            <span className="max-w-[100px] text-m">
                                Downloaded
                            </span>
                            <span className="ml-2">453</span>
                        </div>
                        <div className="flex justify-center items-center mr-6">
                            <Image
                                src="/public/images/icons/fileEye.svg"
                                height={20}
                                width={20}
                            />
                            <span className="max-w-[100px] text-m">
                                Displayed in search results
                            </span>
                            <span>453</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-dtech-dark-grey">
                            Updated:{" "}
                        </span>
                        <span className="text-sm font-medium text-dtech-dark-grey">
                            11 July 2021
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetaInfoEntity = ({
    entityName,
    entities,
}: {
    entityName: string;
    entities: string[];
}) => {
    return (
        <div className="flex mr-8">
            {entities.length > 0 && (
                <div>
                    <span className="text-sm font-medium text-dtech-dark-grey mr-4">
                        {entityName}:{" "}
                    </span>
                    {entities.map((entity, index) => (
                        <span
                            key={index}
                            className="text-sm text-dtech-dark-grey"
                        >
                            #{entity}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrganisationHead;
