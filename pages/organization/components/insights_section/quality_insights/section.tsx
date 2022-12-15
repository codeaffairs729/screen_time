import Accordian from "components/UI/accordian";
import Table from "../../table";
import MetaRating from "components/UI/metaRating";

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

const TABLE_HEADERS = ["Rank", "Dataset"];
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
const TABLE_DATA = [ROW1, ROW2];

const QualityInsightsBody = ({ selectedLabel }: { selectedLabel: string }) => {
    const items =
        selectedLabel.toLowerCase() == "data file"
            ? DATAFILE_ITEMS
            : METADATA_ITEMS;
    return (
        <div className="ml-16">
            <div className="text-sm text-dtech-dark-grey my-4">
                {selectedLabel.toLocaleLowerCase() == "data file"
                    ? "These scores are determined based on feedback gathered from users."
                    : "These values are determined based on the Metadata Quality Assessment methodology and calculated using algorithms."}
            </div>
            {items.map((label) => (
                <Accordian label={<AccordianLabel label={label} />}>
                    <div className="px-8">
                        <Table
                            tableHeaders={TABLE_HEADERS}
                            tableData={TABLE_DATA}
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
