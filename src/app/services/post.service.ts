import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { UserData } from '../auth/user.model';
import { Comment } from '../models/comment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  base:string = "http://35.225.143.245:8080/";
  constructor(private httpClient: HttpClient) {
    
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

  getPosts() {
    return this.httpClient.get(this.base+"post").pipe(catchError(this.handleError));
  }

  addComment(user:UserData, post:Post, comment:string) {
    let requestBody = {
      "commentString":comment,
      "postId":post.postId,
      "userId":user.userId
    };
    const newComment = this.httpClient.post<Comment>(this.base+`/post/${post.postId}/comment`, requestBody);
    // add new comment to the existing comments on the site
  }

  addPost(post:string) {
    const requestBody = {
      "contentString":post
    };
    const newPost = this.httpClient.post(this.base+`post`, requestBody);
    // add new post or refresh the page
    return newPost;
  }

  addLike(user:UserData, post:Post) {
    const like = this.httpClient.post(this.base+`/post/${post.postId}/like`, null);
    return true;
  }

  deletePost(user:UserData, post:Post) {
    const didDelete = this.httpClient.delete(this.base+`/post/${post.postId}`);
    // remove from the list of posts
  }

  deleteComment(user:UserData, post:Post, comment:Comment) {
    const didDelete = this.httpClient.delete(this.base+`/post/${post.postId}/comment/${comment.commentId}`);
    // remove from the list of comments
  }

  updatePost(user:UserData, post:Post) {
    const requestBody = {
      "contentString":post.content
    }
    const updatedPost = this.httpClient.put(this.base+`/post/${post.postId}`, requestBody);
  }

  updateComment(user:UserData, post:Post, comment:Comment) {
    const requestBody = {
      "contentString":comment.content
    }
    const updatedComment = this.httpClient.put(this.base+`/post/${post.postId}/comment/${comment.commentId}`, requestBody);
    // replace updated comment
  }
}
