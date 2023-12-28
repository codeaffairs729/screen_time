import { createContext, useContext, useEffect, useState } from "react";
import {
    ContentState,
    convertFromHTML,
    EditorState,
    convertToRaw,
} from "draft-js";
import html2canvas from "html2canvas";
import { format } from "date-fns";

import jsPDF from "jspdf";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import draftToHtml from "draftjs-to-html";
import { jsonToUseCaseMetrics } from "../insight_section/usecase_section/usecase.vm";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";
import * as htmlToImage from "html-to-image";
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

export const downloadPdf = (
    input: any,
    inputHeightMm: any,
    fileName: string = "download.pdf"
) => {
    html2canvas(input, { useCORS: true }).then((canvas: any) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf =
            inputHeightMm > A4_WIDTH_MM
                ? new jsPDF("p", "mm", [
                      inputHeightMm + PAGE_Y_MARGIN,
                      A4_WIDTH_MM,
                  ])
                : new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(
            imgData,
            "png",
            10,
            4,
            pdfWidth - PAGE_X_MARGIN,
            pdfHeight
        );
        pdf.save(fileName);
    });
};

const imageTag = (src: string, index: any) => {
    return `<img  style='margin-left: auto;margin-right: auto;${
        index ? "width: 500px;" : "width: 300px;"
    }' src='${src}' />`;
};

const formatDate = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
    })} ${date.getFullYear()}`;

const getReportDate = (fromDate: Date, toDate: Date) => {
    return format(fromDate, "dd-MM-yyyy") === format(toDate, "dd-MM-yyyy")
        ? `<p><strong style="padding-left: 100px;">${formatDate(
              fromDate
          )}</strong></p> <p class='break'>&nbsp;</p>`
        : `<p><strong>${formatDate(fromDate)}</strong> - <strong>${formatDate(
              toDate
          )}</strong></p> <p class='break'>&nbsp;</p>`;
};
const getReportTitle = (title: any) => {
    return `<p><strong>Dataset Insights Report</strong></p><p><strong>${title}</strong></p>`;
};
const getImageCanvas = (src: any) => `<img src="${src}"/>`;

const formatSubHeading = (text: string) => `<p> ${text}</p>`;

// const headerSelected = (
//     selected: Array<Object>,
//     byTime: any,
//     byUseCase: any,
//     byRegion: any,
//     byquality: any,
//     bySearchTermsCanvas: any,
//     byUseCasesCanvas: any
// ) => {
//     return selected
//         .map((object: any, index: any) =>
//             object === "Download metrics"
//                 ? `
//                 <p><strong id=label_${index}>${object}</strong>
//                 ${formatSubHeading("Downloads by region")}
//                 ${
//                     byRegion
//                         ? getImageCanvas(byRegion)
//                         : "<h4>No Data Presents for Location.</h4>"
//                 }
//                 </p>
//                 <br/>
//                 <p>
//                 ${formatSubHeading("Downloads by time")}
//                 ${
//                     byTime
//                         ? getImageCanvas(byTime)
//                         : "<h4>No Data Presents for Time.</h4>"
//                 }
//                 <p>
//                 <br/>
//                 ${formatSubHeading("Downloads by role")}
//                 ${
//                     byUseCase
//                         ? getImageCanvas(byUseCase)
//                         : "<h4>No Data Presents for Role.</h4> "
//                 }</p>
//                 <br/>`
//                 : object === "Dataset Quality"
//                 ? `<p><strong id=label_${index}>${object}</strong>
//                 ${
//                     byquality
//                         ? getImageCanvas(byquality)
//                         : `<h4>No Data Presents for ${object}.</h4> `
//                 }
//                 </p>
//                 <br/>`
//                 : object == "Use Cases"
//                 ? `<p><strong id=label_${index}>${object}</strong>
//                 ${
//                     byUseCasesCanvas
//                         ? getImageCanvas(byUseCasesCanvas)
//                         : `<h4>No Data Presents for ${object}.</h4> `
//                 }
//                 </p>
//                 <br/>`
//                 : `<p><strong id=label_${index}>${object}</strong>
//                 ${
//                     bySearchTermsCanvas
//                         ? getImageCanvas(bySearchTermsCanvas)
//                         : `<h4>No Data Presents for ${object}.</h4> `
//                 }
//                 </p>
//                 <br/>`
//         )
//         .join("");
// };

