import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

const ReportFilter = () => {
    const [showFilter, setShowFilter] = useState<boolean>(false);
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
                    <div className="flex items-center mb-1.5">
                        <input
                            type="checkbox"
                            className="focus:ring-0 filter-checkbox rounded-sm border-dtech-main-dark"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Insights
                        </span>
                    </div>
                    <div className="flex items-center mb-1.5">
                        <input
                            type="checkbox"
                            className="focus:ring-0 filter-checkbox rounded-sm border-dtech-main-dark"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Dataset quality
                        </span>
                    </div>
                    <div className="flex items-center mb-1.5">
                        <input
                            type="checkbox"
                            className="focus:ring-0 filter-checkbox rounded-sm border-dtech-main-dark"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            User feedback
                        </span>
                    </div>
                </div>
            </div>
            <button
                onClick={() => {}}
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

export default ReportFilter;
