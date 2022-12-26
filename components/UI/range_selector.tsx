import { useEffect, useState } from "react";
import CalendarSelect from "components/UI/calendar_select";
const RangeSelector = ({ fromDate, setFromDate, toDate, setToDate }: any) => {
    // const [fromDate, setFromDate] = useState(new Date());
    // const [toDate, setToDate] = useState(new Date());

    useEffect(() => {}, [fromDate, toDate]);
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
