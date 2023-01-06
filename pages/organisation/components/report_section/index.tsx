import ReportFilter from "./report_filter";
import Report from "./report/";
import ReportVM, { ReportVMContext } from "./report.vm";

const Index = () => {
    const imgUrl =
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";

    const vm = ReportVM();

    return (
        <ReportVMContext.Provider value={vm}>
            <div className="mb-6 ml-10">
                <div className="text-[17px] text-dtech-dark-grey my-4">
                    Generate reports on organisation level data usage insights
                    and user feedback.
                </div>
                <div className="flex">
                    <Report />
                    <ReportFilter imgUrl={imgUrl} />
                </div>
            </div>
        </ReportVMContext.Provider>
    );
};

export default Index;
