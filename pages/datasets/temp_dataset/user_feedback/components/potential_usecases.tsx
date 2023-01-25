import React, { useState } from "react";
import Select, { components } from "react-select";
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
            <p className="font-light text-xl w-[70%] mb-2 ">
                2.What are the potential use cases for this data?
            </p>
            <Select
                isMulti
                name={name}
                options={usecaseOptions}
                className=" w-[45%]"
                isSearchable={true}
                components={{
                    Control,
                    Placeholder: () => null,
                    IndicatorsContainer,
                }}
                onChange={(val: readonly SelectOption[]) => {
                    setSelUsecases(val);
                    onChange(val.map((opt) => opt.value));
                }}
            />
        </div>
    );
};

export default PotentialUsecases;

const Control = (props: any) => {
    return (
        <components.Control
            {...props}
            className=" !min-h-[100px] !rounded-lg  !border-dtech-main-dark !border-2 "
        />
    );
};

const IndicatorsContainer = () => null;
