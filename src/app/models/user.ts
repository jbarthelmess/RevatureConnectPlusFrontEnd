// we want to have our userid, username and displayname if available
export class User{
  constructor(
    public userId:number,
    public userName:string,
    public displayName?:string,
    public jwt?:string
  ){}
}
