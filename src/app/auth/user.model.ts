// we want to have our userid, username and displayname if available
export interface User{
  userId?: string;
  username: string;
  password?: string;
  jwt?: string;
  displayName?:string;
}
