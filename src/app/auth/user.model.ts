// we want to have our userid, username and displayname if available
export class UserData{
  constructor(
  public userId:string,
  public username:string,
  public displayName:string,
  private password:string
  ){}

  getToken() {
    return this.password;
  }
}
