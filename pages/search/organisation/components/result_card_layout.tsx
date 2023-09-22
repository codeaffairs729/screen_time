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
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
};

const ResultLayoutCard = ({
    error,
    isLoading,
    recordsData,
    className = "",
    currentPage,
    pageSize,
    totalRecords,
    totalPages,
}: ResultLayoutProps) => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const vm = useContext(OrganizationSearchVMContext);
    const { isMobile } = vm;

    const pageResult =
        totalPages == currentPage
            ? totalRecords - pageSize * (currentPage - 1)
            : pageSize;

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
            <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-16 md:gap-x-24 my-10 md:mx-20 place-items-center">
                    {Array(20)
                        .fill(1)
                        .map((_, index) => (
                            <div key={index} className="border border-gray-100 rounded-md md:rounded-xl shadow-custom-3  min-h-[100%] max-w-[90%]  md:max-h-[10%] md:min-w-[100%] p-2 w-[100%]">
                                <div className="border-2  bg-[#EBEBEB]  rounded ">
                                    <div className="border-2 bg-gray-400 bg-opacity-60 animate-pulse rounded py-9 mx-1 my-2 md:py-16 md:my-4 md:mx-4 "></div>
                                </div>
                                <div className="border-2  animate-pulse bg-[#EBEBEB]  md:h-[50px]">
                                <div className="animate-pulse bg-gray-400 bg-opacity-60 rounded-md w-[70%] p-1 md:p-2 mt-5 mb-2 md:mb-1 ml-2 md:ml-4"></div>
                                </div>
                            </div>
                        ))}
                </div>
            </>
        );
    }

    if (!recordsData?.length) {
        return (
            <div className=" flex flex-col justify-center items-center">
                <img src="/images/no_data_logo.svg" width={250} />
                <div>
                    <div className="text-[#727272] text-center text-xl md:text-2xl  my-4">
                        No results found for {q}.
                    </div>
                    <div className="text-[#727272] text-sm md:text-xl">
                        <li>Try different keywords.</li>
                        <li>Make sure that all words are spelled correctly.</li>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            {isMobile && (
                <div className=" font-roboto text-[#333333] bg-[#EBEBEB] w-[95%] mx-2 px-3 py-3 rounded-full text-sm font-normal leading-[16.41px]">
                    <span className=" mx-2">
                        Showing {pageResult} out of {totalRecords} results
                    </span>
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
