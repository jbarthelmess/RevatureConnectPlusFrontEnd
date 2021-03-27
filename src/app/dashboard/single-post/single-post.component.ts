import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostService } from 'src/app/services/post.service';

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
  constructor(private postService:PostService) { }

  ngOnInit(): void {
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

  loadComments() {
    if(!this.commentsLoaded) {
      this.postService.getComments(this.post.postId).subscribe((data:Array<any>)=> {
        for(let commentData of data) {
          this.fullComment.push(new Comment(commentData.commentId, commentData.postId, commentData.userId, commentData.contentString, commentData.timestamp, commentData.displayName));
        }
        console.log(this.fullComment);
      });
      this.commentsLoaded = true;
    }
  }

}
