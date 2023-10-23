import Link from "next/link";
import { Data } from "..";
import MetaRating from "components/UI/metaRating";
import { useRouter } from "next/router";
import LabelledRow from "components/dataset/labelled_row";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useIsMobile } from "common/hooks";

const DataProviderCardHead = ({
    data,
    setData,
    handleFAQClick,
    datasetSource,
    showToolTip = true,
    cardClicked,
    cardHover,
}: {
    data: any;
    setData: Function;
    handleFAQClick?: Function;
    datasetSource: string | undefined;
    showToolTip: boolean;
    cardClicked: boolean;
    cardHover: boolean;
}) => {
    const {
        title,
        dataQuality,
        licenseTypes,
        lastUpdate,
        recordType /*favourite, bookmark*/,
    } = data;
    const href = `/${recordType ? recordType : "datasets"}/${data.id}`;
    const router = useRouter();
    const { isMobile} = useIsMobile();

    return (
        <>
            {!isMobile ? (
                <div className="flex justify-between">
                    <div className="lg:flex flex-col w-full mb-3">
                        <div className="flex justify-between items-center">
                            <Link href={href}>
                                <a
                                    className={`${(cardClicked || cardHover) &&"!text-[#28A197]"} font-semibold font-roboto text-md my-3 text-dtech-new-main-light text-[17px] cursor-pointer underline-anim`}
                                >
                                    {title}
                                </a>
                            </Link>

                            <MetaRating
                                dataQuality={dataQuality}
                                displayContext={"displayContext"}
                                labelClass={`font-normal text-[#6E498E] ${(cardClicked || cardHover) &&"!text-[#28A197]"}`}
                                label={"Metadata Quality"}
                                className={`!flex-row items-center !font-medium !text-sm md:my-0 mb-1 md:justify-start justify-between md:mr-3`}
                                infoClassName={`text-dtech-new-main-light top-0 m-[1px] !ml-[5px] !mt-0 ${(cardClicked || cardHover) &&"!text-[#28A197]"}`}
                                starClassName={`!text-dtech-new-main-light ${(cardClicked || cardHover) &&"!text-[#28A197]"}`}
                                title={
                                    "Estimated based on the European Commission's Metadata Quality Assessment method."
                                }
                                handleFAQClick={() => {
                                    handleFAQClick
                                        ? handleFAQClick()
                                        : router.push({
                                              pathname: `/faq`,
                                          });
                                }}
                                showToolTip={true}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between">
                    <div className="lg:flex flex-col w-full mb-3">
                        <div>
                            <Link href={href}>
                                <a className=" font-semibold font-roboto text-md my-3 text-dtech-new-main-light text-[17px] cursor-pointer underline-anim">
                                    {title}
                                </a>
                            </Link>
                        </div>
                        <div
                            className={`my-3 flex flex-col md:flex-row justify-between md:items-center bg-[#EBEBEB] px-1.5   ${
                                router.pathname != "/datasets/[id]"
                                    ? "md:py-3"
                                    : "p-1.5 lg:items-center "
                            }`}
                        >
                            <MetaRating
                                dataQuality={dataQuality}
                                displayContext={"displayContext"}
                                labelClass={`font-normal text-[#6E498E] ${(cardClicked || cardHover) &&"!text-[#28A197]"}`}
                                label={"Metadata Quality"}
                                className="!flex-row items-center !font-medium !text-sm md:my-0 mb-1 md:justify-start justify-between"
                                infoClassName={`text-dtech-new-main-light top-0 m-[1px] !ml-[5px] !mt-0 ${(cardClicked || cardHover) &&"!text-[#28A197]"}`}
                                starClassName={`!text-dtech-new-main-light ${(cardClicked || cardHover) &&"!text-[#28A197]"}`}
                                title={
                                    "Estimated based on the European Commission's Metadata Quality Assessment method."
                                }
                                handleFAQClick={() => {
                                    handleFAQClick
                                        ? handleFAQClick()
                                        : router.push({
                                              pathname: `/faq`,
                                          });
                                }}
                                showToolTip={showToolTip}
                            />
                            {DateTime.fromISO(lastUpdate)?.isValid && (
                                <LabelledRow
                                    className={` ${
                                        router.pathname != "/datasets/[id]"
                                            ? "!mr-10"
                                            : "mr-1"
                                    }`}
                                    label="Last updated"
                                    labelClasses="!text-sm mr-1  font-normal text-[#333333]"
                                    childClasses="text-[#727272]"
                                >
                                    <span className="text-sm">
                                        {DateTime.fromISO(
                                            lastUpdate
                                        ).toRelative()}
                                    </span>
                                </LabelledRow>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataProviderCardHead;
