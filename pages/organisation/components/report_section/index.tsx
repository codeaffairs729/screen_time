import ReportFilter from "./report_filter";
import Report from "./report/";
import { useState } from "react";
const HEADER = [
    { label: "Insights", isChecked: false },
    { label: "Dataset quality", isChecked: false },
    { label: "User feedback", isChecked: false },
];

const Index = () => {
    const [selected, setSelected] = useState(HEADER);
    const [autoGenerate, setAutoGenerate] = useState<Boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const handleCheck = (e: any) => {
        HEADER.map((header) => {
            if (header.label === e.target.value) {
                header.isChecked = e.target.checked;
            }
        });
        setSelected([...HEADER]);
    };
    const handleAutoGenerate = () => {
        edit && setAutoGenerate(true);
    };
    const handleCancel = () => {
        setEdit(false);
    };
    return (
        <div className="mb-6 ml-10">
            <div className="text-[17px] text-dtech-dark-grey my-4">
                Generate reports on organisation level data usage insights and
                user feedback.
            </div>
            <div className="flex">
                <Report
                    autoGenerate={autoGenerate}
                    selected={selected}
                    edit={edit}
                    setEdit={setEdit}
                    handleCancel={handleCancel}
                    fromDate={fromDate}
                    toDate={toDate}
                />
                <ReportFilter
                    handleCheck={handleCheck}
                    handleAutoGenerate={handleAutoGenerate}
                    HEADER={HEADER}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
        </div>
    );
};

export default Index;
