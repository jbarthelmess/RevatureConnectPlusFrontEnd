import { DatePipe } from "@angular/common";

export class Post{
  constructor(
    public postId:number,
    public userId:number,
    public postTimestamp:number|DatePipe,
    public content:string,
    public likeCount?:number,
    public displayName?:string
  ){}
}
