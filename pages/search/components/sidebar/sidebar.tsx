import clsx from "clsx";
import FilterFileType from "./components/filters/filter_file_type";
import QualityFilter from "./components/filters/quality_filter";
import TopicFilter from "./components/filters/topic_filter";
import FilterOwner from "./components/filters/filter_owner";
import FilterLicense from "./components/filters/filter_license";
import FilterLastUpdate from "./components/filters/filter_last_update";
import FilterDomain from "./components/filters/filter_domain";
import FilterLocation from "./components/filters/filter_location";

const Sidebar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={clsx("border rounded overflow-hidden mx-3", className)}>
      <div className="bg-dtech-primary-light text-white text-sm font-medium px-2 py-0.5 rounded overflow-hidden">
        Filters
      </div>
      <FilterDomain />
      <FilterLocation />
      <FilterFileType />
      <FilterOwner />
      <FilterLicense />
      <QualityFilter />
      <TopicFilter />
      <FilterLastUpdate />
    </div>
  );
};

export default Sidebar;
