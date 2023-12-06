import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import DatasetStat from "components/UI/result_card/data_stat";
import { useContext, useEffect, useRef, useState } from "react";
import { OrganisationDetailVMContext } from "../organisation_detail.vm";
import { organisationToResultCardData } from "pages/search/organisation/organisation.vm";
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
        <div className="flex flex-col sm:flex-row">
            <div className="sm:px-10 sm:py-4 px-4  sm:w-3/4 sm:min-w-[75%]">

                {/* <div className="flex }items-center"> */}
                <div className="flex justify-between items-center">
                    <div className=" text-dtech-new-main-light text-xl pb-4 font-semibold">
                        {title}
                    </div>
                    <div className="sm:flex hidden justify-between items-center">
                        <MetaRating
                            className="text-dtech-new-main-light !flex-row items-center"
                            infoClassName="!text-dtech-new-main-light top-0 m-[1px] ml-[5px]"
                            starClassName="!text-dtech-new-main-light"
                            dataQuality={dataQuality}
                            title="Estimated based on the European Commission's Metadata Quality Assessment method."
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

                {/* </div> */}
                <div className="sm:hidden flex flex-col bg-[#EBEBEB] p-2">
                    <MetaRating
                        className=" !flex-row justify-between"
                        infoClassName="text-dtech-new-main-light top-0 m-[1px] ml-[4px]"
                        starClassName="text-dtech-new-main-light"
                        dataQuality={dataQuality}
                        title="Estimated based on the European Commission's Metadata Quality Assessment method."
                    />
                    <div>
                        <span className="text-sm text-[#333333] ">
                            Last Updated:{" "}
                        </span>
                        <span className="text-sm font-normal  text-[#727272]">
                            {DateTime.fromISO(`${lastUpdate}`).toFormat(
                                "dd MMM yyyy"
                            )}
                        </span>
                    </div>

                </div>
                <div className="my-4">
                    <div className="flex justify-between">
                        <span className="text-sm text-[#727272]">{description}</span>
                        {/* Add Website Url */}

                    </div>
                    <div className="my-4 bg-[#EBEBEB]">
                        <div className="flex w-full">
                            <DatasetStat stats={stats} />

                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-start items-start my-3">
                        <MetaInfoEntity entityName="Domains" entities={domains} />
                        <MetaInfoEntity entityName="Topics" entities={topics} />
                    </div>
                </div>

                <div className=" sm:block hidden">
                    <span className="text-sm text-[#333333]">
                        Last Updated:{" "}
                    </span>
                    <span className="text-sm font-medium opacity-70 text-[#727272]">
                        {DateTime.fromISO(`${lastUpdate}`).toFormat(
                            "dd MMM yyyy"
                        )}
                    </span>
                </div>
            </div>
            <div className=" bg-[#2D2D32] bg-opacity-10 sm:w-1 h-[1px] sm:h-auto sm:my-4 mx-4 mb-4 sm:mx-0 sm:mb-0"> </div>
            <ResultCardAction
                className="flex-row sm:flex-col items-center justify-center sm:py-8 w-full"
                data={cardActionData}
                setData={setOrganisation}
                href={`/organisation/${organisation?.uuid}`}
            />
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
    const [viewAll, setViewAll] = useState<boolean>(false)
    const handleSearchFocus = () => {
        setViewAll(true);
    };

    const handleSearchBlur = () => {
        setViewAll(false);
    };
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setViewAll(viewAll);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    return (
        <div className="flex mr-8 w-full "
            ref={myRef}
        >
            {entities && entities.length > 0 && (
                // <div className="flex flex-row space-x-2  w-full ">
                <div className="flex w-full items-center sm:justify-start justify-between">
                    <div className=" min-w-max">
                        <span className="sm:text-sm text-md font-normal m-1 text-[#333333] ">
                            {entityName}
                        </span>
                        <span
                            onClick={() => setViewAll(!viewAll)}
                            className=" underline sm:text-sm text-md cursor-pointer text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black">
                            View all
                        </span>
                    </div>
                    <div className="flex flex-wrap flex-row  max-w-xs ml-2 ">
                        {entities.map((entity, index) => {
                            if (index < 2) return (
                                <span
                                    key={index}
                                    className="sm:text-sm text-md text-white m-1 bg-dtech-new-main-light rounded p-1 px-2 !pt-0"
                                >
                                    {entity}
                                </span>
                            )
                        })}
                    </div>
                    {<div onClick={handleSearchBlur}
                        className={viewAll ? ` bg-black fixed opacity-50 h-[3000px] top-0 left-0 right-0 bottom-0 sm:h-[3000px]  w-screen flex items-center  z-20` : "hidden"}></div>}
                    {viewAll && <div className="flex flex-wrap flex-row px-6 py-4 sm:w-[616px] w-xs bg-white absolute z-20 rounded-xl border-[2px] border-[#6DCDCB]">
                        <div className="flex justify-between w-full pb-4"><div>{entityName}</div><div className=" cursor-pointer" onClick={() => setViewAll(!viewAll)}><img src="/images/provider-detail-page/close.svg" /></div></div>
                        {entities.map((entity, index) => {
                            return (
                                <span
                                    key={index}
                                    className="text-sm text-white m-1 bg-dtech-new-main-light rounded p-1 px-2 !pt-0"
                                >
                                    {entity}
                                </span>
                            )
                        })}
                    </div>}
                </div>
                // </div>
            )}
        </div>
    );
};

export default OrganisationHead;
