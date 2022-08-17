import { posthog } from "posthog-js";

// log the pageview with their URL
export const gaPageView = (url) => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
    });
};

export const usereventSearchQuery = (query, user) => {
    const user_id = user !== null ? user.email : "anonymous";
    window.gtag("event", "search", {
        search_term: query,
        user_id: user_id,
    });

    // PostHog
    posthog.capture("search query", { search_term: query });
};

export const usereventSearchQueryResults = (query, user) => {
    const user_id = user !== null ? user.email : "anonymous";
    window.gtag("event", "search", {
        search_term: query,
        user_id: user_id,
    });

    // PostHog
    posthog.capture("search query results", { search_term: query });
};

export const usereventDatasetDownload = (user, dataset, url) => {
    const user_id = user !== null ? user.email : "anonymous";

    window.gtag("event", "dataset_download", {
        user_id: user_id,
        dataset_id: dataset.id,
        datafile_id: url,
    });

    // PostHog
    posthog.capture("datafile download", {
        dataset_id: dataset.id,
        datafile_id: url,
    });
};

export const usereventDatasetView = (user, dataset) => {
    const user_id = user !== null ? user.email : "anonymous";

    window.gtag("event", "dataset_view", {
        user_id: user_id,
        dataset_id: dataset.id,
    });

    // PostHog
    posthog.capture("dataset view", {
        dataset_id: dataset.id,
    });
};
