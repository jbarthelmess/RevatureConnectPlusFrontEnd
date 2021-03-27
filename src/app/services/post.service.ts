import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { UserData } from '../auth/user.model';
import { Comment } from '../models/comment';
import { catchError } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { UserService } from './user.service';
//import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  base:string = "http://35.225.143.245:8080/";
  showPosts:Post[] = [];
  postAdd:Subject<Post> = new Subject<Post>();
  postRemove:Subject<number> = new Subject<number>();

  constructor(private httpClient: HttpClient, private userService:UserService) {
  }
  handleError(error:HttpErrorResponse) {
    console.log(error);
    if(error.error instanceof ErrorEvent) {
      console.log("Something happened on the client side:", error.error.message);
    } else {
      console.log(error.status + " with error body: ", error.error);
    }
    return of({});
  }

  // insertion sort should be good enough for now
  sortPostsByTimeStamp(posts:Post[]): Post[] {
    const sorted:Post[] = [];
    while(posts.length > 0) {
      let lowestPost = posts[0];
      let index = 0;
      for(let i = 1; i < posts.length; i++) {
        if(posts[i].postTimestamp > lowestPost.postTimestamp) {
          lowestPost = posts[i];
          index = i;
        }
      }
      sorted.push(lowestPost);
      posts.splice(index, 1);
    }
    return sorted;
  }

  getPosts() {
    this.httpClient.get(this.base+"post").pipe(catchError(this.handleError))
    .subscribe((data:Array<any>) =>{
      if(data.length === 0) {
        console.log("You are not logged in");
      } else {
        for(let postData of data) {
          const newPost = new Post(postData.postId, postData.userId, postData.timestamp,  postData.content, postData.likeCount);
          this.showPosts.push(newPost);
        }
        this.showPosts = this.sortPostsByTimeStamp(this.showPosts);
        for(let i = this.showPosts.length-1; i > -1 ; i--) {
          this.postAdd.next(this.showPosts[i]);
        }
      }
    });
  }

  addComment(post:number, comment:string) {
    let requestBody = {
      "contentString":comment
    };
    return this.httpClient.post<Comment>(this.base+`post/${post}/comment`, requestBody).pipe(catchError(this.handleError));
  }

  addPost(post:string) {
    const requestBody = {
      "content":post
    };
    this.httpClient.post(this.base+`post`, requestBody).pipe(catchError(this.handleError))
    .subscribe((data) => {
      let postId = 0;
      let userId = 0;
      let timestamp = 0;
      let content = "";
      let likeCount = 0;
      for(let property in data) {
        if(property === "postId") postId = data[property];
        if(property === "userId") userId = data[property];
        if(property === "timestamp") timestamp = data[property];
        if(property === "content") content = data[property];
        if(property === "likeCount") likeCount = data[property];
      }
      const newPost = new Post(postId, userId, timestamp, content, likeCount)
      this.showPosts = [newPost, ...this.showPosts];
      this.postAdd.next(newPost);
    });
  }

  addLike(postId:number) {
    return this.httpClient.post(this.base+`post/${postId}/like`, null).pipe(catchError(this.handleError));
  }

  deletePost(postId:number) {
    this.httpClient.delete(this.base+`post/${postId}`).pipe(catchError(this.handleError)).subscribe((data) =>{
      for(let i = 0; i < this.showPosts.length; i++) {
        if(this.showPosts[i].postId === postId) {
          this.showPosts.splice(i, 1);
          this.postRemove.next(i);
          break;
        }
      }
    });
  }

  deleteComment(postId:number, commentId:number) {
    return this.httpClient.delete(this.base+`post/${postId}/comment/${commentId}`).pipe(catchError(this.handleError));
  }

  updatePost(user:UserData, post:Post) {
    const requestBody = {
      "contentString":post.content
    }
    const updatedPost = this.httpClient.put(this.base+`post/${post.postId}`, requestBody);
  }

  updateComment(user:UserData, post:Post, comment:Comment) {
    const requestBody = {
      "contentString":comment.content
    }
    const updatedComment = this.httpClient.put(this.base+`post/${post.postId}/comment/${comment.commentId}`, requestBody);
    // replace updated comment
  }

  getComments(postId:number) {
    return this.httpClient.get(this.base+`post/${postId}/comment`).pipe(catchError(this.handleError));
  }
}
