import { DateTime } from "luxon";

export enum Role {
    "Data Enthusiast" = "data_enthusiast",
    "Data Analyst" = "data_analyst",
    "Data Scientist" = "data_scientist",
    "Business Analyst" = "business_analyst",
    "Researcher" = "researcher",
    "Policy Expert" = "policy_expert",
    "Entrepreneur" = "entrepreneur",
    "Developer" = "developer",
    "Other" = "other",
}

class User {
    constructor({
        id,
        name,
        email,
        role,
        roleOther,
        isDataOwner,
        organisation,
        updatedAt,
        createdAt,
    }: {
        id: number;
        name: string;
        email: string;
        roleOther: Role;
        role: Role;
        isDataOwner: Boolean;
        organisation: string;
        updatedAt: DateTime;
        createdAt: DateTime;
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.roleOther = roleOther;
        this.isDataOwner = isDataOwner;
        this.organisation = organisation;
        this.updatedAt = updatedAt;
        this.created_at = createdAt;
    }

    id: number;
    name: string;
    email: string;
    role: Role;
    roleOther: string;
    isDataOwner: Boolean;
    organisation: string;
    updatedAt: DateTime;
    created_at: DateTime;

    static fromJson(json: { [key: string]: any }) {
        return new User({
            id: json["id"],
            name: json["name"],
            email: json["email"],
            role: json["role"],
            roleOther: json["role_other"],
            isDataOwner: json["is_data_owner"],
            organisation: json["organisation"],
            updatedAt: DateTime.fromISO(json["updated_at"]),
            createdAt: DateTime.fromISO(json["created_at"]),
        });
    }
}

export default User;
