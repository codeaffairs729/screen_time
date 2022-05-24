import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Function to find the duplicates
const toFindDuplicates = (arr: string[]) =>
    arr.filter((item, index) => arr.indexOf(item) !== index);

function checkDuplicate(submitSynonyms: any) {
    // Validation for duplicate input
    var validity = true;
    const lowerSynonyms: string[] = [];
    Object.keys(submitSynonyms).forEach((key, idx) => {
        if (submitSynonyms[key]) {
            lowerSynonyms.push(submitSynonyms[key].toLowerCase());
        }
    });
    const duplicatesSynonyms = toFindDuplicates(lowerSynonyms);
    if (duplicatesSynonyms.length != 0) {
        validity = false;
    }
    return validity;
}

const SubmitSynonymVM = (
    user: any,
    keyword: string,
    activeDomain: string,
    setKeyword: (arg0: string) => void
) => {
    const form = useForm();

    // use the API for submitting the synonym
    const {
        execute: executeSubmitSynonym,
        isLoading: isSubmittingSynonymKeyword,
    } = useHttpCall();
    const submitSynonymKeyword = (data: any) => {
        // Validation for duplicate input
        if (checkDuplicate(data)) {
            var user_synonyms: any[] = [];
            for (const [key, value] of Object.entries(data)) {
                if (value !== "") {
                    user_synonyms.push(value);
                }
            }
            executeSubmitSynonym(
                () =>
                    Http.post(
                        `/add?domain=${activeDomain}`,
                        {
                            keyword: keyword,
                            keyword_domain_name: activeDomain,
                            user_id: user.email,
                            user_synonyms: user_synonyms,
                        },
                        {
                            baseUrl: "http://127.0.0.1:8000/api",
                        }
                    ),
                {
                    onSuccess: (res) => {
                        console.log(res);
                        setKeyword(res.keyword);
                    },
                    onError: (e) =>
                        toast.error(
                            "Something went wrong while adding the data source."
                        ),
                }
            );
        } else {
            toast.error("Duplicates in synonym entries not allowed.");
        }
    };

    return { form, submitSynonymKeyword, isSubmittingSynonymKeyword };
};

export default SubmitSynonymVM;
