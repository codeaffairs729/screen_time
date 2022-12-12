import Accordian from "components/UI/accordian";
import MetaRating from "components/UI/metaRating";
import DataQualityInsights from "./quality_insights";

const Insights = () => {
    return (
        <div>
            <div className="mb-6 ml-10">
                <DataQualityInsights />
            </div>
            <div className="ml-16">
                <div className="text-sm text-dtech-dark-grey my-4">
                    These values are determined based on the Metadata Quality
                    Assessment methodology and calculated using algorithms.
                </div>
                <Accordian label={<AccordianLabel label="Overall score" />}>
                    <div className="max-w-[600px] p-6">
                        These values are determined based on the Metadata
                        Quality Assessment methodology and calculated using
                        algorithms.
                    </div>
                </Accordian>

                <Accordian label={<AccordianLabel label="Findability" />}>
                    <div className="max-w-[600px] p-6">
                        These values are determined based on the Metadata
                        Quality Assessment methodology and calculated using
                        algorithms.
                    </div>
                </Accordian>

                <Accordian label={<AccordianLabel label="Accessibility" />}>
                    <div className="max-w-[600px] p-6">
                        These values are determined based on the Metadata
                        Quality Assessment methodology and calculated using
                        algorithms.
                    </div>
                </Accordian>

                <Accordian label={<AccordianLabel label="Reusability" />}>
                    <div className="max-w-[600px] p-6">
                        These values are determined based on the Metadata
                        Quality Assessment methodology and calculated using
                        algorithms.
                    </div>
                </Accordian>

                <Accordian label={<AccordianLabel label="Interoperability" />}>
                    <div className="max-w-[600px] p-6">
                        These values are determined based on the Metadata
                        Quality Assessment methodology and calculated using
                        algorithms.
                    </div>
                </Accordian>

                <Accordian label={<AccordianLabel label="Interoperability" />}>
                    <div className="max-w-[600px] p-6">
                        These values are determined based on the Metadata
                        Quality Assessment methodology and calculated using
                        algorithms.
                    </div>
                </Accordian>
            </div>
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
export default Insights;
