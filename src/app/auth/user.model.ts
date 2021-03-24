// we want to have our userid, username and displayname if available
export interface User{
  userId: string;
  username: string;
  password?: string;
  displayName?:string;
}
