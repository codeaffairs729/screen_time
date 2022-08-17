// log the pageview with their URL
export const gaPageView = (url) => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
    });
};

// log specific events happening.
// gtag('event', '<event_name>', {<event_params>});
export const gaUserEvent = ({ action, params }) => {
    // ga.event({
    //     action: "search",
    //     params : {
    //       search_term: query
    //     }
    //   })
    window.gtag("event", action, params);
};

// Custom events
// gtag('event',
//      <action: string>, -> value that will appear as the event action in GA Event reports.
//   {
//     'event_category': <category: string = "general">,
//     'event_label': <label>,
//     'value': <value>
//   });
export const gtageventSearchQuery = (query, user) => {
    const user_id = user !== null ? user.email : "anonymous";
    window.gtag("event", "search", {
        search_term: query,
        user_id: user_id,
    });
    console.log(query, user_id);
};

export const gtageventDatasetDownload = (user, dataset, url) => {
    const user_id = user !== null ? user.email : "anonymous";

    window.gtag("event", "dataset_download", {
        user_id: user_id,
        dataset_id: dataset.id,
        datafile_id: url,
    });
    console.log(user_id, dataset.id, url);
};

export const gtageventDatasetView = (user, dataset) => {
    const user_id = user !== null ? user.email : "anonymous";

    window.gtag("event", "dataset_view", {
        user_id: user_id,
        dataset_id: dataset.id,
    });
    console.log(user_id, dataset);
};
