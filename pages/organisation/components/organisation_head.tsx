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
        buttonTags,
        url,
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
                            dataQuality={Math.ceil(dataQuality) ?? 0}
                            title="Estimated based on the EU Metadata Quality Assessment method."
                        />
                        {buttonTags?.map((tag: string, index: number) => (
                            <fieldset
                                className=" min-h-full px-4 border rounded border-[#5F5F63]  text-xs pb-0.5"
                                key={index}
                            >
                                <legend className="text-xs mr-8">
                                    Licence
                                </legend>
                                <div>
                                    <label>{`${tag[0].toUpperCase()}${tag.slice(
                                        1
                                    )}`}</label>
                                </div>
                            </fieldset>
                        ))}
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
                    <a href={`${url}`} target="_blank" rel="noreferrer">
                        <img
                            data-tip={"Click to open website"}
                            src={imgUrl}
                            alt=""
                            className="h-[100px] w-[140px]"
                        />
                    </a>
                </div>
                <div className="flex justify-start items-start my-3">
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
        <div className="flex mr-8">
            {entities && entities.length > 0 && (
                <div className="flex  flex-row space-x-2 max-w-xs">
                    <div className="flex ">
                        <span className="text-sm font-medium m-1 text-dtech-dark-grey ">
                            {entityName}
                        </span>
                        <div className="flex flex-wrap flex-row  max-w-xs ">
                        {entities.map((entity, index) => (
                            <span
                                key={index}
                                className="text-sm text-white m-1 bg-[#5F5F63] mb-2 rounded p-1 px-2 !pt-0"
                            >
                                {entity}
                            </span>
                        ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganisationHead;
