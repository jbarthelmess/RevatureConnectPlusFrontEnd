// we want to have our userid, username and displayname if available
export interface User{
  userId: string;
  username: string;
  displayName?:string;
  jwt?: string;
}
