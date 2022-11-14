import {
    FilterOptionItem,
    useSearchFilter,
    Filter,
    SearchVMContext,
} from "pages/search/search.vm";
import { useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterTimeCoverage = () => {
    const { setActiveFilter, activeFilter } = useContext(SearchVMContext);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        setActiveFilter((state: Filter) => ({
            ...state,
            start_date: startDate ? [startDate] : [],
            end_date: endDate ? [endDate] : [],
        }));
    }, [startDate, endDate]);

    return (
        <FilterSection label="Time Coverage" disable={true}>
            <div className="flex flex-col justify-center items-end">
                <div className="flex items-center mb-1.5">
                    <span className="mx-2 text-xs text-gray-700">From</span>
                    <input
                        placeholder="test"
                        type="date"
                        className="text-xs h-6 w-[120px] rounded border-y border-x-4 border-dtech-primary-light"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="flex items-center mb-1.5">
                    <span className="mx-2 text-xs text-gray-700">to</span>
                    <input
                        type="date"
                        className="text-xs h-6 w-[120px] rounded border-y border-x-4 border-dtech-primary-light"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
        </FilterSection>
    );
};

export default FilterTimeCoverage;
