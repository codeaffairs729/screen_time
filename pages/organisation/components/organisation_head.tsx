import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import DatasetStat from "components/UI/result_card/dataset_stat";

const OrganisationHead = () => {
    const title = "NatureScot Data Services";
    const description =
        "NatureScot collects data and information on many aspects of Scotland’s environment. Their online data services let people access this knowledge easily.";
    const dataQuality = 3;
    const imgUrl =
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
    const domains = ["Health and care"];
    const topics = ["Diseases"];
    const stats = {
        datasetsCount: 856,
        favoritesCount: 123,
        viewCount: 253,
        downloadCount: 435,
    };
    return (
        <div className="px-4">
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <div className="text-dtech-dark-grey text-lg font-semibold">
                        {title}
                    </div>
                    <div className="flex justify-between items-center">
                        <MetaRating dataQuality={dataQuality} />
                        <button className="ml-8 text-m h-6 px-4 border cursor-pointer rounded border-[#5F5F63]">
                            <span className="my-auto">Open</span>
                        </button>
                    </div>
                </div>
                <ResultCardAction
                    data={{ id: 1 }}
                    setData={() => {}}
                    // onFavorite={() => {}}
                    // handleBookmark={() => {}}
                    // handleShare={() => {}}
                />
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <span className="text-sm w-2/3">{description}</span>
                    <img src={imgUrl} alt="" className="h-[100px] w-[140px]" />
                </div>
                <div className="flex justify-start items-end">
                    <MetaInfoEntity entityName="Domains" entities={domains} />
                    <MetaInfoEntity entityName="Topics" entities={topics} />
                </div>
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <DatasetStat stats={stats} />
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
