import CalendarSelect from "components/UI/calendar_select";
import RangeSelector from "components/UI/range_selector";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

const ReportFilter = ({
    handleCheck,
    handleAutoGenerate,
    HEADER,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
}: {
    handleCheck: any;
    handleAutoGenerate: any;
    HEADER: any;
    fromDate: any;
    setFromDate: any;
    toDate: any;
    setToDate: any;
}) => {
    const [showFilter, setShowFilter] = useState<boolean>(true);
    return (
        <div className="w-1/3 py-4 px-6 flex flex-col items-center">
            <div className="px-4">
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
                    {HEADER.map((header: any) => (
                        <Input
                            label={header.label}
                            isChecked={header.isChecked}
                            handleCheck={handleCheck}
                            value={header.label}
                        />
                    ))}
                    {/* <Input label="Insights" />
                    <Input label="Dataset quality" />
                    <Input label="User feedback" /> */}
                </div>
            </div>
            <div className="px-4">
                <div className="px-3 w-[244px] py-1 mb-4 flex justify-between bg-dtech-main-light cursor-pointer">
                    <span>Select period</span>
                </div>
                <div className="px-4 flex w-full items-center justify-between mb-6">
                    <RangeSelector
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        toDate={toDate}
                        setToDate={setToDate}
                    />
                </div>
            </div>
            <button
                onClick={handleAutoGenerate}
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
                onClick={handleCheck}
            />
            <span className="ml-2 text-sm text-gray-700">{label}</span>
        </div>
    );
};

export default ReportFilter;
