import { posthog } from "posthog-js";
import Dataset from "models/dataset.model.v4";
import User from "models/user.model";

export const usereventLogin = (user: User) => {
    posthog.identify(
        user.id.toString(), // distinct_id, required
        {
            email: user.email,
            role: user.role,
        }, // $set, optional
        {} // $set_once, optional
    );
};

export const usereventLogout = () => {
    posthog.reset();
};

export const usereventSearchQuery = (query: string) => {
    posthog.capture("search query", { search_term: query });
};

export const usereventSearchQueryResults = (
    query: string | string[] | undefined,
    results: number[]
) => {
    posthog.capture("search query results", {
        search_term: query,
        search_term_results: results,
    });
};

export const usereventDatasetView = (
    dataset: Dataset,
    query: string | string[] | undefined
) => {
    posthog.capture("dataset view", {
        dataset_id: dataset.id,
        search_term: query,
        provider_uuid: dataset.owner.uuid
    });
};

export const usereventDatasetDownload = (dataset: Dataset, url: string) => {
    posthog.capture("datafile download", {
        dataset_id: dataset.id,
        datafile_id: url,
        provider_uuid: dataset.owner.uuid
    });
};

export const usereventDatasetDownloadSearchTerms = (dataset: Dataset, query:string) => {
    posthog.capture("datafile download search term", {
        dataset_id: dataset.id,
        search_term: query,
        provider_uuid: dataset.owner.uuid
    });
};
