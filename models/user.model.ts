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
    organisation,
    updatedAt,
    createdAt,
  }: {
    name: string;
    email: string;
    userType: UserType;
    organisation: string;
    updatedAt: DateTime;
    createdAt: DateTime;
  }) {
    this.name = name;
    this.email = email;
    this.user_type = userType;
    this.organisation = organisation;
    this.updatedAt = updatedAt;
    this.created_at = createdAt;
  }

  name: string;
  email: string;
  user_type: UserType;
  organisation: string;
  updatedAt: DateTime;
  created_at: DateTime;

  static fromJson(json: { [key: string]: any }) {
    return new User({
      name: json["name"],
      email: json["email"],
      userType: json["user_type"],
      organisation: json["organisation"],
      updatedAt: DateTime.fromISO(json["updated_at"]),
      createdAt: DateTime.fromISO(json["created_at"]),
    });
  }
}

export default User;
