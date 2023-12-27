import { DateTime } from "luxon";

export enum UserRole {
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

class Organisation {
    constructor({
        organisation_id,
        name,
        sector,
        maxMembers,
        logo_url
    }: {
        organisation_id: number;
        name: string;
        sector: string;
        maxMembers: number;
        logo_url: string;
    }) {
        this.organisation_id = organisation_id;
        this.name = name;
        this.sector = sector;
        this.maxMembers = maxMembers;
        this.logo_url = logo_url
    }
    organisation_id: number;
    name: string;
    sector: string;
    maxMembers: number;
    logo_url: string;

    static fromJson(json: { [key: string]: any }) {
        return new Organisation({
            organisation_id: json["organisation_id"],
            name: json["name"],
            sector: json["sector"],
            maxMembers: json["max_members"],
            logo_url:json["logo_url"]
        });
    }
}
export class Role {
    static REGISTERED_USER = "Registered User";
    static ORGANIZATION_ADMIN = "organisation_administrator";
    static ORGANIZATION_MEMBER = "Organisation Member";
    static ESSENTIAL_SUBSCRIBER = "essential_subscriber";

    constructor({ role_id, name }: { role_id: number; name: string }) {
        this.role_id = role_id;
        this.name = name;
    }
    role_id: number;
    name: string;

    static fromJson(json: { [key: string]: any }) {
        return new Role({
            role_id: json["role_id"],
            name: json["name"],
        });
    }
}

class User {
    constructor({
        id,
        name,
        email,
        role,
        roles,
        roleOther,
        // isDataOwner,
        user_image_url,
        logo_url,
        organisation,
        organisations,
        updatedAt,
        createdAt,
    }: {
        id: number;
        name: string;
        email: string;
        roleOther: UserRole;
        role: UserRole;
        roles: Role[];
        user_image_url: string;
        logo_url: string;
        // isDataOwner: Boolean;
        organisation: string;
        organisations: Organisation[];
        updatedAt: DateTime;
        createdAt: DateTime;
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.roles = roles;
        this.roleOther = roleOther;
        this.user_image_url = user_image_url;
        this.logo_url = logo_url;
        // this.isDataOwner = isDataOwner;
        this.organisation = organisation;
        this.organisations = organisations;
        this.updatedAt = updatedAt;
        this.created_at = createdAt;
    }

    id: number;
    name: string;
    email: string;
    role: UserRole;
    roles: Role[];
    user_image_url: string;
    logo_url: string;
    roleOther: string;
    // isDataOwner: Boolean;
    organisation: string;
    organisations: Organisation[];
    updatedAt: DateTime;
    created_at: DateTime;

    static fromJson(json: { [key: string]: any }) {
        const organisations = (json["organisations"] as any[]).map((orgJson) =>
            Organisation.fromJson(orgJson)
        );
        const roles = (json["roles"] as any[]).map((roleJson) =>
            Role.fromJson(roleJson)
        );

        return new User({
            id: json["id"],
            name: json["name"],
            email: json["email"],
            role: json["role"],
            roles: roles,
            roleOther: json["role_other"],
            user_image_url: json["user_image_url"],
            logo_url: json["logo_url"],
            // isDataOwner: json["is_data_owner"],
            organisation: json["organisation"],
            organisations: organisations,
            updatedAt: DateTime.fromISO(json["updated_at"]),
            createdAt: DateTime.fromISO(json["created_at"]),
        });
    }

    static fromJsonList(jsonList: { [key: string]: any }[]) {
        return jsonList.map((json) => User.fromJson(json));
    }

    static isOrgAdmin(user: User | null): boolean {
        if (!user) {
            return false;
        }
        return user.roles.some((role) => role.name == Role.ORGANIZATION_ADMIN);
    }

    static getOrg(user: User | null): Organisation | null {
        if (!user) {
            return null;
        }
        return user.organisations?.[0];
    }

    static getRole(user: User | null) {
        if (!user) {
            return null;
        }
        return user.roles?.[0];
    }
    static getAllRoles(user: User | null) {
        if (!user) {
            return null;
        }
        return user.roles.map(item=>item.name);
    }

    /**
     * Even though a user can have multiple organisations, at the moment
     * a user is considered to be part of a single org
     * TODO: in the future handle mutliple orgs
     */
    static getOrganisation(user: User | null) {
        if (!user) {
            return null;
        }
        return user.organisations?.[0];
    }

    static updateOrganisation(user: User | null, orgDetails: any) {
        if (!user) {
            return null;
        }
        const org = user.organisations?.[0];
        if (!org) {
            throw Error("User doesnt have an organisation");
        }
        user.organisations[0] = { ...org, ...orgDetails };
        user.logo_url=orgDetails.logo_url
        return user;
    }
}

export default User;
