import { useContext, useEffect, useState } from "react";
import { ReportVMContext } from "../../report.vm";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import Summary from "./summary_preview";
import HeaderPreview from "./header";

interface Section {
    label: String;
    index: null | number;
}
const sections: Array<Section> = [
    { label: "Dataset Quality", index: null },
    { label: "Search terms used", index: null },
    { label: "Download metrics", index: null },
    { label: "Use Cases", index: null },
];

const PreviewReport = ({
    loading,
    isReportGenerated,
}: {
    loading: any;
    isReportGenerated: any;
}) => {
    const { editorValue, setDownloadRef } = useContext(ReportVMContext);
    const [updatedSections, setUpdatedSections] =
        useState<Array<Section>>(sections);

    const { organisation } = useContext(OrganisationDetailVMContext);
    const { qualityMetrics } = useContext(ReportVMContext);

    const splittedArray = editorValue.split(/<\/p>(?=<p>)/);

    useEffect(() => {
        for (let i = 0; i < splittedArray.length; i++) {
            if (splittedArray[i].includes(sections[0].label)) {
                setUpdatedSections((prevSections) => {
                    const newSections = [...prevSections];
                    newSections[0].index = i;
                    return newSections;
                });
            } else if (splittedArray[i].includes(sections[1].label)) {
                setUpdatedSections((prevSections) => {
                    const newSections = [...prevSections];
                    newSections[1].index = i;
                    return newSections;
                });
            } else if (splittedArray[i].includes(sections[2].label)) {
                setUpdatedSections((prevSections) => {
                    const newSections = [...prevSections];
                    newSections[2].index = i;
                    return newSections;
                });
            } else if (splittedArray[i].includes(sections[3].label)) {
                setUpdatedSections((prevSections) => {
                    const newSections = [...prevSections];
                    newSections[3].index = i;
                    return newSections;
                });
            }
        }
    }, [editorValue]);

    const previewSection = updatedSections.filter(
        (section, index) => section.index !== null
    );

    const header = splittedArray.slice(0, previewSection[0]?.index);
    // console.log({ header });

    const result = previewSection.map((section, index, array) => {
        const startIndex = section.index;
        const endIndex =
            index < array.length - 1
                ? array[index + 1].index
                : splittedArray.length;
        return splittedArray.slice(startIndex, endIndex);
    });

    const displayResult = result.map((subarray) => subarray.join(""));

    console.log();
    return (
        <div className="shadow-paper-shadow mt-4 h-[656px] bg-[#EBEBEB] border-none overflow-y-scroll">
            {!loading && isReportGenerated && (
                <div
                    className="editor_preview"
                    ref={(ref) => setDownloadRef(ref)}
                >
                    <div className="flex relative justify-end">
                        <div
                            id={"header"}
                            className="w-5/6 section-preview flex flex-col justify-center items-center bg-[url('/images/bubbleBg.svg')] bg-no-repeat bg-cover"
                        >
                            <div className="border p-1 my-20 mx-12  w-[28rem]">
                                <HeaderPreview header={header} />
                            </div>
                            <div className="border p-1 my-20 mx-12 w-[28rem] ">
                                <Summary
                                    organisation={organisation}
                                    qualityMetrics={qualityMetrics}
                                />
                            </div>
                        </div>
                        <div className=" left-0 absolute h-full sm:flex hidden w-fit ">
                            <div className=" bg-dtech-new-main-light w-10 mr-2 "></div>
                            <div className=" bg-[#6DCDCB] w-6 ml-5 sm:ml-0 fixed md:relative"></div>
                        </div>
                    </div>

                    {displayResult?.map((result, index) => (
                        <div
                            key={index}
                            id={findID(result)}
                            className="section-preview mx-5 my-5"
                            dangerouslySetInnerHTML={{
                                __html: result,
                            }}
                        />
                    ))}
                </div>
            )}
            {/* <div
                className="editor_preview "
                dangerouslySetInnerHTML={{
                    __html: editorValue.replaceAll("", ""),
                }}
            /> */}
        </div>
    );
};
export default PreviewReport;

const findID = (result: string) => {
    if (result.includes("Dataset Quality")) return "dataset_quality";
    else if (result.includes("Search terms used")) return "search_terms_used";
    else if (result.includes("Download metrics")) return "download_metrics";
    else if (result.includes("Use Cases")) return "use_cases";
};

function calculateAverageStars(data: any) {
    const totalStars = data?.reduce((acc: any, obj: any) => {
        const star: any = Object.keys(obj)[0];
        const votes = obj[star];
        return acc + star * votes;
    }, 0);

    const totalVotes = data?.reduce(
        (acc: any, obj: any): any => acc + Object.values(obj)[0],
        0
    );

    if (totalVotes === 0) {
        return 0; // To avoid division by zero
    }

    const value = totalStars / totalVotes;
    if (Number.isNaN(value)) return 0;
    else return value;
}
