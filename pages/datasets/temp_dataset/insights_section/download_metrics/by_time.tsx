import RangeSelector from "components/UI/range_selector";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";

const ByTime = () => {
    const  {fromDate,toDate,setFromDate,setToDate} = useContext(DatasetDetailVMContext)
    return (
        <div className="flex flex-row mx-20">
            <span>Please select your time frame:</span>
            <RangeSelector
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
            />
        </div>
    );
};
export default ByTime;
