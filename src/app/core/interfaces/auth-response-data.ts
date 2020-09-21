import { UserData } from '../interfaces/user-data';


export interface AuthResponseData {
  data: UserData;
  access_token: string;
}
