import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input() post:Post;
  comment:string = "";
  commentsLoaded:boolean = false;
  fullComment:Comment[] = [];
  isUsers:boolean = false;
  constructor(private postService:PostService, private userService:UserService) { }

  ngOnInit(): void {
    this.isUsers = this.userService.getUserId() === this.post.userId;
  }

  getUserId() {
    return this.userService.getUserId();
  }

  addComment() {
    this.postService.addComment(this.post.postId, this.comment).subscribe((data)=>{
      let content:string = "";
      let userId:number = 0;
      let commentId:number = 0;
      let postId:number = this.post.postId;
      let timestamp:number = 0;
      let displayName:string = "";
      for(let property in data) {
        if(property === "contentString"){
          content = data[property];
        }
        if(property === "userId") {
          userId = data[property];
        }
        if(property === "commentId") {
          commentId = data[property];
        }
        if(property === "timestamp") {
          timestamp = data[property];
        }
        if(property === "displayName") {
          displayName = data[property];
        }
      }
      this.fullComment.push(new Comment(commentId, postId, userId, content, timestamp, displayName));
    });
    this.comment = "";
  }

  addLike() {
    this.postService.addLike(this.post.postId).subscribe((data)=>{
      for(let property in data) {
        if(data[property] === "true") {
          this.post.likeCount += 1;
        } else {
          this.post.likeCount -= 1;
        }
      }
    });
  }

  deleteComment(commentId:number) {
    this.postService.deleteComment(this.post.postId, commentId).subscribe((data)=>{
      for(let i=0; i < this.fullComment.length; i++) {
        if(this.fullComment[i].commentId === commentId) {
          this.fullComment.splice(i, 1);;
          break;
        }
      }
    })
  }

  // insertion sort should be good enough for now
  sortCommentsByTimeStamp(posts:Comment[]): Comment[] {
    const sorted:Comment[] = [];
    while(posts.length > 0) {
      let lowestPost = posts[0];
      let index = 0;
      for(let i = 1; i < posts.length; i++) {
        if(posts[i].timestamp < lowestPost.timestamp) {
          lowestPost = posts[i];
          index = i;
        }
      }
      sorted.push(lowestPost);
      posts.splice(index, 1);
    }
    return sorted;
  }

  loadComments() {
    if(!this.commentsLoaded) {
      this.postService.getComments(this.post.postId).subscribe((data:Array<any>)=> {
        for(let commentData of data) {
          this.fullComment.push(new Comment(commentData.commentId, commentData.postId, commentData.userId, commentData.contentString, commentData.timestamp, commentData.displayName));
        }
        console.log(this.fullComment);
        this.fullComment = this.sortCommentsByTimeStamp(this.fullComment);
      });
      this.commentsLoaded = true;
    }
  }

  deletePost() {
    this.postService.deletePost(this.post.postId);
  }
}
