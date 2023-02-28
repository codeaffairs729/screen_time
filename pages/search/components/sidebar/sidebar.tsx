import clsx from "clsx";
import FilterFileFormats from "./components/filters/filter_file_formats";
import QualityFilter from "./components/filters/quality_filter";
import FilterTopic from "./components/filters/filter_topic";
import FilterOwner from "./components/filters/filter_owner";
import FilterLastUpdate from "./components/filters/filter_last_update";
import FilterDomain from "./components/filters/filter_domain";
import FilterUsageRights from "./components/filters/filter_usage_rights";
import FilterKeywords from "./components/filters/filter_keywords";
import FilterDataHost from "./components/filters/filter_data_host";
import FilterUpdateFrequency from "./components/filters/filter_update_frequency";
import FilterTimeCoverage from "./components/filters/filter_time_coverage";
import { SearchVMContext } from "pages/search/search.vm";
import { useContext } from "react";
import { FaFilter } from "react-icons/fa";

const Sidebar = ({ className = "" }: { className?: string }) => {
    const vm = useContext(SearchVMContext);

    return (
        <div
            className={clsx("border-0 rounded overflow-hidden mx-3 mt-[6.50px] ", className)}
        >
            <div className="flex justify-between text-black text-lg font-medium pr-2 py-0.5 rounded overflow-hidden my-2 mt-4">
                <span>Filters</span>
                <div
                    onClick={() => vm.resetAllFilters()}
                    className={`${
                        vm.isFilterActive && !vm.isLoading
                            ? "text-grey-700 hover:text-dtech-secondary-dark cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                    } flex justify-center items-center`}
                >
                    <span className="text-[10px] text-inherit">Clear</span>
                    <FaFilter className="w-2 h-2 ml-1 text-inherit" />
                </div>
            </div>
            <FilterUsageRights />
            <FilterDomain />
            <FilterTopic />
            <FilterKeywords />
            <FilterOwner />
            <FilterDataHost />
            <FilterFileFormats />
            <FilterTimeCoverage />
            <FilterLastUpdate />
            <FilterUpdateFrequency />
            <QualityFilter />
        </div>
    );
};

export default Sidebar;
