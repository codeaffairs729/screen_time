import { useRef, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

const CalendarSelect = ({ label = "Select" }: { label?: string }) => {
    const [select, setSelected] = useState(false);
    const ref = useRef<any>();
    return (
        <div>
            <div
                className="flex items-center border border-black w-fit px-2 py-1 rounded-md cursor-pointer"
                onClick={() => setSelected(!select)}
            >
                <span className="text-sm">{label}</span>
                <VscTriangleDown
                    className={`${
                        select && "rotate-180"
                    } ml-2 text-xl text-inherit transition-all`}
                />
            </div>
            {/* <input ref={ref} type="date" /> */}
        </div>
    );
};

export default CalendarSelect;
