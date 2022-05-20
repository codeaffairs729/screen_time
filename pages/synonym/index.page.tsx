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
import PageLoadVM from "./initial_load.vm";
import NewKeywordVM from "./new_keyword.vm";
import FlagKeywordVM from "./flag_keyword.vm";
import { useEffect, useState } from "react";
import DomainDropdown from "./components/domain_dropdown";

const KeywordSynonym = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [pageLoadState, setPageLoadState] = useState(true);
    const [domainOptions, setDomainOptions] = useState([
        "health",
        "environment",
        "general",
    ]);
    const [activeDomain, setActiveDomain] = useState(domainOptions[0]);
    const submit_synonym_vm = SubmitSynonymVM();
    const page_load_vm = PageLoadVM();
    const new_keyword_vm = NewKeywordVM();
    const flag_keyword_vm = FlagKeywordVM();

    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    const handleChangeDomain = (d: string) => {
        setActiveDomain(d);
    };

    const handleSkipKeyword = () => {
        console.log("skip");
    };

    const handleFlagKeyword = () => {
        console.log("flag");
    };

    return (
        <DefaultLayout>
            <div className="h-[calc(100vh-var(--nav-height))] flex flex-col">
                <div className="text-center">
                    <DomainDropdown
                        items={domainOptions}
                        activeItem={activeDomain}
                        changeFunc={(d) => handleChangeDomain(d)}
                    />
                    <WordDisplay
                        keyword="Rubella"
                        skipFunc={handleSkipKeyword}
                    />

                    <span className="mt-4 space-x-3">
                        <i className="mr-1 text-sm underline text-gray-500">
                            Click the word above to skip!
                        </i>{" "}
                        <button
                            className="ml-5 mr-1 mt-0.5 text-2xl text-gray-500"
                            onClick={handleFlagKeyword}
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
                                control: submit_synonym_vm.form.control,
                                name: "synonym_1",
                                rules: {},
                            }}
                            placeholder="Enter synonym..."
                            type="text"
                        />
                    </FormRow>
                    <FormRow label="Synonym 2">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: submit_synonym_vm.form.control,
                                name: "synonym_2",
                                rules: {},
                            }}
                            placeholder="Enter synonym..."
                            type="text"
                        />
                    </FormRow>
                    <FormRow label="Synonym 3">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: submit_synonym_vm.form.control,
                                name: "synonym_3",
                                rules: {},
                            }}
                            placeholder="Enter synonym..."
                            type="text"
                        />
                    </FormRow>
                    <PrimaryBtn
                        className="mt-8 bg-dtech-primary-dark max-w-[150px]"
                        label="Submit"
                        isLoading={submit_synonym_vm.isSubmittingSynonymKeyword}
                        onClick={submit_synonym_vm.form.handleSubmit(
                            submit_synonym_vm.submitSynonymKeyword
                        )}
                    />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(KeywordSynonym);
