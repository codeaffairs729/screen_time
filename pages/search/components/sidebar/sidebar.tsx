import clsx from "clsx";
import { ReactNode, useContext } from "react";
import { SearchVMContext } from "../../search.vm";
import FilterCheckboxField from "./components/filter_checkbox_field";
import FilterSection from "./components/filter_section";
import QualityFilter from "./components/quality_filter";
import TopicFilter from "./components/topic_filter";

const Sidebar = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "bg-gray-50 border rounded overflow-hidden mx-3",
        className
      )}
    >
      <div className="bg-dtech-primary-light text-white text-sm font-medium px-2 py-0.5 rounded overflow-hidden">
        Filters
      </div>
      <FilterSection label="File type">
        <FilterCheckboxField label="CSV" />
        <FilterCheckboxField label="PDF" />
      </FilterSection>
      <FilterSection label="Owner">
        <FilterCheckboxField label="NHS" />
        <FilterCheckboxField label="ONS" />
      </FilterSection>
      <FilterSection label="License">
        <FilterCheckboxField label="Open" />
        <FilterCheckboxField label="OGL" />
        <FilterCheckboxField label="Closed" />
      </FilterSection>
      <QualityFilter />
      <TopicFilter />
    </div>
  );
};

export default Sidebar;
