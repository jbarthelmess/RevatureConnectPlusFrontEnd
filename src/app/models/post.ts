import { DatePipe } from "@angular/common";

export class Post{
  public postId: number;
  public userId:number;
  public timestamp:number|DatePipe;
  public content:string;
  public likeCount?:number;
  public displayName?:string;
  constructor(
    postId:number,
    userId:number,
    timestamp:number|DatePipe,
    content:string,
    likeCount?:number,
    displayName?:string
  ){
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.likeCount = likeCount;
    this.timestamp = timestamp;
    this.displayName = displayName;
  }
}
