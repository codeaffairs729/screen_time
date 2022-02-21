import { DateTime } from "luxon";

export enum UserType {
  user = "user",
  owner = "owner",
}

class User {
  constructor({
    email,
    user_type,
    organisation,
    updatedAt,
    created_at,
  }: {
    email: string;
    user_type: UserType;
    organisation: string;
    updatedAt: DateTime;
    created_at: DateTime;
  }) {
    this.email = email;
    this.user_type = user_type;
    this.organisation = organisation;
    this.updatedAt = updatedAt;
    this.created_at = created_at;
  }

  email: string;
  user_type: UserType;
  organisation: string;
  updatedAt: DateTime;
  created_at: DateTime;
}

export default User;
