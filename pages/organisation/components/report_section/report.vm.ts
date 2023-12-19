import { createContext, useContext, useEffect, useState } from "react";

// import html2canvas from "html2canvas";
import { format } from "date-fns";

import jsPDF from "jspdf";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { jsonToUseCaseMetrics } from "../insights_section/use_case_section/usecase.vm";
import * as htmlToImage from 'html-to-image';
type Header = {
    label: string;
    isChecked: boolean;
};
export type DownloadByTime = {
    date: Date;
    count: number;
};

const HEADER: Header[] = [
    { label: "Dataset Quality", isChecked: false },
    { label: "Search terms used", isChecked: false },
    { label: "Download metrics", isChecked: false },
    { label: "Use Cases", isChecked: false },
];

const A4_WIDTH_MM = 210;
const PAGE_Y_MARGIN = 160;
const PAGE_X_MARGIN = 20;

// export const downloadPdf = (
//     input: any,
//     inputHeightMm: any,
//     fileName: string = "download.pdf"
// ) => {
//     html2canvas(input, { useCORS: true }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf =
//             inputHeightMm > A4_WIDTH_MM
//                 ? new jsPDF("p", "mm", [
//                       inputHeightMm + PAGE_Y_MARGIN,
//                       A4_WIDTH_MM,
//                   ])
//                 : new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//         pdf.addImage(
//             imgData,
//             "png",
//             10,
//             4,
//             pdfWidth - PAGE_X_MARGIN,
//             pdfHeight
//         );
//         pdf.save(fileName);
//     });
// };

// const imageTag = (src: string, index: any) => {
//     return `<img  style='margin-left: auto;margin-right: auto;${
//         index ? "width: 500px;" : "width: 300px;"
//     }' src='${src}' />`;
// };

