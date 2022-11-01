import React, { useState } from "react";
import Select from "react-select";
import { useController } from "react-hook-form";

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

const PotentialUsecases = ({ vm }: { vm: any }) => {
    const [selUsecases, setSelUsecases] = useState<readonly SelectOption[]>([]);

    const formControl = {
        control: vm.form.control,
        name: "potential_usecases",
        rules: {},
    };

    const {
        fieldState: { error },
        field: { onChange, name },
    } = useController({
        ...formControl,
        defaultValue: [],
    });

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
                name={name}
                options={usecaseOptions}
                className="w-96"
                isSearchable={true}
                onChange={(val: readonly SelectOption[]) => {
                    setSelUsecases(val);
                    onChange(val.map((opt) => opt.value));
                }}
            />
        </div>
    );
};

export default PotentialUsecases;
