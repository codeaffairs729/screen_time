import { useContext, useEffect, useState } from "react";
import { ReportVMContext } from "../../report.vm";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import Summary from "./summary_preview";
import HeaderPreview from "./header";
import { head } from "lodash-es";

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

    // const splittedArray = editorValue.trim().split(/<\/p>(?=<p>)/);
    // const splittedArray = editorValue.split(/<\/p>|<p[^>]*>/).filter(Boolean);
    let splittedArray: any = editorValue.split(
        /<p class='break'>&nbsp;<\/p>|&nbsp;<\/p>/
    );
    // let splittedArray = editorValue.split(/&nbsp;|&nbsp;/);

    splittedArray = splittedArray.filter(
        (item: any) =>
            item.trim() !== "" && item.trim() !== "\n" && item.trim() != ","
    );

    // console.log("splitedArray is",splittedArray)
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
    // let header = splittedArray.slice(0, previewSection[0]?.index)
    let header = splittedArray[0]?.split(/<\/?p>/);
    header = header?.filter((item: string) => item.trim() !== "");

    // let updataedList:any = [];
    // const result = previewSection.map((section, index, array) => {
    //     console.log("array is ***************",array)
    //     console.log("section is ",section)
    // let startIndex:any = section.index;
    //     const endIndex =
    //         index < array.length - 1
    //             ? array[index + 1].index
    //             : splittedArray.length;
    //    return splittedArray.slice(startIndex, endIndex);

    // let endIndex:number;
    // if(section.label == "Download metrics"){
    //     console.log("I am here...",splittedArray)
    //     let loopLen = Math.floor(previewSection[2].index - previewSection[3].index)
    //     for(let i=0; i<loopLen; i++){
    //         console.log("startIndex is ",startIndex)
    //         endIndex=  startIndex+3
    //      updataedList = [...updataedList,splittedArray.slice(startIndex, endIndex)]
    //      console.log(updataedList,'---updataedList ')
    //      startIndex = endIndex
    //         console.log("endIndex is ",endIndex)
    //     }

    // }
    // else{
    //     if(endIndex && startIndex<endIndex){
    //         startIndex = endIndex
    //     }
    //   endIndex = startIndex +2
    //   updataedList = [...updataedList,splittedArray.slice(startIndex, endIndex)]

    // }
    // });
    //     const newResult=
    //    console.log("result is ",result)
    const gradientStyle = {
        background:
            "radial-gradient(2196.08% 210.97% at 144.72% -36.42%, rgba(255, 255, 255, 0.75) 0%, rgba(206, 255, 254, 0.28) 27.7%, rgba(206, 176, 208, 0.20) 84.03%)",
        // Add other styles as needed
    };
    // const displayResult = updataedList.map((subarray) => subarray.join("")).filter(Boolean);
    const displayResult = splittedArray.slice(1);
    return (
        <div className="shadow-paper-shadow mt-4 h-[656px] border-none overflow-y-scroll !bg-[#EBEBEB]">
            {!loading && isReportGenerated && (
                <div
                    className="editor_preview"
                    ref={(ref) => setDownloadRef(ref)}
                >
                    <div
                        className="flex relative justify-end h-[1100px]"
                        style={gradientStyle}
                        id={"header"}
                    >
                        <div className="w-[90%] section-preview flex flex-col justify-center items-center bg-[url('/images/GroupPreviewBackground.svg')] bg-cover bg-no-repeat bg-top">
                            <div className=" mr-2 mt-40 w-[28rem] rounded-[10px]">
                                {header && <HeaderPreview header={header} />}
                            </div>
                            <div className=" p-1 mt-16 mb-36 mr-2 w-[28rem] rounded-[10px]">
                                <Summary
                                    organisation={organisation}
                                    qualityMetrics={qualityMetrics}
                                />
                            </div>
                        </div>
                        <div className=" left-0 absolute h-full sm:flex hidden w-fit ">
                            <div className=" bg-dtech-new-main-light w-10 mr-2"></div>
                            <div className=" bg-[#6DCDCB] w-6 ml-0 fixed md:relative"></div>
                            <div className="bg-[#EBEBEB] w-4 ml-2 fixed md:relative"></div>
                        </div>
                    </div>
                    <div className="quillCss">
                        {displayResult?.map((result: any, index: any) => {
                            return (
                                <div
                                    key={index}
                                    className="section-preview mx-7 my-8 border-[0.5px] border-grey rounded-[5px] bg-white"
                                >
                                    <div
                                        key={index}
                                        id={findID(result)}
                                        className="section-preview p-10 text-dtech-light-grey3 text-[19px]"
                                        dangerouslySetInnerHTML={{
                                            // __html: result,
                                            __html: result.replace(
                                                /<a/g,
                                                '<a style="color: blue; text-decoration: underline; margin-bottom:5px "'
                                            ),
                                        }}
                                    />
                                    <div className="text-center text-black mb-4">
                                        Page {index + 1}/{displayResult.length}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
    // else return result
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
