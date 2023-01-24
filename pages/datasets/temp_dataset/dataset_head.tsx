import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import DatasetStat from "components/UI/result_card/data_stat";
import { useContext } from "react";
import { DateTime } from "luxon";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import Dataset from "pages/search/components/dataset";
import LabelledRow from "components/dataset/labelled_row";

const DatasetHead = () => {
    const vm = useContext(DatasetDetailVMContext);
    if (!vm.dataset) {
        return <div />;
    }
    console.log("vm", vm);
    let contactOwnerEmail = vm.dataset?.owner.contact.email;
    if ((contactOwnerEmail?.search(/^mailto:/) ?? -1) > -1) {
        contactOwnerEmail = contactOwnerEmail?.slice(7);
    }
    console.log("Dataset :", vm.dataset);
    const { name, description, lastUpdate,downloads,views,favourites,displays } = vm.dataset.detail || {};
    const stats = {
        datasetsCount: displays,
        favoritesCount: favourites,
        viewCount: views,
        downloadCount: downloads,
    };
    return (
        <div className="px-4">
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <div className="text-dtech-dark-grey text-lg font-semibold">
                        {name}
                    </div>
                    <div className="flex justify-between items-center">
                        <MetaRating dataQuality={3} />
                        <button className="ml-8 text-m h-6 px-4 border cursor-pointer rounded border-[#5F5F63]">
                            <span className="my-auto">
                                Open Goverment Licence{" "}
                            </span>
                        </button>
                    </div>
                </div>
                {/* <ResultCardAction
                    data={cardActionData}
                    setData={vm.dataset.setDataset}
                    href={`/datasets/${dataset?.id}`}
                /> */}
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <span className="text-sm w-2/3">{description}</span>
                    <div className="flex flex-col justify-center items-center">
                        <MetaInfoEntity
                            entityName="Domains"
                            entities={["domains"]}
                        />
                        <MetaInfoEntity
                            entityName="Topics"
                            entities={["topics"]}
                        />
                        <MetaInfoEntity
                            entityName="Keywords"
                            entities={["keywords"]}
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <div className="flex justify-between items-center">
                    <DatasetStat stats={stats} />
                    <LabelledRow
                        displayContext="data-host"
                        className=" flex-col justify-center items-center"
                        label="Data Host"
                    >
                        <strong>
                            <a
                                href={vm.dataset.detail.hostUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs underline"
                            >
                                {vm.dataset.detail.hostName}
                            </a>
                        </strong>
                    </LabelledRow>
                    <LabelledRow
                        className=" flex-col justify-center items-center"
                        label="Data Owner"
                    >
                        {vm.dataset.owner.organisation}
                    </LabelledRow>
                    <div>
                        <span className="text-sm text-dtech-dark-grey">
                            Updated:{" "}
                        </span>
                        <span className="text-sm font-medium text-dtech-dark-grey">
                            {DateTime.fromISO(`${lastUpdate}`).toFormat(
                                "dd MMM yyyy"
                            )}
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
    entities: string[] | undefined;
}) => {
    return (
        <div className="flex mr-8">
            {entities && entities.length > 0 && (
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

export default DatasetHead;
