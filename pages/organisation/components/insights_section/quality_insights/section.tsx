import Accordian from "components/UI/accordian";
import Table from "../../table";
import MetaRating from "components/UI/metaRating";
import BarGraph from "components/UI/BarGraph";
import Loader from "components/UI/loader";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { useContext } from "react";

const METADATA_ITEMS = [
    "Overall score",
    "Findability",
    "Accessibility",
    "Reusability",
    "Contextuality",
    "Interoperability",
];

const DATAFILE_ITEMS = [
    "Overall score",
    "Accuracy",
    "Consistency",
    "Clarity",
    "Readiness",
];

const TABLE_HEADERS = ["Score", "Dataset"];
const ROW1 = ["1", "2", "3"];
const ROW2 = [
    {
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
    },
    {
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
    },
    {
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
    },
];
// const TABLE_DATA = [ROW1, ROW2];
const STARS = [
    [
        { name: 1, rating: 10 },
        { name: 2, rating: 20 },
        { name: 3, rating: 30 },
        { name: 4, rating: 20 },
        { name: 5, rating: 10 },
    ],
    [
        { name: 1, rating: 10 },
        { name: 2, rating: 20 },
        { name: 3, rating: 50 },
        { name: 4, rating: 20 },
        { name: 5, rating: 10 },
    ],
    [
        { name: 1, rating: 50 },
        { name: 2, rating: 20 },
        { name: 3, rating: 30 },
        { name: 4, rating: 20 },
        { name: 5, rating: 10 },
    ],
    [
        { name: 1, rating: 10 },
        { name: 2, rating: 20 },
        { name: 3, rating: 30 },
        { name: 4, rating: 20 },
        { name: 5, rating: 10 },
    ],
    [
        { name: 1, rating: 20 },
        { name: 2, rating: 10 },
        { name: 3, rating: 20 },
        { name: 4, rating: 20 },
        { name: 5, rating: 10 },
    ],
    [
        { name: 1, rating: 10 },
        { name: 2, rating: 10 },
        { name: 3, rating: 20 },
        { name: 4, rating: 20 },
        { name: 5, rating: 10 },
    ],
];

const DisplayDataset = ({ title, description }: any) => (
    <div>
        <span className="text-sm font-medium text-dtech-dark-grey">
            {title}
        </span>
        <span className="text-sm text-dtech-dark-grey limit-line">
            {description}
        </span>
    </div>
);
const QualityInsightsBody = ({ selectedLabel }: { selectedLabel: number }) => {
    const items = selectedLabel == 0 ? DATAFILE_ITEMS : METADATA_ITEMS;

    const tableData = ROW2.map((data, index) => [
        ROW1[index],
        <DisplayDataset
            key={index}
            title={data.title}
            description={data.description}
        />,
    ]);
    const barDataKey = Object.keys(STARS[0][0])[1];
    const labelListDatakey = Object.keys(STARS[0][0])[0];

    const {
        isLoading,
        dataFileQuality,
        metaDataQulaity,
        fectchDataFileQuality,
        fectchDownloadMetrics,
    } = useContext(OrganisationDetailVMContext);

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    /*TODO
        - Create data structure for the same
        - Create api for the same
        - Fetch data through api
     */

    return (
        <div className="ml-16">
            <div className="text-sm text-dtech-dark-grey my-4">
                {selectedLabel == 0
                    ? "These scores are determined based on feedback gathered from users."
                    : "These values are determined based on the Metadata Quality Assessment methodology and calculated using algorithms."}
            </div>
            {items.map((label, index) => (
                <Accordian label={<AccordianLabel label={label} />} key={index}>
                    <div>
                        <div className="px-8">
                            <Table
                                tableHeaders={TABLE_HEADERS}
                                tableData={tableData}
                                cellPadding={3}
                            />
                        </div>
                        <BarGraph
                            data={STARS[index]}
                            strokeWidthAxis={2}
                            strokeWidthLabelList={0}
                            className="font-medium mb-6 mt-6"
                            xLabel=""
                            yLabel=""
                            xvalue="Star rating"
                            yvalue="Datasets"
                            barDatakey={barDataKey}
                            labelListDatakey={labelListDatakey}
                        />
                    </div>
                </Accordian>
            ))}
        </div>
    );
};

const AccordianLabel = ({ label }: { label: string }) => {
    return (
        <MetaRating
            label={label}
            dataQuality={3}
            className="!flex-row ml-0"
            labelClass="!text-lg text-dtech-dark-grey"
            starClassName="!w-6 !h-6 text-[#5F5F63]"
        />
    );
};

export default QualityInsightsBody;
