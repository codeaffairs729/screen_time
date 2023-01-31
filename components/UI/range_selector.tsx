import { useEffect, useState } from "react";
import CalendarSelect from "components/UI/calendar_select";
const RangeSelector = ({ fromDate, setFromDate, toDate, setToDate }: any) => {
    return (
        <>
            <CalendarSelect
                label={"From"}
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
            />
            <CalendarSelect
                label={"To"}
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
            />
        </>
    );
};
export default RangeSelector;
