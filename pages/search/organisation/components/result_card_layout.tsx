import clsx from "clsx";
import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import ResultCard, { Data } from "components/UI/result_card";
import DataStats from "components/UI/result_card/data_stat";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NoResults from "pages/search/components/no_results";
import { Fragment, useContext, useState } from "react";
import { BsChevronDown, BsEyeFill, BsHeartFill } from "react-icons/bs";
import DataproviderStats from "./data_provider_stats";
import DataProviderCard from "components/UI/dataprovider_result_card";
import { OrganizationSearchVMContext } from "../organisation.vm";

type ResultLayoutProps = {
    error: any;
    isLoading: boolean;
    recordsData: Data[];
    className?: string;
};

const ResultLayoutCard = ({
    error,
    isLoading,
    recordsData,
    className = "",
}: ResultLayoutProps) => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const vm = useContext(OrganizationSearchVMContext);
    const { isMobile } = vm;

    if (error) {
        return (
            <div className="w-full flex items-start justify-center mt-20 md:mt-0">
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching data. Please try again later."
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!recordsData?.length) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))] w-full flex items-start justify-center mt-20 md:mt-0">
                <NoResults
                    message={`No results found for ${q}.`}
                    subMessages={[
                        "Try different keywords.",
                        "Make sure that all words are spelled correctly.",
                    ]}
                />
            </div>
        );
    }

    return (
        <Fragment>
            {isMobile && (
                <div className=" font-roboto text-[#333333] bg-[#EBEBEB] w-[95%] mx-2 px-3 py-3 rounded-full text-sm font-normal">
                    <span className=" mx-2">Showing 6 out of 6 result</span>
                </div>
            )}
            <div
                className={clsx(
                    "grid grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-16 md:gap-x-24 my-10 md:mx-20 place-items-center",
                    className
                )}
                data-test-id="results table"
            >
                {recordsData.map((data: Data, index: number) => (
                    <DataProviderCard
                        key={`${data.id}_${index}`}
                        data={data}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default ResultLayoutCard;
