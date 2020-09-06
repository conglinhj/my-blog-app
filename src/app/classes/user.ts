import { UserData } from './../interfaces/user-data';


export class User {
  constructor(public data: UserData) { }

  get id(): number {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get email(): string {
    return this.data.email;
  }

  get emailVerifiedAt(): string {
    return this.data.email_verified_at;
  }

  get createdAt(): string {
    return this.data.created_at;
  }

  get updatedAt(): string {
    return this.data.updated_at;
  }
}
