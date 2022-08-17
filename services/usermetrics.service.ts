import { posthog } from "posthog-js";
import Dataset from "models/dataset.model";
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
    console.log(query, results);
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
    });
};

export const usereventDatasetDownload = (dataset: Dataset, url: string) => {
    posthog.capture("datafile download", {
        dataset_id: dataset.id,
        datafile_id: url,
    });
};
