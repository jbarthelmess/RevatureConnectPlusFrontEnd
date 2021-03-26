// we want to have our userid, username and displayname if available
export class User {

  constructor(
   public userId: string,
   public username: string,
   private _password: string,
   public displayName?:string
  ){}

  get password(){
    if (this._password == null){
      return null;
    }
    return this._password;
  }

  // set token(password: string) {
  //   this._token = password;
  // }

}
