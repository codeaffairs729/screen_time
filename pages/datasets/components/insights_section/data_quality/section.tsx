import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import MetaRating from "components/UI/metaRating";
import { DatasetDetailVMContext, formatLabel, getSelectedLabelIndex } from "pages/datasets/dataset_detail.vm";
import { useContext, useEffect, useState } from "react";
import { QualityInsightsENUM, QualityMetricsVMContext } from "./quality_metric.vm";
import InfoIcon from "components/UI/icons/info_icon";
import { MenuItemType } from "components/UI/drop_down";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
const ITEMS: MenuItemType[] = [{ label: "metadata" }, { label: "data_file" }];

const DatasetQualityInsightsBody = () => {
    const {
        error,
        selectedQualityInsights: selectedLabel,
        fetchQualityMetrics,
        qualityMetrics,
        isFetchingQualityMetrics,
        setSelectedQualityInsights:onChange
    } = useContext(QualityMetricsVMContext);
    // const [selectedLabelState, setSelectedLabelState] = useState(ITEMS[1].label);
    const { dataset } = useContext(DatasetDetailVMContext);
    const { dataFileQuality = {}, metaDataQuality = {} } = qualityMetrics || {};
    const handleChange = (label: string) => {
        // setSelectedLabelState(label);
        onChange && onChange(getSelectedLabelIndex(label, QualityInsightsENUM));
    };

    const menuItems = ITEMS.map((item) => ({
        label: formatLabel(item.label),
        onClick: () => handleChange(item.label),
    }));
    useEffect(() => {
        fetchQualityMetrics && fetchQualityMetrics();
    }, []);
    if (isFetchingQualityMetrics) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        );
    }
    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching qulaity metrics data. Please try again later"
            />
        );
    }
    const ratings = selectedLabel == 0 ? dataFileQuality : metaDataQuality;
console.log(selectedLabel)
    return (
        <div>
            <div className=" w-[350px] text-dtech-main-dark ml-4 my-8 hidden sm:block">Insights &gt; Dataset Quality &gt; {selectedLabel == 0 ? "Data file" : "Metadata"}</div>
            <div className=" sm:hidden py-2 ">

                <Tab.Group>
                    <Tab.List className={"flex flex-row items-center justify-center"}>
                        {menuItems.map((item, index) => {
                            return (
                                <div key={index} className={clsx("w-full text-center focus:text-green-200",)}>
                                    <Tab onClick={item.onClick} className={clsx(selectedLabel != index && " !text-dtech-dark-teal border-b-2 border-b-dtech-dark-teal")} >
                                        {item.label}
                                    </Tab>
                                </div>
                            )
                        })}
                    </Tab.List>
                </Tab.Group>
            </div>
            {selectedLabel == 0 ? (
                <div className="text-center my-4 text-sm text-dtech-dark-grey">
                    The data file quality has been estimated based on user
                    feedback.
                </div>
            ) : (
                <div className="text-center my-4 text-sm text-dtech-dark-grey">
                    The metadata quality of this dataset has been
                    algorithmically estimated based on the &nbsp;
                    <a
                        href="https://data.europa.eu/mqa/methodology?locale=en"
                        className=" text-dtech-main-dark underline "
                    >
                        EU Metadata Quality Assessment method
                    </a>
                    .
                </div>
            )}
           
            <div className=" sm:w-[40%] mx-auto my-4 ">
                {Object.keys(ratings)?.map((item: any, index: number) => {
                    return (
                        <FileQuality
                            items={ratings}
                            item={item}
                            key={index}
                            selectedLabel={selectedLabel}
                            quality={dataset?.detail.dataQuality}
                        />
                    )
                })}
            </div>
        </div>
    );
};
const FileQuality = ({
    item,
    items,
    selectedLabel,
    quality,
}: {
    item: any;
    items: any;
    selectedLabel: any;
    quality: any;
}) => {
    console.log({ items }, { item })
    return (
        <div className="flex flex-row justify-between items-center mt-10 px-2">
            <div className=" flex flex-row">
                <span className="text-[#333333] font-bold sm:text-lg">{getLabel(items[item].label).replace("OverallScore","Overall")}</span>
                <InfoIcon
                    title={items[item].tooltipTitle}
                    className=" ml-2"
                    iconClasses="text-dtech-dark-teal"
                />
            </div>
            <div className=" flex flex-row justify-center items-center">

                <MetaRating
                    label={""}
                    dataQuality={
                        selectedLabel == 1 && items[item].label == "overallScore"
                            ? quality
                            : items[item].rating
                    }
                    className="!flex-row ml-0"
                    labelClass="!text-lg text-dtech-dark-grey"
                    starClassName="sm:!w-6 sm:!h-6 w-4 text-[#4CA7A5]"
                    title={items[item].tooltipTitle}
                    showToolTip={false}
                />
                {items[item].total === undefined ? (
                    " "
                ) : (
                    <div className=" ml-8 text-[#333333]">
                        <span className="mx-2">({items[item].total}</span>
                        <span>{items[item].ratingLabel})</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const getLabel = (title: string) => {
    return `${title[0].toUpperCase()}${title.slice(1)}`;
};
export default DatasetQualityInsightsBody;
