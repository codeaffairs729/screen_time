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
    { value: "agrfisfor", label: "Agriculture, fisheries and forestry" },
    { value: "busecofin", label: "Business, economics and finance" },
    { value: "culsprt", label: "Culture, leisure and sport" },
    { value: "crimjus", label: "Crime and justice" },
    { value: "edu", label: "Education" },
    { value: "engy", label: "Energy" },
    { value: "geo", label: "Geography" },
    { value: "sctech", label: "Science and technology" },
    { value: "trinfra", label: "Transport and infrastructure" },
];

export const topicOptions: SelectOption[] = [
    { value: "en1", label: "Biodiversity", domain: "envnat" },
    { value: "en2", label: "Bird ecology", domain: "envnat" },
    { value: "en3", label: "Climate change", domain: "envnat" },
    { value: "en4", label: "Environment", domain: "envnat" },
    { value: "en5", label: "Geology", domain: "envnat" },
    { value: "en6", label: "Marine ecology", domain: "envnat" },
    { value: "en7", label: "Marine and coastal ecosystems", domain: "envnat" },
    { value: "en8", label: "Natural resources", domain: "envnat" },
    { value: "en9", label: "Terrestrial ecosystems", domain: "envnat" },
    { value: "en10", label: "Pollution", domain: "envnat" },
    { value: "en11", label: "Weather", domain: "envnat" },
    { value: "gp1", label: "Civil services", domain: "govpub" },
    { value: "gp2", label: "Legislation", domain: "govpub" },
    { value: "gp3", label: "Policy", domain: "govpub" },
    { value: "gp4", label: "Public sector", domain: "govpub" },
    { value: "ps1", label: "Social development", domain: "popsoc" },
    { value: "ps2", label: "Demographics", domain: "popsoc" },
    { value: "pp1", label: "Agriculture", domain: "agrfisfor" },
    { value: "pp2", label: "Fisheries and aquaculture", domain: "agrfisfor" },
    { value: "pp3", label: "Forestry", domain: "agrfisfor" },
    { value: "bc1", label: "Business", domain: "busecofin" },
    { value: "bc2", label: "Economics", domain: "busecofin" },
    { value: "bc3", label: "Finance", domain: "busecofin" },
    { value: "bc4", label: "Tenders and contracts", domain: "busecofin" },
    { value: "cl1", label: "Culture", domain: "culsprt" },
    { value: "cl2", label: "Leisure", domain: "culsprt" },
    { value: "cl3", label: "Tourism", domain: "culsprt" },
    { value: "cl4", label: "Sport", domain: "culsprt" },
    { value: "cj1", label: "Crime", domain: "crimjus" },
    { value: "cj2", label: "Law", domain: "crimjus" },
    { value: "cj3", label: "Law enforcement", domain: "crimjus" },
    { value: "cj4", label: "Security", domain: "crimjus" },
    { value: "ed1", label: "Curricula", domain: "edu" },
    { value: "ed2", label: "Learning", domain: "edu" },
    { value: "ed3", label: "Schools", domain: "edu" },
    { value: "ed4", label: "Schools", domain: "edu" },
    { value: "ed5", label: "Teaching", domain: "edu" },
    { value: "ed6", label: "Training", domain: "edu" },
    { value: "eg1", label: "Decarbonisation and net zero", domain: "engy" },
    { value: "eg2", label: "Electricity", domain: "engy" },
    { value: "eg3", label: "Energy generation", domain: "engy" },
    { value: "eg4", label: "Energy policy", domain: "engy" },
    {
        value: "eg5",
        label: "Energy transmission and distribution",
        domain: "engy",
    },
    { value: "eg6", label: "Energy transition", domain: "engy" },
    { value: "eg7", label: "Renewable energy", domain: "engy" },
    { value: "eg8", label: "Energy use", domain: "engy" },
    { value: "eg9", label: "Fossil fuels", domain: "engy" },
    {
        value: "ge1",
        label: "Addresses, postcodes and boundaries",
        domain: "geo",
    },
    { value: "ge2", label: "Geospatial", domain: "geo" },
    { value: "ge3", label: "Mapping", domain: "geo" },
    { value: "ge4", label: "Remote sensing", domain: "geo" },
    { value: "hc1", label: "Alcohol and drugs", domain: "hlthcare" },
    { value: "hc2", label: "Cancer", domain: "hlthcare" },
    { value: "hc3", label: "Childbirth", domain: "hlthcare" },
    { value: "hc4", label: "Diseases and disorders", domain: "hlthcare" },
    { value: "hc5", label: "Health care", domain: "hlthcare" },
    { value: "hc6", label: "Mental health", domain: "hlthcare" },
    { value: "hc7", label: "Medical diagnosis", domain: "hlthcare" },
    { value: "hc8", label: "Mortality", domain: "hlthcare" },
    { value: "hc9", label: "Oral and dental health", domain: "hlthcare" },
    { value: "hc10", label: "Public health", domain: "hlthcare" },
    { value: "hc11", label: "Sexual health", domain: "hlthcare" },
    { value: "sc1", label: "Science", domain: "sctech" },
    { value: "sc2", label: "Technology", domain: "sctech" },
    { value: "sc3", label: "Digital society", domain: "sctech" },
    { value: "ti1", label: "Aviation and airports", domain: "trinfra" },
    { value: "ti2", label: "Cars, buses, and trains", domain: "trinfra" },
    { value: "ti3", label: "Infrastructure", domain: "trinfra" },
    { value: "ti4", label: "Roads and rail", domain: "trinfra" },
    { value: "ti5", label: "Shipping and freight", domain: "trinfra" },
    {
        value: "ti6",
        label: "Urban and environmental planning",
        domain: "trinfra",
    },
    { value: "ti7", label: "Walking and cycling", domain: "trinfra" },
    {
        value: "ti8",
        label: "Waste generation and management",
        domain: "trinfra",
    },
    { value: "ti9", label: "Water resource management", domain: "trinfra" },
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
                        <SelTopics
                            key={idx}
                            domainOption={domainOption}
                            vm={vm}
                        />
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

/**

 */