const formatDate = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
    })} ${date.getFullYear()}`;

const getReportDate = (fromDate: Date, toDate: Date) => {
    return format(fromDate, "dd-MM-yyyy") === format(toDate, "dd-MM-yyyy")
        ? `<p><strong style="padding-left: 100px;">${formatDate(
              fromDate
          )}</strong></p> <div id='break'></div>`
        : `<p><strong>${formatDate(fromDate)}</strong> - <strong>${formatDate(
              toDate
          )}</strong></p> <div id='break'></div>`;
};
const getReportTitle = (title: any) => {
    return `<p><strong>Dataset Insights Report</strong></p><p><strong>${title}</strong></p>`;
};
const getImageCanvas = (src: any) => `<img src="${src}"/>`;
// const getAllImageCanvas = (elem:any) => elem.map(image=>`<img src=${image}/> <br/>`)

const formatSubHeading = (text: string) => `<p> ${text}</p>`;

const headerSelected = (
    selected: Array<Object>,
    byTime: any,
    byTimeGraph:any,
    byUseCase: any,
    byRegion: any,
    byquality: any,
    bySearchTermsCanvas: any,
    byUseCasesCanvas: any,
    repostHeardingDescription: any
) => {
    return selected
        .map((object: any, index: any) =>
            object === "Download metrics"
                ? `
                <p><strong id=label_${index}>${object}</strong>
                <br/>
                ${formatSubHeading("Downloads by region")}
                ${
                    byRegion
                        ? getImageCanvas(byRegion)
                        : "<h4>No insights available.</h4> <div id='break'></div>"
                }
                </p>
                <br/>
                <p>
                <div id='break'></div>
                ${formatSubHeading("Downloads by time")}
                ${
                   
                    byTime
                        // ? getImageCanvas(byTime) +"<br>" + getImageCanvas(byTimeGraph)
                        ? getImageCanvas(byTime) +"<br>" +"<div id='break'></div>" 
                        +"<br/>"+ byTimeGraph.map(el=>`<div>${getImageCanvas(el)}</div> <div id='break'></div>`).join(" <div id='break'></div>")
                        
                        : "<h4>No insights available.</h4> <div id='break'></div>"
                }
                <p>
                <br/>
                ${formatSubHeading("Downloads by role")}
                ${
                    byUseCase
                        ? getImageCanvas(byUseCase) + `<div id='break'></div>`
                        : "<h4>No insights available.</h4> <div id='break'></div> "
                }</p>
                <br/>`
                : object === "Dataset Quality"
                ? `<br/><p><strong id=label_${index}>${object}</strong>  </p>
                <br/> 
                ${byquality ? `<h3 style="font-size:14px; font-weight:400; color: '#333' ">${repostHeardingDescription.insight_datasetQuality_description[1].title}</h3>`: ``}
                ${
                    byquality
                        ? getImageCanvas(byquality) +`<div id='break'></div>`
                        : `<h4>No insights available.</h4> [break]`
                }
               
                <br/>`
                : object == "Use Cases"
                ? `<p><strong id=label_${index}>${object}</strong><br>
                ${byUseCasesCanvas ? `<p style="font-size:14px; font-weight:400; color: '#333'">${repostHeardingDescription.insight_useCase_description}</p>` : `` }
                ${
                    byUseCasesCanvas
                        ? getImageCanvas(byUseCasesCanvas) +`<div id='break'></div>`
                        : `<h4>No insights available.</h4> <div id='break'></div>`
                }
                </p>
                <br/>`
                : `<strong id=label_${index}>${object}</strong> <br>
                <span style="font-size:14px; font-weight:400; color: '#333'">${repostHeardingDescription.insight_searchTerm_description}</span>
                ${
                    bySearchTermsCanvas
                        ? getImageCanvas(bySearchTermsCanvas) + "<div id='break'></div>"
                        : `<h4>No insights available.</h4> <div id='break'></div>`
                }`
        )
        .join("");
};

const checkIfDateExists = (downloadDate: any, currDate: any) => {
    const downloadDateString = new Date(downloadDate.date).toDateString();
    const currDateString = new Date(currDate).toDateString();

    return currDateString == downloadDateString;
};

const ReportVM = () => {
    const currentDate = new Date();
    const [toDate, setToDate] = useState(new Date());
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    const [fromDate, setFromDate] = useState(currentDate);
    // const [from, setFrom] = useState(format(new Date(), "yyyy-MM-dd"));
    // const [to, setTo] = useState(format(new Date(), "yyyy-MM-dd"));
    const { organisation } = useContext(OrganisationDetailVMContext);
    const { imgUrl } = organisation || {};
    const [downloadRef, setDownloadRef] = useState<any>();
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [activeHeaders, setActiveHeaders] = useState<Header[]>(HEADER);
    // const [editorState, onEditorStateChange] = useState<EditorState>(
    //     EditorState.createEmpty()
    // );
    const [editorValue, setEditorValue] = useState(``);
    // const [previewContent, setPreviewContent] = useState("");
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    // useEffect(() => {
    //     setPreviewContent(formatPreviewData());
    // }, [editorState]);

    const onHeaderSelect = (e: any) => {
        let updatedActiveHeaders: Header[] = [];
        let selectedHeaderLabels: string[] = [];
        activeHeaders.forEach((header: Header) => {
            const updatedHeader =
                e.target.value == header.label
                    ? { ...header, isChecked: e.target.checked }
                    : header;

            updatedActiveHeaders = [...updatedActiveHeaders, updatedHeader];

            if (updatedHeader.isChecked) {
                selectedHeaderLabels = [
                    ...selectedHeaderLabels,
                    updatedHeader.label,
                ];
            }
        });

        setSelectedHeaders(selectedHeaderLabels);
        setActiveHeaders(updatedActiveHeaders);
    };
    const {
        execute: executeFetchImage,
        data: image,
        isLoading: isFetchingImage,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchImage = (url: any) =>
        executeFetchImage(
            () => {
                return Http.get(
                    `/v1/data_sources/provider/image/?image_url=${url}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation logo."
                    );
                },
            }
        );

    // const generateReportContent = async (qualityMetrics: any) => {
    //     setIsGeneratingReport(true);
    //     const newMetric: any = document.getElementById("newMetrics");
    //     const metricByLocation: any = document.getElementById("map");
    //     const metricByTime: any = document.getElementById("screenshot");
    //     const metricByUseCase: any = document.getElementById("pie");
    //     const useCases: any = document.getElementById("useCases");
    //     const searchTerms: any = document.getElementById("searchTerms");
    //     const qualityMetric: any = document.getElementById("qualityMetrics");

    //     const byNewMetricCanvas =
    //         newMetric && (await html2canvas(newMetric)).toDataURL("image/png");
    //     const byQualityMetricCanvas =
    //         qualityMetric &&
    //         (await html2canvas(qualityMetric)).toDataURL("image/png");
    //     const bySearchTermsCanvas =
    //         searchTerms &&
    //         (await html2canvas(searchTerms)).toDataURL("image/png");
    //     const byLocationCanvas =
    //         metricByLocation &&
    //         (await html2canvas(metricByLocation)).toDataURL("image/png");
    //     const byTimeCanvas =
    //         metricByTime &&
    //         (await html2canvas(metricByTime)).toDataURL("image/png");
    //     const byUseCaseCanvas =
    //         metricByUseCase &&
    //         (await html2canvas(metricByUseCase)).toDataURL("image/png");
    //     const byUseCasesCanvas =
    //         useCases && (await html2canvas(useCases)).toDataURL("image/png");
    //     const base64 = await fetchImage(imgUrl);
    //     const data = `
    //             <figure style='width:200px;margin-left:auto;margin-right:auto;'><img src='data:image/jpeg;base64,${base64}' /></figure>
                
    //             ${getReportTitle(organisation?.title)}
    //             ${getReportDate(fromDate, toDate)}
    //             ${headerSelected(
    //                 selectedHeaders,
    //                 byTimeCanvas,
    //                 byUseCaseCanvas,
    //                 byLocationCanvas,
    //                 byQualityMetricCanvas,
    //                 bySearchTermsCanvas,
    //                 byUseCasesCanvas
    //             )}
    //         `;

    //     onEditorStateChange(
    //         EditorState.createWithContent(
    //             ContentState.createFromBlockArray(
    //                 convertFromHTML(`<p>${data}</p>`).contentBlocks
    //             )
    //         )
    //     );
    //     setIsGeneratingReport(false);
    // };

    const getImageDataURL = async (element: any) => {
        if (element) {
            try {
                const dataUrl = await htmlToImage.toPng(element,{height:700});
                return dataUrl;
            } catch (error) {
                console.error('Error converting HTML to image:', error);
                return null;
            }
        }
        return null;
    };

    const generateNewReport = async (repostHeardingDescription:any) => {
        setIsGeneratingReport(true);
        const qualityMetric: any = document.getElementById("qualityMetrics");
        const searchTerms: any = document.getElementById("searchTerms");
        const metricesByRegion: any = document.getElementById("map");
        const metricByTime: any = document.getElementById("screenshot");
        const metricByUseCase: any = document.getElementById("pie");
        const useCases: any = document.getElementById("useCases");
        const time_test: any = document.getElementById("time_test");
        const elementsWithTestId = document.querySelectorAll('[id*="time_test"]');
        console.log("multiple Ids are************",elementsWithTestId)
// const dynamicIds = Array.from(elementsWithTestId).map(element => element.id);

        const byQualityMetricCanvas = await getImageDataURL(qualityMetric);
        const bySearchTermsCanvas = await getImageDataURL(searchTerms);
        const byLocationCanvas = await getImageDataURL(metricesByRegion);
        const byTimeCanvas = await getImageDataURL(metricByTime);
        const byUseCaseCanvas = await getImageDataURL(metricByUseCase);
        const byUseCasesCanvas = await getImageDataURL(useCases);  
        // const byTimeGraph = await getImageDataURL(time_test); 
    //    const byTimeGraph =await dynamicIds.map(async(el)=> await getImageDataURL(el)) 
    // console.log("bySeach is ********************* ",bySearchTermsCanvas)
    let res=  await getImageDataURL(elementsWithTestId[0])
    // console.log("response for image is ******************",res)
    let byTimeGraph:any=[];
    for(let i=0; i<elementsWithTestId.length/2; i++){
       let res=  await getImageDataURL(elementsWithTestId[i])
    //    console.log("response for image is ******************",res)
       byTimeGraph.push(res)
    }
    //    console.log("byTime graph image is ",byTimeGraph)
        const data = `
                <p style="text-align: center;"><img src="${imgUrl}" width=200 height=150 style="text-align: center;" /></p>
                <p></p>
                ${getReportTitle(organisation?.title)}
                ${getReportDate(fromDate, toDate)}
                ${headerSelected(
                    selectedHeaders,
                    byTimeCanvas,
                    byTimeGraph,
                    byUseCaseCanvas,
                    byLocationCanvas,
                    byQualityMetricCanvas,
                    bySearchTermsCanvas,
                    byUseCasesCanvas,
                    // insightDescription
                    repostHeardingDescription
                )}
            `;
        setEditorValue(data);
        setIsGeneratingReport(false);
    };


    const {
        execute: executeFetchQualityMetrics,
        data: qualityMetrics,
        isLoading: isFetchingQualityMetrics,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchQualityMetrics = () =>
        executeFetchQualityMetrics(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.uuid}/quality_metrics`
                );
            },
            {
                postProcess: (res: any) => {
                    return jsonToQualityMetrics(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by roles."
                    );
                },
            }
        );

    const {
        execute: executeFetchSearchTerms,
        data: searchTerms,
        isLoading: isFetchingSearchTerms,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchSearchTerms = () =>
        executeFetchSearchTerms(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/10`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by roles."
                    );
                },
            }
        );

    const {
        execute: executeFetchByRoles,
        data: downloadByRole,
        isLoading: isFetchingByRoles,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchMetricDataByRoles = (from: string, to: string) =>
        executeFetchByRoles(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/by_role?from_date=${from}&to_date=${to}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by roles."
                    );
                },
            }
        );

    const {
        execute: executeFetchByTime,
        data: downloadByTime,
        isLoading: isFetchingByTime,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchMetricDataByTime = (from: string, to: string) =>
        executeFetchByTime(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${
                        organisation?.uuid
                    }/by_time?from=${format(
                        fromDate,
                        "yyyy-MM-dd"
                    )}&to=${format(toDate, "yyyy-MM-dd")}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation download metrics."
                    );
                },
            }
        );

    const {
        execute: executeFetchByLocation,
        data: downloadByLocation,
        isLoading: isFetchingByLocation,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchMetricDataByLocation = (from: string, to: string) =>
        executeFetchByLocation(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/by_location?from_date=${from}&to_date=${to}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by location."
                    );
                },
            }
        );
    const {
        execute: excuteFetchUseCases,
        data: useCases,
        isLoading: isFetchingUseCases,
        error,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fetchUseCases = () =>
        excuteFetchUseCases(
            () => {
                return Http.get(
                    `/v1/data_sources/provider/use_cases/${organisation?.uuid}`
                );
            },
            {
                postProcess: (res) => {
                    const useCase = jsonToUseCaseMetrics(res);
                    return useCase;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation search terms insights."
                    );
                },
            }
        );

    const jsonToQualityMetrics = (json: any): any => {
        return {
            dataFileQuality: {
                overallScore: getQualityScore(
                    json["data_file_quality"]["overall"],
                    "overallScore",
                    "Average of all dimensions listed."
                ),
                accuracy: getQualityScore(
                    json["data_file_quality"]["accuracy"],
                    "accuracy",
                    "Is the information (headers, acronyms, abbreviations) clear (less ambiguous) and legible?"
                ),
                consistency: getQualityScore(
                    json["data_file_quality"]["consistency"],
                    "consistency",
                    "Do the values and headers have consistent formats (e.g. date formats), granularity (e.g spatiotemporal resolution), ? Does the same information match across multiple instances?"
                ),
                clarity: getQualityScore(
                    json["data_file_quality"]["clarity"],
                    "clarity",
                    "Is the information (e.g. values, content) error-free and correct?"
                ),
                readiness: getQualityScore(
                    json["data_file_quality"]["readiness"],
                    "readiness",
                    "Does the file need minimal preprocessing (e.g. missing value imputation, outlier removal) before any sensible use?"
                ),
            },
            metaFileQuality: {
                overallScore: getQualityScore(
                    json["meta_file_quality"]["overall"],
                    "overallScore",
                    "Average of all dimensions listed."
                ),
                findability: getQualityScore(
                    json["meta_file_quality"]["findability"],
                    "findability",
                    "Does this dataset contain metadata that enables its findability for humans and computers?"
                ),
                accessibility: getQualityScore(
                    json["meta_file_quality"]["accessibility"],
                    "accessibility",
                    "Are the dataset and data file download URLs available and working?"
                ),
                reusability: getQualityScore(
                    json["meta_file_quality"]["reusability"],
                    "reusability",
                    "How well-described is this dataset so it can be replicated and/or combined in different settings, to help optimise its reuse?"
                ),
                contextuality: getQualityScore(
                    json["meta_file_quality"]["contextuality"],
                    "contextuality",
                    "Does this dataset have contextual information to aid in deciding if a dataset is fit-for-purpose or not?"
                ),
                interoperability: getQualityScore(
                    json["meta_file_quality"]["interoperability"],
                    "interoperability",
                    "How well can this dataset work in conjunction with applications or workflows for analysis, storage, and processing?"
                ),
            },
        };
    };
    const getQualityScore = (
        data: any,
        title: string,
        tooltipTitle: string
    ) => ({
        title: title,
        rating: data?.rating,
        tooltipTitle: tooltipTitle,
        datasets: data?.datasets.map((data: any) => getQualityDatasets(data)),
    });

    const getQualityDatasets = (dataset: any) => ({
        id: dataset["id"],
        title: dataset["title"],
        description: dataset["description"],
        rating: dataset["ratings"],
    });

    const fetchData = (activeHeaders: any,repostHeardingDescription:any) => {
        let from: string = format(new Date(), "yyyy-MM-dd");
        let to: string = format(new Date(), "yyyy-MM-dd");

        if (!fromDate && !toDate) {
            const currentDate = new Date();
            to = format(currentDate, "yyyy-MM-dd");
            currentDate.setFullYear(currentDate.getFullYear() - 1);
            from = format(currentDate, "yyyy-MM-dd");
        } else if (fromDate || toDate) {
            from = format(fromDate ? fromDate : toDate, "yyyy-MM-dd");
            to = format(toDate ? toDate : fromDate, "yyyy-MM-dd");
        }

        setFromDate(new Date(from));
        setToDate(new Date(to));
        //Check if option selected
        let promise1;
        let promise2;
        let promise3;
        let promise4;
        let promise5;
        let promise6;
        activeHeaders[0].isChecked == true &&
            (promise5 = fetchQualityMetrics());
        activeHeaders[1].isChecked == true && (promise4 = fetchSearchTerms());
        activeHeaders[2].isChecked == true &&
            (promise1 = fetchMetricDataByTime(from, to));
        activeHeaders[2].isChecked == true &&
            (promise2 = fetchMetricDataByRoles(from, to));
        activeHeaders[2].isChecked == true &&
            (promise3 = fetchMetricDataByLocation(from, to));
        activeHeaders[3].isChecked == true && (promise6 = fetchUseCases());

        Promise.all([
            promise1,
            promise2,
            promise3,
            promise4,
            promise5,
            promise6,
        ]).then(() => {
            generateNewReport(repostHeardingDescription);
        });
    };

    const transformedData = searchTerms.map((item: any) => {
        return {
            tag: item.title.replace(/\+/g, " "),
            count: item.count,
        };
    });

    const isFetching =
        isFetchingByTime ||
        isFetchingByRoles ||
        isFetchingByLocation ||
        isFetchingQualityMetrics ||
        isFetchingSearchTerms;
    const loading =
        isGeneratingReport ||
        isFetching ||
        isFetchingQualityMetrics ||
        isFetchingSearchTerms ||
        isFetchingByTime ||
        isFetchingByRoles ||
        isFetchingByLocation ||
        isFetchingUseCases;

    return {
        // generateReportContent,
        // onEditorStateChange,
        setSelectedHeaders,
        setActiveHeaders,
        setDownloadRef,
        onHeaderSelect,
        selectedHeaders,
        activeHeaders,
        // editorState,
        downloadRef,
        // previewContent,
        loading,
        fromDate,
        setFromDate,
        toDate,
        fetchData,
        setToDate,
        downloadByTime,
        downloadByRole,
        downloadByLocation,
        searchTerms,
        qualityMetrics,
        useCases,
        editorValue,
        setEditorValue,
        transformedData,
        graphDataVal,
    };
};

