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
    const handleCheck = (e: any) => {
        HEADER.map((header) => {
            if (header.label === e.target.value) {
                header.isChecked = e.target.checked;
            }
        });
        setSelected([...HEADER]);
    };
    const handleAutoGenerate = () => {
        setAutoGenerate(true);
    };
    return (
        <div className="ml-16">
            <div className="text-[17px] text-dtech-dark-grey my-4">
                Generate reports on organisation level data usage insights and
                user feedback.
            </div>
            <div className="flex">
                <Report autoGenerate={autoGenerate} selected={selected} />
                <ReportFilter
                    handleCheck={handleCheck}
                    handleAutoGenerate={handleAutoGenerate}
                    HEADER={HEADER}
                />
            </div>
        </div>
    );
};

export default Index;
