import { DateTime } from "luxon";

class Topic {
    title: string;
    id: number;
    description: string | null;
    logo_url: string;
    is_favourited: boolean;
    image_credit: string | null;
    dataset_count: number | null;
    data_quality: string | null;
    last_updated: string | null;
    view_count: number | null;
    download_count: number | null;
    most_recently_downloaded: string | null;
    favourite_count: number | null;

    constructor({
        title,
        id,
        description,
        logo_url,
        is_favourited,
        image_credit,
        dataset_count,
        data_quality,
        last_updated,
        view_count,
        download_count,
        most_recently_downloaded,
        favourite_count
    }: TopicDetail) {
        this.title = title;
        this.id = id;
        this.description = description;
        this.logo_url = logo_url;
        this.is_favourited = is_favourited;
        this.image_credit = image_credit;
        this.dataset_count = dataset_count;
        this.data_quality = data_quality;
        this.last_updated = last_updated;
        this.view_count = view_count;
        this.download_count = download_count;
        this.most_recently_downloaded = most_recently_downloaded;
        this.favourite_count = favourite_count;
    }

    static fromJson(json: any) {
        return new Topic({
            title: json.title,
            id: json.id,
            description: json.description,
            logo_url: json.logo_url,
            is_favourited: json.is_favourited,
            image_credit: json.image_credit,
            dataset_count: json.dataset_count,
            data_quality: json.data_quality,
            last_updated: json.last_updated,
            view_count: json.view_count,
            download_count: json.download_count,
            most_recently_downloaded: json.most_recently_downloaded,
            favourite_count: json.favourite_count
        });
    }

    static fromJsonList(jsonList: any[]) {
        return jsonList.map(json => Topic.fromJson(json));
    }
}

export type TopicDetail = {
    title: string;
    id: number;
    description: string | null;
    logo_url: string;
    is_favourited: boolean;
    image_credit: string | null;
    dataset_count: number | null;
    data_quality: string | null;
    last_updated: string | null;
    view_count: number | null;
    download_count: number | null;
    most_recently_downloaded: string | null;
    favourite_count: number | null;
};

export default Topic;
