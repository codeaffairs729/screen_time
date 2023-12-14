import RangeSelector from "components/UI/range_selector";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import React, { useContext, useEffect, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { ReportVMContext } from "./report.vm";
import { QualityMetricVMContext } from "../insights_section/quality_insights/quality_metric.vm"; 
const ReportFilter = ({setIsReportGenerated}: {setIsReportGenerated:Function}) => {
    const [showFilter, setShowFilter] = useState<boolean>(true);
    const {
        fetchData,
        activeHeaders,
        onHeaderSelect,
        editorState,
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        editorValue
    } = useContext(ReportVMContext);
    const { insight_datasetQuality_description,insight_searchTerm_description,insight_useCase_description} = useContext(OrganisationDetailVMContext);
    // const {
    //     qualityMetrics,
    //     fetchQualityMetrics,
    //     isFetchingQualityMetrics,
    //     error,
    //     selectedQualityInsights: selectedLabel,
    // } = useContext(QualityMetricVMContext);

    const handleGenerateReport = () => {
        const alert = "This will remove your previous Data";
        if (
            !editorValue ||
            confirm(alert) == true
        ) {
        // fetchQualityMetrics && fetchQualityMetrics();
        const repostHeardingDescription = {
            insight_datasetQuality_description,
            insight_searchTerm_description,
            insight_useCase_description
        }
            fetchData(activeHeaders,repostHeardingDescription);
            setIsReportGenerated(true);
        }
    };

    return (
        <div className="sm:w-1/3 w-full py-4 sm:m-12 flex flex-col items-center justify-center sm:items-start  sm:mt-12  sm:mb-96  ">
            
            {/* <div className="px-4"> */}
                {/* <div className="px-3 w-[244px] py-1 mb-4 flex justify-between bg-dtech-main-light cursor-pointer"> */}
                    <span className=" w-full sm:text-left text-center font-semibold">Select period</span>
                {/* </div> */}
            {/* </div> */}
            <div className=" sm:w-full w-3/4">
                <RangeSelector
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div className="sm:mt-16 mt-4">
                {/* <div
                    className="px-3 w-[244px] py-1 flex justify-between bg-dtech-main-light cursor-pointer"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <span>Select header</span>
                    <VscTriangleDown
                        className={`ml-2 text-2xl text-inherit transition-all ${showFilter && "rotate-180"
                            }`}
                    />
                </div> */}
                <span className=" w-full text-center flex sm:justify-start justify-center font-semibold sm:mb-8">Select header</span>
                <div
                    className={` w-fit max-h-[100vh] overflow-hidden transition-all duration-300 my-4`}
                >
                    {activeHeaders.map((header: any, index: number) => (
                        <Input
                            key={index}
                            label={header.label}
                            isChecked={header.isChecked}
                            handleCheck={onHeaderSelect}
                            value={header.label}
                        />
                    ))}
                    <button
                        onClick={handleGenerateReport}
                        data-selector="back-btn"
                        className="text-sm mt-8 p-2 py-3 whitespace-nowrap w-full bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white flex items-center justify-center rounded-full px-6"
                    >
                            Autogenerate report
                    </button>
                </div>
            </div>
            
        </div>
    );
};

const Input = ({
    label,
    isChecked,
    handleCheck,
    value,
}: {
    label: string;
    isChecked: boolean;
    handleCheck: any;
    value: string;
}) => {
    return (
        <div className="flex items-center mb-1.5">
            <input
                type="checkbox"
                className="focus:ring-0 filter-checkbox  border-2"
                value={value}
                checked={isChecked}
                onChange={handleCheck}
            />
            <span className="ml-2 text-sm font-semibold">{label}</span>
        </div>
    );
};

export default React.memo(ReportFilter);
