import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";
import PieGraph from "components/UI/PieGraph";
import BarGraph from "components/UI/BarGraph";
import Table from "../../table";
import { Tab } from "@headlessui/react";
import { useContext } from "react";
import {
    DownloadByTime,
    OrganisationDetailVMContext,
} from "pages/organisation/organisation_detail.vm";
import Loader from "components/UI/loader";
import { ReportVMContext } from "../report.vm";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});
const TIME_HEADERS = ["Count", "Month"];
const PIE_HEADER = ["name", "value"];

const Report = () => {
    const { downloadMetrics } = useContext(OrganisationDetailVMContext);
    const { loading } = useContext(ReportVMContext);
    const { downloadByTime = [], downloadByUseCase = [] } =
        downloadMetrics || {};
    const timeMetrics = downloadByTime.map((data: DownloadByTime) => ({
        month: new Date(data?.date).toLocaleString("en", {
            month: "short",
        }),
        download_per_month: data.count,
    }));
    const downloadByTimeData = downloadByTime.map((data: DownloadByTime) => {
        const date = new Date(data?.date);
        const month = date.toLocaleString("en", { month: "short" });
        const year = new Date().getFullYear();

        return [[data.count], [`${month} ${year}`]];
    });
    const pieData = downloadByUseCase.map((data: any, index: number) => [
        data.name,
        data.value,
    ]);
    return (
        <div>
            {loading && (
                <div className="flex absolute min-w-[700px] h-[656px]  mt-12 ml-1 bg-black bg-opacity-10 z-20 ">
                    <div className="ml-auto mr-auto my-auto">
                        <Loader sizeClass="h-10 w-10" />
                    </div>
                </div>
            )}
            <div className=" h-[56rem] overflow-y-scroll no-scrollbar whitespace-nowrap absolute">
                <div
                    id="screenshot"
                    className="flex absolute justify-center items-center flex-col z-[-10]"
                >
                    <BarGraph
                        data={timeMetrics}
                        width={400}
                        height={200}
                        strokeWidthAxis={2}
                        strokeWidthLabelList={0}
                        className="font-medium my-2"
                        XleftPadding={20}
                        XrightPadding={30}
                        barDatakey={"download_per_month"}
                        labelListPosition="insideTop"
                        isAnimationActive={false}
                    />
                    <Table
                        tableHeaders={TIME_HEADERS}
                        tableData={downloadByTimeData}
                        headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                        tableClass="w-[90%] ml-12 text-sm text-left table-fixed"
                        cellPadding={20}
                        tableRow="text-[17px]"
                    />
                </div>
                <div
                    id="pie"
                    className="flex absolute justify-center items-center flex-col z-[-10]"
                >
                    <PieGraph
                        data={downloadByUseCase}
                        isAnimationActive={false}
                        radius="60%"
                    />
                    <Table
                        tableHeaders={PIE_HEADER}
                        tableData={pieData}
                        headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                        tableClass="w-[80%] ml-20 text-left table-fixed"
                        cellPadding={20}
                        tableRow="text-[17px]"
                    />
                </div>
            </div>
            <Tab.Group>
                <Tab.List>
                    <Head />
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <Preview />
                    </Tab.Panel>
                    <Tab.Panel>
                        <EditReport />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            {/* <Head edit={edit} setEdit={setEdit} />
            {edit ? <EditReport /> : <Preview />} */}
        </div>
    );
};

export default Report;
