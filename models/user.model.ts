import { DateTime } from "luxon";

export enum UserType {
  user = "user",
  owner = "owner",
}

class User {
  constructor({
    name,
    email,
    userType,
    isDataOwner,
    organisation,
    updatedAt,
    createdAt,
  }: {
    name: string;
    email: string;
    userType: UserType;
    isDataOwner: Boolean;
    organisation: string;
    updatedAt: DateTime;
    createdAt: DateTime;
  }) {
    this.name = name;
    this.email = email;
    this.userType = userType;
    this.isDataOwner = isDataOwner;
    this.organisation = organisation;
    this.updatedAt = updatedAt;
    this.created_at = createdAt;
  }

  name: string;
  email: string;
  userType: UserType;
  isDataOwner: Boolean;
  organisation: string;
  updatedAt: DateTime;
  created_at: DateTime;

  static fromJson(json: { [key: string]: any }) {
    return new User({
      name: json["name"],
      email: json["email"],
      userType: json["user_type"],
      isDataOwner: json["is_data_owner"],
      organisation: json["organisation"],
      updatedAt: DateTime.fromISO(json["updated_at"]),
      createdAt: DateTime.fromISO(json["created_at"]),
    });
  }
}

export default User;
