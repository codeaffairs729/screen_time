import ReportFilter from "./report_filter";
import Report from "./report/";
import ReportVM, { ReportVMContext } from "./report.vm";

const Index = () => {
    const vm: any = ReportVM();

    return (
        <ReportVMContext.Provider value={vm}>
            <div className="mb-6 ml-10">
                <div className="text-[17px] text-dtech-dark-grey my-4">
                    Autogenerate report with insights on dataset quality, search
                    terms used and download metrics for defined periods, edit
                    and download. To generate more a comprehensive and custom
                    report, email us at&nbsp;
                    <a
                        href="mailto:dtechtive@dtime.ai"
                        className=" text-dtech-main-dark underline "
                    >
                        dtechtive@dtime.ai
                    </a>
                    &nbsp;or&nbsp;
                    <a
                        href="https://dtime.ai/meeting"
                        className=" text-dtech-main-dark underline "
                    >
                        arrange a call
                    </a>
                    .
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
