import clsx from "clsx";
import FilterFileType from "./components/filters/filter_file_type";
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

const Sidebar = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={clsx("border-0 rounded overflow-hidden mx-3", className)}
    >
      <div className=" text-black text-lg font-medium pr-2 py-0.5 rounded overflow-hidden">
        Filters
      </div>
      <FilterUsageRights />
      <FilterDomain />
      <FilterTopic />
      <FilterKeywords />
      <FilterOwner />
      <FilterDataHost />
      <FilterFileType />
      <FilterTimeCoverage />
      <FilterLastUpdate />
      <FilterUpdateFrequency />
      <QualityFilter />
    </div>
  );
};

export default Sidebar;
