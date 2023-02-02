import React, { useState } from "react";
import Select, { components } from "react-select";
import { useController } from "react-hook-form";

interface SelectOption {
    value: string;
    label: string;
    domain?: string;
}

export const domainOptions: SelectOption[] = [
    { value: "envnat", label: "Environment and nature" },
    { value: "govpub", label: "Government and public sector" },
    { value: "hlthcare", label: "Health and care" },
    { value: "popsoc", label: "Population and society" },
];

export const topicOptions: SelectOption[] = [
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

interface DomainTopicsList {
    domain: string;
    topics: string[];
}

export const sanitizeDomainTopics = (data: any) => {
    const domains = data.domains;

    let domain_topics_list: DomainTopicsList[] = [];

    domains.forEach((domain: string) => {
        var domain_option = domainOptions.find(
            (option) => option.value === domain
        );
        if (domain_option != undefined) {
            var domain_topic_labels: string[] = [];
            var topics = data[`topics_${domain}`];
            topics.forEach((topic: string) => {
                var topic_option = topicOptions.find(
                    (option) => option.value === topic
                );
                if (topic_option != undefined) {
                    domain_topic_labels.push(topic_option.label);
                }
            });

            domain_topics_list.push({
                domain: domain_option.label,
                topics: domain_topic_labels,
            });
        }
    });

    return domain_topics_list;
};

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
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <p className="font-light text-xl w-[80%] mb-2">
                    1.What are the domains related to your use case of this
                    dataset?
                </p>
                <Select
                    isMulti
                    name="domains"
                    components={{
                        Control,
                        Placeholder: () => null,
                        IndicatorsContainer,
                    }}
                    options={domainOptions}
                    className=" w-[80%]"
                    isSearchable={true}
                    onChange={(val: readonly SelectOption[]) => {
                        setSelDomains(val);
                        onChange(val.map((opt) => opt.value));
                    }}
                    styles={{
                        indicatorSeparator: (base) => ({
                            ...base,
                            display: "none",
                        }),
                    }}
                />
            </div>
            <div className="mt-[-20px]">
            {selDomains.map((domainOption, idx) => {
                return (
                    <SelTopics key={idx} domainOption={domainOption} vm={vm} />
                );
            })}
            </div>
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
        <div className="mr-20 mt-4">
            <p className="text-xl flex flex-col items-start mb-2 font-light">
                Select applicable topics within domain:{" "}
                <span className="font-normal text-black">
                    {domainOption.label}
                </span>
            </p>
            <Select
                isMulti
                name={`topics-${domainOption.value}`}
                components={{
                    Control,
                    Placeholder: () => null,
                    IndicatorsContainer,
                }}
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

const Control = (props: any) => {
    return (
        <components.Control
            {...props}
            className=" !min-h-[100px] !rounded-lg !border-dtech-main-dark !border-2"
        />
    );
};

const IndicatorsContainer = () => null;
