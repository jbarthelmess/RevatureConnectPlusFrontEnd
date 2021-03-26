// we want to have our userid, username and displayname if available
export class User {

  constructor(
   public userId: string,
   public username: string,
   private _token: string,
   public displayName?:string
  ){}

  get token(){
    if (this._token == null){
      return null;
    }
    return this._token;
  }

  // set token(password: string) {
  //   this._token = password;
  // }

}
