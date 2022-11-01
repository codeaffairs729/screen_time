import React, { useState } from "react";
import Select from "react-select";

interface SelectOption {
    value: string;
    label: string;
}

const usecaseOptions: SelectOption[] = [
    { value: "publications", label: "Publications" },
    { value: "planning", label: "Planning" },
    { value: "policy", label: "Policy" },
    { value: "software", label: "Software" },
    { value: "data-modelling", label: "Data Modelling" },
    { value: "analysis", label: "Analysis" },
];

const PotentialUsecases = () => {
    const [selUsecases, setSelUsecases] = useState<readonly SelectOption[]>([]);
    return (
        <div className="my-7">
            <p className="font-semibold text-md">
                What are the potential use cases for this data?
            </p>
            <p className="font-semibold text-sm my-2">
                Select from the options below.
            </p>
            <Select
                isMulti
                name="domains"
                options={usecaseOptions}
                className="w-96"
                isSearchable={true}
                onChange={(val: readonly SelectOption[]) => setSelUsecases(val)}
            />
        </div>
    );
};

export default PotentialUsecases;
