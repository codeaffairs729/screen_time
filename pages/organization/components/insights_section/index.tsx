import { useState } from "react";
import QualityInsightsHeader from "./quality_insights/header";
import QualityInsightsSection from "./quality_insights/section";

const Insights = () => {
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<string>("");
    return (
        <div>
            <div className="mb-6 ml-10">
                <QualityInsightsHeader
                    selectedLabel={selectedQualityInsights}
                    onChange={setSelectedQualityInsights}
                />
            </div>
            <QualityInsightsSection selectedLabel={selectedQualityInsights} />
        </div>
    );
};

export default Insights;
