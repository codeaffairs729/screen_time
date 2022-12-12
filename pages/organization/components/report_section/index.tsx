import ReportFilter from "./report_filter";
import Report from "./report/";

const Index = () => {
    return (
        <div className="ml-16">
            <div className="text-[17px] text-dtech-dark-grey my-4">
                Generate reports on organisation level data usage insights and
                user feedback.
            </div>
            <div className="flex">
                <Report />
                <ReportFilter />
            </div>
        </div>
    );
};

export default Index;
