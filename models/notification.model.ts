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
        const { Notification, notification_type } = json;
        const {
            id,
            updated_at,
            created_at,
            read_status,
            description,
            dataset_id,
            read_at,
            expire_at,
            notify_at,
        } = Notification;
        return {
            id: Number(id),
            updated_at: DateTime.fromISO(updated_at),
            created_at: DateTime.fromISO(created_at),
            read_status: read_status,
            description: description,
            dataset_id: dataset_id,
            read_at: read_at,
            expire_at: DateTime.fromISO(expire_at),
            notify_at: DateTime.fromISO(notify_at),
            notification_type: notification_type,
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
