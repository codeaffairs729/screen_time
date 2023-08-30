import { useEffect, useState } from "react";
import CalendarSelect from "components/UI/calendar_select";
const RangeSelector = ({ fromDate, setFromDate, toDate, setToDate }: any) => {
    return (
        <>
            <div className="flex flex-col">
                <div className=" text-sm font-semibold my-2">
                    From
                </div>
                <CalendarSelect
                    label={"From"}
                    fromDate={fromDate}
                    toDate={toDate}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                />
                <div className=" text-sm font-semibold my-2">
                    To
                </div>
                <CalendarSelect
                    label={"To"}
                    fromDate={fromDate}
                    toDate={toDate}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                />
            </div>
        </>
    );
};
export default RangeSelector;
