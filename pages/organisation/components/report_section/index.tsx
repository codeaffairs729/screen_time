import ReportFilter from "./report_filter";
import Report from "./report/";
import ReportVM, { ReportVMContext } from "./report.vm";

const Index = () => {
    const vm: any = ReportVM();

    return (
        <ReportVMContext.Provider value={vm}>
            <div className="mb-6 ml-10">
                <div className="text-[17px] text-dtech-dark-grey my-4">
                    Generate reports on organisation level data usage insights
                    and user feedback.
                </div>
                <div className="flex">
                    <Report />
                    <ReportFilter />
                </div>
            </div>
        </ReportVMContext.Provider>
    );
};

export default Index;
