import { useContext, useEffect, useState } from "react";
import UseCaseVM, { UseCaseVMContext } from "./usecase.vm";
// import PieChartComponent from "../download_section/pie_component";
import Loader from "components/UI/loader";
import dynamic from "next/dynamic";

import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";

import { useIsMobile } from "common/hooks";
// import PieChartComponent from "pages/organisation/components/insights_section/download_section/pie_component";
import Table from "pages/organisation/components/table";
import UpgradeAccountModal from "pages/organisation/components/upgrade_modal";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";
const PieChartComponent = dynamic(
    () =>
        import(
            "pages/organisation/components/insights_section/download_section/pie_component"
        ),
    {
        ssr: false,
    }
);
export const PIE_HEADER = ["Use case", "value"];
const UseCaseSection = () => {
    const { permittedPermissions } = useContext(TopicDetailVMContext);
    const useCaseMetricVM = UseCaseVM();
    const { isMobile } = useIsMobile();

    useEffect(() => {
        useCaseMetricVM?.fetchUseCases && useCaseMetricVM.fetchUseCases();
    }, []);

    if (useCaseMetricVM.isFetchingUseCases) {
        return (
            <div className=" flex items-center justify-center min-h-[400px]">
                <Loader />
            </div>
        );
    }
    if (!useCaseMetricVM.useCases.length) {
        return (
            <div className=" flex flex-col-reverse sm:flex-col sm:mx-40 sm:mt-8 items-center justify-center">
                <div>
                    <img src="/images/no_data_logo.svg" width={250} />
                </div>
                <div className=" sm:my-10 text-[#727272] text-center text-xl sm:text-2xl">
                    Oops! No data available.
                </div>
            </div>
        );
    }
    const pieData = sortAndAggregate(useCaseMetricVM.useCases).map(
        (data: any) => [
            data.category.charAt(0).toUpperCase() + data.category.slice(1),
            data.value,
        ]
    );

    return (
        <div>
            <div className=" text- text-[#727272] sm:text-sm text-xs text-center my-6 sm:my-10">
                {isMobile
                    ? "Dataset downloads aggregated on the basis of user role for the whole organisation"
                    : "Use cases of datasets gathered from user feedback aggregated on the data provider level."}
                .
            </div>
            <div className=" relative">
                <div className="flex flex-col items-center justify-center">
                    <div className=" sm:ml-[50%] w-full">
                        <PieChartComponent
                            isMobile={isMobile}
                            chartData={sortAndAggregate(
                                useCaseMetricVM.useCases
                            )}
                        />
                    </div>
                    <div className=" items-center flex justify-center">
                        <Table
                            tableHeaders={PIE_HEADER}
                            tableData={pieData}
                            headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                            tableClass=" text-sm border-white w-full sm:w-1/3 !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                            cellPadding={20}
                            showDots={false}
                            tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                        />
                    </div>
                </div>
                {!permittedPermissions.includes(
                    "topicInsights.useCases.view"
                ) && (
                    <div className=" absolute top-0 left-0 w-full h-full">
                        <div className="h-full">
                            <UpgradeAccountModal />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UseCaseSection;

export function sortAndAggregate(categories: any) {
    const sortedCategories = categories
        .slice()
        .sort((a: any, b: any) => b.value - a.value);

    if (sortedCategories.length > 10) {
        const otherCategories = sortedCategories.slice(9);
        const aggregatedValue = otherCategories.reduce(
            (sum: any, category: any) => sum + category.value,
            0
        );
        sortedCategories[9] = { category: "others", value: aggregatedValue };
        return sortedCategories.slice(0, 10);
    }

    return sortedCategories;
}
