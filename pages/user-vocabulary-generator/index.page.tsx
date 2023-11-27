import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import TextField from "components/UI/form/text_field";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import FormRow from "./components/form_row";
import InfoIcon from "components/UI/icons/info_icon";
import WordDisplay from "./components/word_display";
import { useSelector } from "react-redux";
import { RootState } from "store";
import SubmitSynonymVM from "./synonym_submission.vm";
import PageLoadVM from "./page_load.vm";
import NewKeywordVM from "./new_keyword.vm";
import FlagKeywordVM from "./flag_keyword.vm";
import { useState } from "react";
import DomainDropdown from "./components/domain_dropdown";

const KeywordSynonym = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [keyword, setKeyword] = useState("general");
    const [keywordDomains, setKeywordDomains] = useState(["general"]);
    const [activeDomain, setActiveDomain] = useState(keywordDomains[0]);
    const {
        form: ss_vm_form,
        submitSynonymKeyword,
        isSubmittingSynonymKeyword,
    } = SubmitSynonymVM(user, keyword, activeDomain, setKeyword);
    const { isPageLoading } = PageLoadVM(
        setKeyword,
        setKeywordDomains,
        setActiveDomain
    );
    const { fetchNewKeyword, isFetchingNewkeyword } = NewKeywordVM(
        activeDomain,
        setKeyword
    );
    const { registerFlagKeyword, isFlaggingKeyword } = FlagKeywordVM(
        user,
        keyword,
        activeDomain,
        setKeyword
    );

    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout>
            <div className="h-[calc(100vh-var(--nav-height))] flex flex-col">
                <div className="text-center">
                    <DomainDropdown
                        items={keywordDomains}
                        activeItem={activeDomain}
                        changeFunc={(d) => {
                            setActiveDomain(d);
                            fetchNewKeyword();
                        }}
                    />
                    <WordDisplay
                        keyword={keyword}
                        skipFunc={() => fetchNewKeyword()}
                    />

                    <span className="mt-4 space-x-3">
                        <i className="mr-1 text-sm underline text-gray-500">
                            Click the word above to skip!
                        </i>{" "}
                        <button
                            className="ml-5 mr-1 mt-0.5 text-2xl text-gray-500"
                            onClick={() => registerFlagKeyword()}
                        >
                            &#9872;
                        </button>{" "}
                        <InfoIcon title="Flag if not a domain specific word." />
                    </span>
                </div>
                <div className="grow flex flex-col items-center justify-center">
                    <p className="my-10">
                        Please submit up to 3 related words for the term above.
                    </p>
                    <FormRow label="Synonym 1">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: ss_vm_form.control,
                                name: "synonym_1",
                                rules: {
                                    required:
                                        "At least 1 synonym must be entered.",
                                    pattern: {
                                        value: /^([^0-9#$£]*)$/,
                                        message: "Contins illegal chatacters.",
                                    },
                                },
                            }}
                            placeholder="Enter synonym..."
                            type="text"
                        />
                    </FormRow>
                    <FormRow label="Synonym 2">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: ss_vm_form.control,
                                name: "synonym_2",
                                rules: {
                                    pattern: {
                                        value: /^([^0-9#$£]*)$/,
                                        message: "Contins illegal chatacters.",
                                    },
                                },
                            }}
                            placeholder="Enter synonym..."
                            type="text"
                        />
                    </FormRow>
                    <FormRow label="Synonym 3">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: ss_vm_form.control,
                                name: "synonym_3",
                                rules: {
                                    pattern: {
                                        value: /^([^0-9#$£]*)$/,
                                        message: "Contins illegal chatacters.",
                                    },
                                },
                            }}
                            placeholder="Enter synonym..."
                            type="text"
                        />
                    </FormRow>
                    <PrimaryBtn
                        // className="mt-8 bg-dtech-primary-dark max-w-[150px]"
                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white !rounded-full active:animate-ping max-w-[120px] my-4 !py-[12px] !px-[16px]"
                        label="Submit"
                        isLoading={isSubmittingSynonymKeyword}
                        onClick={ss_vm_form.handleSubmit(submitSynonymKeyword)}
                    />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(KeywordSynonym);
