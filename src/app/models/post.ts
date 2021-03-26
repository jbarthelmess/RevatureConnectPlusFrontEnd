import { DatePipe } from "@angular/common";

export class Post{
  public postId: number;
  public userId: number;
  public createdAt: Date;
  public postContent: string;
  public likes: number;

  constructor(
    postId: number,
    userId: number,
    timestamp: Date,
    content: string,
    likeCount: number
  ){
    this.postId = postId;
    this.userId = userId;
    this.createdAt = timestamp;
    this.postContent = content;
    this.likes = likeCount;
  }
}
