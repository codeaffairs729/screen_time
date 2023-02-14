import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import DatasetStat from "components/UI/result_card/data_stat";
import { useContext } from "react";
import { OrganisationDetailVMContext } from "../organisation_detail.vm";
import { organisationToResultCardData } from "pages/search/components/organization/organisation.vm";
import { DateTime } from "luxon";

const OrganisationHead = () => {
    const { organisation, setOrganisation } = useContext(
        OrganisationDetailVMContext
    );

    if (!organisation) {
        return null;
    }

    const {
        title,
        dataQuality,
        description,
        imgUrl,
        domains,
        topics,
        stats,
        lastUpdate,
    } = organisation || {};

    const cardActionData = organisationToResultCardData([organisation])[0];

    return (
        <div className="px-4">
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <div className="text-dtech-dark-grey text-lg font-semibold">
                        {title}
                    </div>
                    <div className="flex justify-between items-center">
                        <MetaRating
                            dataQuality={dataQuality ?? 0}
                            title="Estimated based on the EU Metadata Quality Assessment method."
                        />
                        <button className="ml-8 text-m h-6 px-4 border cursor-pointer rounded border-[#5F5F63]">
                            <span className="my-auto">Open</span>
                        </button>
                    </div>
                </div>
                <ResultCardAction
                    data={cardActionData}
                    setData={setOrganisation}
                    href={`/organisations/${organisation?.uuid}`}
                />
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <span className="text-sm w-2/3">{description}</span>
                    {/* Add Website Url */}
                    <a href="#" target="_blank">
                        <img
                            data-tip={"Click to open website"}
                            src={imgUrl}
                            alt=""
                            className="h-[100px] w-[140px]"
                        />
                    </a>
                </div>
                <div className="flex justify-start items-end my-3">
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
        <div className="flex mr-10">
            {entities && entities.length > 0 && (
                <div className="flex flex-wrap">
                    <span className="text-sm font-medium text-dtech-dark-grey mr-4">
                        {entityName}:{" "}
                    </span>
                    {entities.map((entity, index) => (
                        <span
                            key={index}
                            className="text-sm text-dtech-dark-grey p-1.5 !pt-0"
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
