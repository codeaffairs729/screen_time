import RangeSelector from "components/UI/range_selector";
import { useContext, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { ReportVMContext } from "./report.vm";

const ReportFilter = ({ imgUrl }: { imgUrl: string }) => {
    const [showFilter, setShowFilter] = useState<boolean>(true);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const { generateReportContent, activeHeaders, onHeaderSelect } =
        useContext(ReportVMContext);

    const handleGenerateReport = () =>
        generateReportContent(imgUrl, fromDate, toDate);

    return (
        <div className="w-1/3 py-4 px-6 flex flex-col items-center mt-12 ml-6 mb-96 border-2 drop-shadow-lg rounded-[24px]">
            <div className="px-2">
                <div
                    className="px-3 w-[244px] py-1 flex justify-between bg-dtech-main-light cursor-pointer"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <span>Select header</span>
                    <VscTriangleDown
                        className={`ml-2 text-2xl text-inherit transition-all ${
                            showFilter && "rotate-180"
                        }`}
                    />
                </div>
                <div
                    className={`${
                        showFilter ? "max-h-[100vh]" : "max-h-0"
                    } overflow-hidden transition-all duration-300 m-3`}
                >
                    {activeHeaders.map((header: any) => (
                        <Input
                            label={header.label}
                            isChecked={header.isChecked}
                            handleCheck={onHeaderSelect}
                            value={header.label}
                        />
                    ))}
                </div>
            </div>
            <div className="px-4">
                <div className="px-3 w-[244px] py-1 mb-4 flex justify-between bg-dtech-main-light cursor-pointer">
                    <span>Select period</span>
                </div>
            </div>
            <div className="flex justify-around items-center mb-6 ">
                <RangeSelector
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <button
                onClick={handleGenerateReport}
                data-selector="back-btn"
                className="m-1 whitespace-nowrap bg-dtech-main-dark h-8 flex items-center justify-center rounded"
            >
                <span className="ml-1 mr-2 font-medium text-white px-12">
                    Autogenerate report
                </span>
            </button>
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
                className="focus:ring-0 filter-checkbox rounded-sm border-dtech-main-dark"
                value={value}
                checked={isChecked}
                onChange={handleCheck}
            />
            <span className="ml-2 text-sm text-gray-700">{label}</span>
        </div>
    );
};

export default ReportFilter;
