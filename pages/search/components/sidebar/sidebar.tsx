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
import { useContext, useLayoutEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = ({ className = "" }: { className?: string }) => {
    const vm = useContext(SearchVMContext);

    const { showMobileSidebar, setShowMobileSidebar } = vm;

    useLayoutEffect(() => {
        window.addEventListener("resize", () => {});
    }, []);

    return (
        <>
            <div
                className={clsx(
                    "absolute top-[1.25rem] flex justify-center item-center text-lg font-semibold text-dtech-new-main-light text-left  space-x-2  md:hidden border-2 border-dtech-new-main-light rounded-full shadow bg-white mx-4 px-4 py-2 z-10"
                )}
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            >
                Filters
                {/* {showMobileSidebar ? (
                    <MdMenuOpen className="w-5 h-5 ml-1" />
                ) : (
                    <MdMenu className="w-5 h-5 ml-1 " />
                )} */}
                <IoFilterSharp className="mt-1 ml-2" />
            </div>

            <div
                className={clsx(
                    "z-10 absolute top-[1.25rem] right-2 flex justify-center item-center text-lg font-semibold text-dtech-new-main-light  text-left  space-x-2  md:hidden border-2 border-dtech-new-main-light rounded-full shadow bg-white mx-4 px-4 py-2 ",
                    { hidden: !showMobileSidebar }
                )}
                onClick={() => vm.resetAllFilters()}
            >
                Clear all
                <AiOutlineClose className="mt-1 ml-2" />
            </div>
            <div
                className={clsx(
                    "border-0 rounded overflow-hidden md:mx-3 w-full md:w-1/4 md:top-7 top-16 absolute md:relative md:bg-transparent bg-white  z-10 md:left-0 shadow-lg md:shadow-none mt-1",
                    { "-left-full": !showMobileSidebar },
                    // { "block": !showMobileSidebar },
                    className
                )}
            >
                <div className="flex justify-between  text-sm font-normal pr-2 py-1.5 overflow-hidden my-2 mt-4 z-10 bg-[#6DCDCB]">
                    <span className=" mx-3 md:mx-3 ">Filters</span>
                    {/* <div className=" hidden md:block">
                        <div
                            onClick={() => vm.resetAllFilters()}
                            className={`${
                                vm.isFilterActive && !vm.isLoading
                                    ? "text-grey-700 hover:text-dtech-secondary-dark cursor-pointer"
                                    : "text-gray-300 cursor-not-allowed"
                            } flex justify-center items-center`}
                        >
                            <span className="text-[10px] text-inherit">
                                Clear
                            </span>
                            <FaFilter className="w-2 h-2 ml-1 text-inherit" />
                        </div>
                    </div> */}
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
                <div className="md:hidden">
                    {/* <div className="flex flex-row justify-between items-center mx-3 my-4">
                        <div
                            className="text-lg font-normal text-dtech-new-main-light  text-left border-2 border-dtech-new-main-light rounded-full shadow px-4 py-1.5 "
                            onClick={() =>
                                setActiveFilter({ ...vm.mobileFilter })
                            }
                        >
                            Apply
                        </div>
                        <div
                            className="text-lg font-normal text-dtech-new-main-light  text-left border-2 border-dtech-new-main-light rounded-full shadow px-4 py-1.5 "
                            onClick={() => setShowMobileSidebar(false)}
                        >
                            Close
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
