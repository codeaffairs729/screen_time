import { DateTime } from "luxon";

class MNotification {
    constructor({
        id,
        updated_at,
        created_at,
        read_status,
        description,
        dataset_id,
        read_at,
        expire_at,
        notify_at,
        notification_type,
    }: Notification) {
        this.id = id;
        (this.updated_at = updated_at),
        (this.created_at = created_at),
        (this.read_status = read_status),
        (this.description = description),
        (this.dataset_id = dataset_id),
        (this.read_at = read_at),
        (this.expire_at = expire_at),
        (this.notify_at = notify_at),
        (this.notification_type = notification_type);
    }

    id: number;
    updated_at: DateTime;
    created_at: DateTime;
    read_status: boolean | undefined | null;
    description: string;
    dataset_id: number | undefined;
    read_at: DateTime | undefined | null;
    expire_at: DateTime;
    notify_at: DateTime;
    notification_type: string;

    static fromJson(json: { [key: string]: any }) {
        return {
            id: Number(json["Notification"]["id"]),
            updated_at: DateTime.fromISO(json["Notification"]["updated_at"]),
            created_at: DateTime.fromISO(json["Notification"]["created_at"]),
            read_status: json["Notification"]["read_status"],
            description: json["Notification"]["description"],
            dataset_id: json["Notification"]["dataset_id"],
            read_at: json["Notification"]["read_at"],
            expire_at: DateTime.fromISO(json["Notification"]["expire_at"]),
            notify_at: DateTime.fromISO(json["Notification"]["notify_at"]),
            notification_type: json["notification_type"],
        };
    }

    static fromJsonList(jsonList: { [key: string]: any }[]) {
        return jsonList?.map(MNotification.fromJson);
    }
}

interface Notification {
    id: number;
    updated_at: DateTime;
    created_at: DateTime;
    read_status: boolean | undefined | null;
    description: string;
    dataset_id: number | undefined;
    read_at: DateTime | undefined | null;
    expire_at: DateTime;
    notify_at: DateTime;
    notification_type: string;
}
export default MNotification;