export default ReportVM;

const getDifferenceInDays = (fromDate: any, toDate: any) =>
    (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);

const getDataByMonth = (dates: any) => {
    const tempDate = dates.map((data: DownloadByTime) => {
        const date = new Date(data?.date);
        const month = date.toLocaleString("en", { month: "short" });
        const year = new Date(data?.date).getFullYear();
        return { count: data.count, month: `${month} ${year}` };
    });

    const aggregated = tempDate.reduce((acc: any, curr: any) => {
        const existingMonth = acc.find(
            (monthObj: any) => monthObj.month === curr.month
        );
        if (existingMonth) {
            existingMonth.count += curr.count;
        } else {
            acc.push({
                month: curr.month,
                count: curr.count,
            });
        }
        return acc;
    }, []);
    return aggregated;
};

export const getDateRange = (fromDate: any, toDate: any, dates: any) => {
    const differenceInDays: number = getDifferenceInDays(fromDate, toDate);
    if (differenceInDays >= 90) {
        const lineChartByMonth = getDataByMonth(dates).map((data: any) => ({
            month: data.month,
            download: data.count,
        }));
        return lineChartByMonth;
    } else {
        let datesList: any = [];
        let currentDate = new Date(fromDate);
        while (currentDate <= new Date(toDate)) {
            const downloadDate = dates.filter((downDate: any) =>
                checkIfDateExists(downDate, currentDate)
            )[0];
            const dateToShow = downloadDate
                ? new Date(downloadDate?.date)
                : currentDate;
            datesList.push({
                date: dateToShow.toLocaleString("en", {
                    day: "numeric",
                    weekday: "short",
                    month: "short",
                    year: "numeric",
                }),
                download: downloadDate?.count || 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesList;
    }
};

export const graphDataVal = (
    downloadByTime: any,
    fromDate: any,
    toDate: any
) => {
    const filteredDates = downloadByTime.filter(
        (data: any) =>
            new Date(data?.date) >= new Date(fromDate) &&
            new Date(data?.date) <= new Date(toDate)
    );

    const dates = filteredDates.sort((a: any, b: any) => {
        if (new Date(a.date) > new Date(b.date)) return 1;
        if (new Date(a.date) < new Date(b.date)) return -1;
        else return 0;
    });
    const lineChartData = getDateRange(fromDate, toDate, dates);

    const graphData = [];
    let dataAvailable = false;

    for (const item of lineChartData) {
        const dataPoint = {
            [item.month ?? item.date]: item.download,
        };

        graphData.push(dataPoint);

        if (item.download > 0) {
            dataAvailable = true;
        }
    }

    return graphData;
};

export const getTableData = (fromDate: any, toDate: any, dates: any) => {
    const differenceInDays: number = getDifferenceInDays(fromDate, toDate);
    if (differenceInDays >= 90) {
        const tableDataByMonth = getDataByMonth(dates).map((data: any) => [
            [data.month],
            [data.count],
        ]);
        return tableDataByMonth;
    } else {
        const tableDataByTime = dates.map((data: DownloadByTime) => {
            const date = new Date(data?.date);
            const month = date.toLocaleString("en", { month: "short" });
            const year = new Date(data?.date).getFullYear();
            return [[`${month} ${year}`], [data.count]];
        });

        return tableDataByTime;
    }
};

export const getRegion = (downloadByLocation: any) => {
    return downloadByLocation?.map((region: any) => ({
        name: region["name"],
        location: region["locations"]?.map((location: any) => ({
            lat: location["latitude"],
            long: location["longitude"],
        })),
        count: region["count"],
        date: region["date"],
    }));
};

export const getAge = (date: string) => {
    let seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const daysAgo =
            Math.floor(interval) +
            (Math.floor(interval) === 1 ? " day" : " days") +
            " ago";
        return daysAgo;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return " just now";
};

export const getRegionTableData = (downloadByLocation: any) => {
    const regions = getRegion(downloadByLocation);
    const loc: any = [];
    const downloadCounts: any = [];
    regions?.map((region: any) => {
        region["location"]?.map((location: any) => {
            loc.push([location?.lat, location?.long]);
            downloadCounts.push(1);
        });
    });
    const tableData = regions?.map((region: any) => [
        region?.name,
        region?.count,
        getAge(region.date),
    ]);

    return tableData;
};

export function sortAndAggregate(categories: any) {
    const sortedCategories = categories
        .slice()
        .sort((a: any, b: any) => b.value - a.value);

    if (sortedCategories.length > 10) {
        const otherCategories = sortedCategories.slice(9);
        const aggregatedValue = otherCategories.reduce(
            (sum: any, category: any) => sum + category.value,
            0
        );
        sortedCategories[9] = { category: "others", value: aggregatedValue };
        return sortedCategories.slice(0, 10);
    }

    return sortedCategories;
}

export const getUseCaseData = (useCases: any) => {
    return sortAndAggregate(useCases).map((data: any) => [
        data.category.charAt(0).toUpperCase() + data.category.slice(1),
        data.value,
    ]);
};

export const getfilteredData = (
    downloadByTime: any,
    fromDate: any,
    toDate: any
) => {
    const filteredDates = downloadByTime.filter(
        (data: any) =>
            new Date(data?.date) >= new Date(fromDate) &&
            new Date(data?.date) <= new Date(toDate)
    );

    const dates = filteredDates.sort((a: any, b: any) => {
        if (new Date(a.date) > new Date(b.date)) return 1;
        if (new Date(a.date) < new Date(b.date)) return -1;
        else return 0;
    });

    return dates;
};

interface IReportVMContext {
    generateReportContent: any;
    onEditorStateChange: any;
    setSelectedHeaders: Function;
    setActiveHeaders: Function;
    setDownloadRef: Function;
    onHeaderSelect: Function;
    selectedHeaders: string[];
    activeHeaders: Header[];
    editorState: any;
    downloadRef: any;
    previewContent: string;
    loading: Boolean;
    setLoading: Function;
    fromDate: Date;
    setFromDate: Function;
    toDate: Date;
    fetchData: Function;
    setToDate: Function;
    downloadByTime: any;
    downloadByRole: any;
    downloadByLocation: any;
    searchTerms: any;
    qualityMetrics: any;
    useCases: any;
    editorValue: any;
    setEditorValue: any;
    transformedData: any;
    graphDataVal: any;
}

export const ReportVMContext = createContext<IReportVMContext>(
    {} as IReportVMContext
);
