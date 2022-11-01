import React, { useState } from "react";
import Select from "react-select";
import { useController } from "react-hook-form";

interface SelectOption {
    value: string;
    label: string;
    domain?: string;
}

const domainOptions: SelectOption[] = [
    { value: "envnat", label: "Environment and nature" },
    { value: "govpub", label: "Government and public sector" },
    { value: "hlthcare", label: "Health and care" },
    { value: "popsoc", label: "Population and society" },
];

const topicOptions: SelectOption[] = [
    { value: "en1", label: "Air quality", domain: "envnat" },
    { value: "en2", label: "Biodiversity", domain: "envnat" },
    { value: "gp1", label: "Civil services", domain: "govpub" },
    { value: "gp2", label: "Legislation", domain: "govpub" },
    { value: "hc1", label: "Diseases and disorders", domain: "hlthcare" },
    { value: "hc2", label: "Health care", domain: "hlthcare" },
    { value: "hc3", label: "Alcohol and drugs", domain: "hlthcare" },
    { value: "ps1", label: "Social development", domain: "popsoc" },
    { value: "ps2", label: "Demographics", domain: "popsoc" },
];

const DomainsTopics = ({ vm }: { vm: any }) => {
    const [selDomains, setSelDomains] = useState<readonly SelectOption[]>([]);

    const formControl = {
        control: vm.form.control,
        name: "domains",
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
        <div>
            <p className="font-semibold text-md">
                What are the domains and topics related to your potential use
                case?
            </p>
            <p className="font-semibold text-sm my-2 text-dtech-secondary-dark">
                Select Domains
            </p>
            <Select
                isMulti
                name="domains"
                options={domainOptions}
                className="w-96"
                isSearchable={true}
                onChange={(val: readonly SelectOption[]) => {
                    setSelDomains(val);
                    onChange(val.map((opt) => opt.value));
                }}
            />
            {selDomains.map((domainOption, idx) => {
                return (
                    <SelTopics key={idx} domainOption={domainOption} vm={vm} />
                );
            })}
        </div>
    );
};

const SelTopics = ({
    domainOption,
    vm,
}: {
    domainOption: SelectOption;
    vm: any;
}) => {
    const formControl = {
        control: vm.form.control,
        name: `topics_${domainOption.value}`,
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
        <div className="my-3">
            <p className="text-sm">
                Select applicable topics within domain:{" "}
                <span className="font-semibold text-dtech-secondary-dark">
                    {domainOption.label}
                </span>
            </p>
            <Select
                isMulti
                name={`topics-${domainOption.value}`}
                options={topicOptions.filter((topicOption) => {
                    return topicOption.domain == domainOption.value;
                })}
                className="w-96"
                isSearchable={true}
                onChange={(val: readonly SelectOption[]) =>
                    onChange(val.map((opt) => opt.value))
                }
            />
        </div>
    );
};

export default DomainsTopics;
