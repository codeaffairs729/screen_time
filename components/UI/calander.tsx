import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Calander = ({
    startDate,
    handleChange,
    setDateSelect,
}: {
    startDate: Date;
    handleChange: any;
    setDateSelect: any;
}) => {
    return (
        <div
            className="z-10 absolute mt-10 ml-[-140px]"
            onClick={() => {
                setDateSelect(true);
            }}
        >
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                calendarClassName="!border !border-red"
                // formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
                inline
            />
        </div>
    );
};
export default Calander;
