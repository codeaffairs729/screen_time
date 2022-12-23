export enum insightTabIndex {
    dataset_quality,
    search_term,
    download_metrics,
}

export enum searchTerms {
    top_10 = 10,
    top_25 = 25,
}

export enum qualityInsights {
    data_file,
    metadata,
}

export enum download {
    by_region,
    by_time,
    by_user_type,
}

export const formatLabel = (label: string) => {
    const res = label.replaceAll("_", " ");
    return `${res[0].toUpperCase()}${res.slice(1)}`;
};

export const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};
