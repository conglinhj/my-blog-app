import { UserData } from './../interfaces/user-data';


export class User {

  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly emailVerifiedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(public data: UserData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.emailVerifiedAt = data.email_verified_at;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
