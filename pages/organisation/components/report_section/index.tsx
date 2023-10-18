import ReportFilter from "./report_filter";
import Report from "./report/";
import { useContext, useEffect, useState } from "react"
import ReportVM, { ReportVMContext } from "./report.vm";
import { QualityMetricVMContext } from "../insights_section/quality_insights/quality_metric.vm";
import UpgradeAccountModal from "../upgrade_modal";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";

const Index = ({ setIsReportGenerated, isReportGenerated }: { setIsReportGenerated: Function, isReportGenerated: boolean }) => {
    const vm: any = ReportVM();
    const [isMobile, setIsMobile] = useState(false)
    const {
        qualityMetrics,
        fetchQualityMetrics,
        isFetchingQualityMetrics,
        error,
        selectedQualityInsights: selectedLabel,
    } = useContext(QualityMetricVMContext);

    const { permittedPermissions } = useContext(OrganisationDetailVMContext)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <ReportVMContext.Provider value={vm}>
            <div className="relative">
                <div className="mb-6 ">
                    {(!isMobile || (!isReportGenerated && isMobile))
                        &&
                        <div className=" sm:mb-8">

                            <div className="sm:text-sm text-xs text-dtech-dark-grey  text-center">
                                Autogenerate report with insights on dataset quality, use cases, search
                                terms used and download metrics for defined periods.
                            </div>
                            <div className="sm:text-sm text-xs text-dtech-dark-grey b-4 text-center">
                                To generate a comprehensive report, email us at&nbsp;
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
                        </div>
                    }
                    <div className="sm:flex hidden ">
                        <ReportFilter setIsReportGenerated={setIsReportGenerated} />
                        <Report isReportGenerated={isReportGenerated} setIsReportGenerated={setIsReportGenerated} />
                    </div>
                    <div className="flex sm:hidden">
                        {isReportGenerated ? <Report isReportGenerated={isReportGenerated} setIsReportGenerated={setIsReportGenerated} /> : <ReportFilter setIsReportGenerated={setIsReportGenerated} />}
                    </div>
                </div>
                {(!permittedPermissions.includes("providerInsights.report.edit")) && <div className=" absolute top-0 left-0 w-full h-full">
                    <div className="h-full"><UpgradeAccountModal /></div>
                </div>}
            </div>
        </ReportVMContext.Provider>
    );
};

export default Index;