const headerSelected = (
    selected: Array<Object>,
    byTime: any,
    byTimeGraph: any,
    byUseCase: any,
    byRegion: any,
    byLocationTableCanvas: any,
    byquality: any,
    bySearchTermsCanvas: any,
    byUseCasesCanvas: any,
    byUseCaseTableCanvas: any,
    repostHeardingDescription: any,
    qualityMatricImages: any
) => {
    const {
        byQualityMetricCanvas,
        byqualityMetricsAccessibilityCanvas,
        byqualityMetricsContextualityCanvas,
        byqualityMetricsFindabilityCanvas,
        byqualityMetricInteroperabilityCanvas,
        byqualityMetricsReusabilityCanvas,
        byqualityMetricMetaCanvas,
        byqualityMetricsMetaAccessibilityCanvas,
        byqualityMetricsMetaContextualityCanvas,
        byqualityMetricsMetaFindabilityCanvas,
        byqualityMetricsMetaReusabilityCanvas,
        byqualityMetricMetaInteroperabilityCanvas,
    } = qualityMatricImages;
    return selected
        .map((object: any, index: any) =>
            object === "Download metrics"
                ? `
                <p><strong id=label_${index}>${object}</strong></p>
                <br/>
                ${formatSubHeading("Downloads by region")}
                ${
                    byRegion
                        ? getImageCanvas(byRegion) +
                          getImageCanvas(byLocationTableCanvas)
                        : "<h4>No insights available.</h4> <p class='break'>&nbsp;</p>"
                }
            
                <p class='break'>&nbsp;</p>
                ${formatSubHeading("Downloads by time")}
                ${
                    byTime
                        ? getImageCanvas(byTime) +
                          "<br>" +
                          "<br/>" +
                          byTimeGraph
                              ?.map(
                                  (el: { el: any }) =>
                                      `<div>${getImageCanvas(
                                          el
                                      )}</div> <p class='break'>&nbsp;</p>`
                              )
                              .join(" ")
                        : "<h4>No insights available.</h4> <p class='break'>&nbsp;</p>"
                }
                ${formatSubHeading("Downloads by role")}
                ${
                    byUseCase
                        ? getImageCanvas(byUseCase)
                        : "<h4>No insights available.</h4>"
                }</p>
                <p class='break'>&nbsp;</p>`
                : object === "Dataset Quality"
                ? `<br/><p><strong id=label_${index}>${object}</strong></p>  <p>Datafile</p>
                <br/> 
                <h3>Overall Quality</h3>
               ${
                   byquality
                       ? `<p style="font-size:14px; font-weight:400; color: '#333' ">${repostHeardingDescription.insight_datasetQuality_description[1].title}</p>`
                       : ``
               }
                ${
                    byquality
                        ? getImageCanvas(byQualityMetricCanvas) +
                          "<p class='break'>&nbsp;</p>" +
                          `<p><strong>${object}</strong></p <br/>` +
                          "<h3>Accuracy</h3>" +
                          getImageCanvas(byqualityMetricsAccessibilityCanvas) +
                          "<br/>" +
                          "<h3>Clarity</h3>" +
                          getImageCanvas(byqualityMetricsContextualityCanvas) +
                          "<p class='break'>&nbsp;</p>" +
                          `<p><strong>${object}</strong></p <br/>` +
                          "<h3>Consistency</h3>" +
                          getImageCanvas(byqualityMetricsFindabilityCanvas) +
                          "<h3>Readiness</h3>" +
                          getImageCanvas(
                              byqualityMetricInteroperabilityCanvas
                          ) +
                          "<p class='break'>&nbsp;</p>" +
                          `<p><strong>${object}</strong></p <br/>` +
                          ` <p>Metadata</p>` +
                          `<p>${repostHeardingDescription.insight_datasetQuality_description[0].title}<p/>` +
                          "<h3>Overall Quality</h3>" +
                          getImageCanvas(byqualityMetricMetaCanvas) +
                          "<p class='break'>&nbsp;</p>" +
                          "<h3>Accessibility</h3>" +
                          getImageCanvas(
                              byqualityMetricsMetaAccessibilityCanvas
                          ) +
                          "<br/>" +
                          "<h3>Contextuality</h3>" +
                          getImageCanvas(
                              byqualityMetricsMetaContextualityCanvas
                          ) +
                          "<p class='break'>&nbsp;</p>" +
                          `<p><strong>${object}</strong></p <br/>` +
                          "<h3>Findability</h3>" +
                          getImageCanvas(
                              byqualityMetricsMetaFindabilityCanvas
                          ) +
                          "<h3>Interoperability</h3>" +
                          getImageCanvas(
                              byqualityMetricMetaInteroperabilityCanvas
                          ) +
                          "<p class='break'>&nbsp;</p>" +
                          `<p><strong>${object}</strong></p <br/>` +
                          "<h3>Reusability</h3>" +
                          getImageCanvas(
                              byqualityMetricsMetaReusabilityCanvas
                          ) +
                          "<p class='break'>&nbsp;</p>"
                        : `<h4>No insights available.</h4>` +
                          "<p class='break'>&nbsp;</p>"
                }`
                : object == "Use Cases"
                ? `<p><strong id=label_${index}>${object}</strong><br>
                ${
                    byUseCasesCanvas
                        ? `<p style="font-size:14px; font-weight:400; color: '#333'">${repostHeardingDescription.insight_useCase_description}</p>`
                        : ``
                }
                ${
                    byUseCasesCanvas
                        ? getImageCanvas(byUseCasesCanvas) +
                          getImageCanvas(byUseCaseTableCanvas)
                        : `<h4>No insights available.</h4>`
                }
                </p>
                <p class='break'>&nbsp;</p>`
                : `<strong id=label_${index}>${object}</strong> <br>
                <p style="font-size:14px; font-weight:400; color: '#333'">${
                    repostHeardingDescription.insight_searchTerm_description
                }</p>
                ${
                    bySearchTermsCanvas
                        ? getImageCanvas(bySearchTermsCanvas) +
                          "<p class='break'>&nbsp;</p>"
                        : `<h4>No insights available.</h4> <p class='break'>&nbsp;</p>`
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
    const [from, setFrom] = useState(format(new Date(), "yyyy-MM-dd"));
    const [to, setTo] = useState(format(new Date(), "yyyy-MM-dd"));
    const { topic } = useContext(TopicDetailVMContext);
    const { imgUrl } = topic || {};
    const [downloadRef, setDownloadRef] = useState<any>();
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [activeHeaders, setActiveHeaders] = useState<Header[]>(HEADER);
    const [editorState, onEditorStateChange] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [editorValue, setEditorValue] = useState(``);
    const [previewContent, setPreviewContent] = useState("");
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    useEffect(() => {
        setPreviewContent(formatPreviewData());
    }, [editorState]);

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

    // const generateNewReport = async (qualityMetrics: any) => {
    //     setIsGeneratingReport(true);
    //     const qualityMetric: any = document.getElementById("qualityMetrics");
    //     const searchTerms: any = document.getElementById("searchTerms");
    //     const metricesByRegion: any = document.getElementById("map");
    //     const metricByTime: any = document.getElementById("screenshot");
    //     const metricByUseCase: any = document.getElementById("pie");
    //     const useCases: any = document.getElementById("useCases");

    //     const byQualityMetricCanvas =
    //         qualityMetric &&
    //         (await html2canvas(qualityMetric)).toDataURL("image/png");
    //     const bySearchTermsCanvas =
    //         searchTerms &&
    //         (await html2canvas(searchTerms)).toDataURL("image/png");
    //     const byLocationCanvas =
    //         metricesByRegion &&
    //         (await html2canvas(metricesByRegion)).toDataURL("image/png");
    //     const byTimeCanvas =
    //         metricByTime &&
    //         (await html2canvas(metricByTime)).toDataURL("image/png");
    //     const byUseCaseCanvas =
    //         metricByUseCase &&
    //         (await html2canvas(metricByUseCase)).toDataURL("image/png");
    //     const byUseCasesCanvas =
    //         useCases && (await html2canvas(useCases)).toDataURL("image/png");

    //     const data = `
    //             <p style="text-align: center;"><img src="${imgUrl}" width=200 height=150 style="text-align: center;" /></p>
    //             <p></p>
    //             ${getReportTitle(topic?.title)}
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

    //     setEditorValue(data);
    //     setIsGeneratingReport(false);
    // };

    const getImageDataURL = async (element: any, height: number = 500) => {
        if (element) {
            try {
                // const dataUrl = await htmlToImage.toPng(element);
                const dataUrl = await htmlToImage.toPng(element, { height });
                return dataUrl;
            } catch (error) {
                console.error("Error converting HTML to image:", error);
                return null;
            }
        }
        return null;
    };

    const generateNewReport = async (repostHeardingDescription: any) => {
        setIsGeneratingReport(true);

        const qualityMetric: any = document.getElementById("qualityMetrics");
        const qualityMetrics_accessibility: any = document.getElementById(
            "qualityMetrics_accuracy"
        );
        const qualityMetrics_contextuality: any = document.getElementById(
            "qualityMetrics_clarity"
        );
        const qualityMetrics_findability: any = document.getElementById(
            "qualityMetrics_consistency"
        );
        const qualityMetrics_interoperability: any = document.getElementById(
            "qualityMetrics_readiness"
        );
        // const qualityMetrics_reusability:any =  document.getElementById("qualityMetrics_reusability");

        const qualityMetricMeta: any = document.getElementById(
            "qualityMetrics_meta"
        );
        const qualityMetricsMeta_accessibility: any = document.getElementById(
            "qualityMetrics_meta_accessibility"
        );
        const qualityMetricsMeta_contextuality: any = document.getElementById(
            "qualityMetrics_meta_contextuality"
        );
        const qualityMetricsMeta_findability: any = document.getElementById(
            "qualityMetrics_meta_findability"
        );
        const qualityMetricsMeta_interoperability: any =
            document.getElementById("qualityMetrics_meta_interoperability");
        const qualityMetricsMeta_reusability: any = document.getElementById(
            "qualityMetrics_meta_reusability"
        );

        const searchTerms: any = document.getElementById("searchTerms");
        const metricesByRegion: any = document.getElementById("map");
        const metricesByRegionTable: any = document.getElementById("location");
        const metricByTime: any = document.getElementById("screenshot");
        const metricByUseCase: any = document.getElementById("pie");
        const useCases: any = document.getElementById("useCases");
        const useCasesTable: any = document.getElementById("useCasesTable");
        const elementsWithTestId =
            document.querySelectorAll('[id*="time_test"]');

        // const byQualityMetricCanvas = await getImageDataURL(qualityMetric);
        // chartRef.current?.events.on("ready", async () => {
        //     byQualityMetricCanvas = await getImageDataURL(qualityMetric);
        //     // Capture other screenshots here...
        // });
        let byQualityMetricCanvas: any;
        let byqualityMetricsAccessibilityCanvas: any;
        let byqualityMetricsContextualityCanvas: any;
        let byqualityMetricsFindabilityCanvas: any;
        let byqualityMetricInteroperabilityCanvas: any;
        let bySearchTermsCanvas: any;
        let byUsecaseCanvas: any;
        let byTimeGraph: any = [];
        for (let i = 0; i < elementsWithTestId.length / 2; i++) {
            let res = await getImageDataURL(elementsWithTestId[i]);
            byTimeGraph.push(res);
        }

        let qualityMatricImages: any = {};

        let byQualityMetricPromise;
        let byqualityMetricsAccessibilityPromise;
        let byqualityMetricsContextualityPromise;
        let byqualityMetricsFindabilityPromise;
        let byqualityMetricInteroperabilityPromise;

        let byQualityMetricMetaPromise;
        let byqualityMetricsMetaAccessibilityPromise;
        let byqualityMetricsMetaContextualityPromise;
        let byqualityMetricsMetaFindabilityPromise;
        let byqualityMetricMetaInteroperabilityPromise;
        let byqualityMetricMetaReusabilityPromise;
        let bySearchTermsPromise;
        let byUseCasePromise;

        byQualityMetricPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                byQualityMetricCanvas = await getImageDataURL(qualityMetric);
                qualityMatricImages.byQualityMetricCanvas =
                    byQualityMetricCanvas;
                resolve();
            }, 3000);
        });

        byqualityMetricsAccessibilityPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                byqualityMetricsAccessibilityCanvas = await getImageDataURL(
                    qualityMetrics_accessibility,
                    350
                );
                qualityMatricImages.byqualityMetricsAccessibilityCanvas =
                    byqualityMetricsAccessibilityCanvas;
                resolve();
            }, 3000);
        });

        byqualityMetricsContextualityPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                byqualityMetricsContextualityCanvas = await getImageDataURL(
                    qualityMetrics_contextuality,
                    350
                );
                qualityMatricImages.byqualityMetricsContextualityCanvas =
                    byqualityMetricsContextualityCanvas;
                resolve();
            }, 3000);
        });

        byqualityMetricsFindabilityPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                byqualityMetricsFindabilityCanvas = await getImageDataURL(
                    qualityMetrics_findability,
                    350
                );
                qualityMatricImages.byqualityMetricsFindabilityCanvas =
                    byqualityMetricsFindabilityCanvas;
                resolve();
            }, 3000);
        });

        byqualityMetricInteroperabilityPromise = new Promise<void>(
            (resolve) => {
                setTimeout(async () => {
                    byqualityMetricInteroperabilityCanvas =
                        await getImageDataURL(
                            qualityMetrics_interoperability,
                            350
                        );
                    qualityMatricImages.byqualityMetricInteroperabilityCanvas =
                        byqualityMetricInteroperabilityCanvas;
                    resolve();
                }, 3000);
            }
        );

        // meta promises
        byQualityMetricMetaPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                const byqualityMetricMetaCanvas = await getImageDataURL(
                    qualityMetricMeta,
                    350
                );
                qualityMatricImages.byqualityMetricMetaCanvas =
                    byqualityMetricMetaCanvas;
                resolve();
            }, 3000);
        });

        byqualityMetricsMetaAccessibilityPromise = new Promise<void>(
            (resolve) => {
                setTimeout(async () => {
                    const byqualityMetricsMetaAccessibilityCanvas =
                        await getImageDataURL(
                            qualityMetricsMeta_accessibility,
                            350
                        );
                    qualityMatricImages.byqualityMetricsMetaAccessibilityCanvas =
                        byqualityMetricsMetaAccessibilityCanvas;
                    resolve();
                }, 3000);
            }
        );

        byqualityMetricsMetaContextualityPromise = new Promise<void>(
            (resolve) => {
                setTimeout(async () => {
                    const byqualityMetricsMetaContextualityCanvas =
                        await getImageDataURL(
                            qualityMetricsMeta_contextuality,
                            350
                        );
                    qualityMatricImages.byqualityMetricsMetaContextualityCanvas =
                        byqualityMetricsMetaContextualityCanvas;
                    resolve();
                }, 3000);
            }
        );

        byqualityMetricsMetaContextualityPromise = new Promise<void>(
            (resolve) => {
                setTimeout(async () => {
                    const byqualityMetricsMetaContextualityCanvas =
                        await getImageDataURL(
                            qualityMetricsMeta_contextuality,
                            350
                        );
                    qualityMatricImages.byqualityMetricsMetaContextualityCanvas =
                        byqualityMetricsMetaContextualityCanvas;
                    resolve();
                }, 3000);
            }
        );

        byqualityMetricsMetaFindabilityPromise = new Promise<void>(
            (resolve) => {
                setTimeout(async () => {
                    const byqualityMetricsMetaFindabilityCanvas =
                        await getImageDataURL(
                            qualityMetricsMeta_findability,
                            350
                        );
                    qualityMatricImages.byqualityMetricsMetaFindabilityCanvas =
                        byqualityMetricsMetaFindabilityCanvas;
                    resolve();
                }, 3000);
            }
        );

        byqualityMetricMetaInteroperabilityPromise = new Promise<void>(
            (resolve) => {
                setTimeout(async () => {
                    const byqualityMetricMetaInteroperabilityCanvas =
                        await getImageDataURL(
                            qualityMetricsMeta_interoperability,
                            350
                        );
                    qualityMatricImages.byqualityMetricMetaInteroperabilityCanvas =
                        byqualityMetricMetaInteroperabilityCanvas;
                    resolve();
                }, 3000);
            }
        );

        byqualityMetricMetaReusabilityPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                const byqualityMetricsMetaReusabilityCanvas =
                    await getImageDataURL(qualityMetricsMeta_reusability, 350);
                qualityMatricImages.byqualityMetricsMetaReusabilityCanvas =
                    byqualityMetricsMetaReusabilityCanvas;
                resolve();
            }, 3000);
        });

        bySearchTermsPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                const byqualityMetricSearchTermsCanvas = await getImageDataURL(
                    searchTerms,
                    350
                );
                bySearchTermsCanvas = byqualityMetricSearchTermsCanvas;
                resolve();
            }, 3000);
        });

        byUseCasePromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                byUsecaseCanvas = await getImageDataURL(useCases, 350);
                //    bySearchTermsCanvas = byqualityMetricSearchTermsCanvas
                resolve();
            }, 3000);
        });

        await Promise.all([
            byQualityMetricPromise,
            byqualityMetricsAccessibilityPromise,
            byqualityMetricsContextualityPromise,
            byqualityMetricsFindabilityPromise,
            byqualityMetricInteroperabilityPromise,

            byQualityMetricMetaPromise,
            byqualityMetricsMetaAccessibilityPromise,
            byqualityMetricsMetaContextualityPromise,
            byqualityMetricsMetaFindabilityPromise,
            byqualityMetricMetaInteroperabilityPromise,
            byqualityMetricMetaReusabilityPromise,
            bySearchTermsPromise,
            byUseCasePromise,
            //     // ... (other promises)
        ]);

        const byLocationCanvas = await getImageDataURL(metricesByRegion);
        const byLocationTableCanvas = await getImageDataURL(
            metricesByRegionTable
        );
        const byTimeCanvas = await getImageDataURL(metricByTime);
        const byUseCaseCanvas = await getImageDataURL(metricByUseCase);
        const byUseCaseTableCanvas = await getImageDataURL(useCasesTable);
        // const byUseCasesCanvas = await getImageDataURL(useCases);
        // console.log("byUsecase screenshot is ",byUseCasesCanvas)
        // console.log("metricByTime screenshot is ",byUseCasesCanvas)

        const data = `
                <p style="text-align: center;"><img src="${imgUrl}" width=200 height=150 style="text-align: center;" /></p>
                <p></p>
                ${getReportTitle(topic?.title)}
                ${getReportDate(fromDate, toDate)}
                ${headerSelected(
                    selectedHeaders,
                    byTimeCanvas,
                    byTimeGraph,
                    byUseCaseCanvas,
                    byLocationCanvas,
                    byLocationTableCanvas,
                    byQualityMetricCanvas,
                    bySearchTermsCanvas,
                    byUsecaseCanvas,
                    byUseCaseTableCanvas,
                    repostHeardingDescription,
                    qualityMatricImages
                )}
            `;
        setEditorValue(data);
        setIsGeneratingReport(false);
    };

    const formatPreviewData = () => {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const images = convertToRaw(editorState.getCurrentContent()).entityMap;

        Object.values(images).forEach((image, index) => {
            html = html.replace(
                "<figure>📷</figure>",
                imageTag(image?.data?.src, index)
            );
        });

        return html;
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
                    `/v1/topics/quality_metrics?topic_id=${
                        topic?.id
                    }&sort_by=title&page_size=${7}&page_num=${1}`
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
                return Http.get(`/v1/metrics/${topic?.id}/10`);
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
                    `/v1/metrics/${topic?.id}/by_role?from_date=${from}&to_date=${to}`
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
                    `/v1/metrics/${topic?.id}/by_time?from=${format(
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
                    `/v1/metrics/${topic?.id}/by_location?from_date=${from}&to_date=${to}`
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
                return Http.get(`/v1/topics/use_cases/${topic?.id}`);
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

    const fetchData = async (insight_topic_description: any) => {
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

        const promise1 = fetchMetricDataByTime(from, to);
        const promise2 = fetchMetricDataByRoles(from, to);
        const promise3 = fetchMetricDataByLocation(from, to);
        const promise4 = fetchSearchTerms();
        const promise5 = fetchQualityMetrics();
        const promise6 = fetchUseCases();

        await Promise.all([
            promise1,
            promise2,
            promise3,
            promise4,
            promise5,
            promise6,
        ]);
        setIsGeneratingReport(true);
        // .then(() => {
        //     // generateReportContent(qualityMetrics);

        // // generateNewReport(qualityMetrics);
        // setTimeout(() => {
        //     generateNewReport(qualityMetrics);
        //     return true
        // }, 5000);
        // });

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                generateNewReport(insight_topic_description);
                resolve();
            }, 5000);
        });
    };
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
        onEditorStateChange,
        setSelectedHeaders,
        setActiveHeaders,
        setDownloadRef,
        onHeaderSelect,
        selectedHeaders,
        activeHeaders,
        editorState,
        downloadRef,
        previewContent,
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
}

export const ReportVMContext = createContext<IReportVMContext>(
    {} as IReportVMContext
);
