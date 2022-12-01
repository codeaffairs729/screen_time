import { DateTime } from "luxon";

class SearchMetrics {
    constructor({
        displays,
        views,
        downloads,
        lastDownloaded,
    }: {
        displays: Number;
        views: Number;
        downloads: Number;
        lastDownloaded: DateTime;
    }) {
        this.displays = displays;
        this.views = views;
        this.downloads = downloads;
        this.lastDownloaded = lastDownloaded;
    }

    displays: Number;
    views: Number;
    downloads: Number;
    lastDownloaded: DateTime;

    static fromJson(json: { [key: string]: any }) {
        if (!json) {
            return null;
        }
        return new SearchMetrics({
            displays: json["displays"],
            views: json["views"],
            downloads: json["downloads"],
            lastDownloaded: json["last_downloaded"],
        });
    }
}

class DatasetStats {
    constructor({
        datasetId,
        likeCount,
        isLiked,
        dislikeCount,
        isDisliked,
        favouriteCount,
        isFavourited,
        confidence,
        searchMetrics,
    }: {
        datasetId: Number;
        likeCount: Number;
        isLiked: boolean;
        dislikeCount: Number;
        isDisliked: boolean;
        favouriteCount: Number;
        isFavourited: boolean;
        confidence: Number;
        searchMetrics: SearchMetrics | null;
    }) {
        this.datasetId = datasetId;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
        this.dislikeCount = dislikeCount;
        this.isDisliked = isDisliked;
        this.favouriteCount = favouriteCount;
        this.isFavourited = isFavourited;
        this.confidence = confidence;
        this.searchMetrics = searchMetrics;
    }

    datasetId: Number;
    likeCount: Number;
    isLiked: boolean;
    dislikeCount: Number;
    isDisliked: boolean;
    favouriteCount: Number;
    isFavourited: boolean;
    confidence: Number;
    searchMetrics: SearchMetrics | null;

    static fromJson(json: { [key: string]: any }) {
        return new DatasetStats({
            datasetId: json["dataset_id"],
            likeCount: json["like_count"],
            isLiked: json["is_liked"],
            dislikeCount: json["dislike_count"],
            isDisliked: json["is_disliked"],
            favouriteCount: json["favourite_count"],
            isFavourited: json["is_favourited"],
            confidence: json["confidence"],
            searchMetrics: SearchMetrics.fromJson(json["search_metrics"]),
        });
    }
}

export default DatasetStats;
