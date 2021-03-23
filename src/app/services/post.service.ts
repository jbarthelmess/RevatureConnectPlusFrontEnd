import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  base:string = "localhost:7000/";
  constructor(private httpClient: HttpClient, private post:Post) {
    
  }

  addComment(user:User, post:Post, comment:string) {
    let requestBody = {
      "commentString":comment,
      "postId":post.postId,
      "userId":user.userId
    };
    const newComment = this.httpClient.post<Comment>(this.base+`/post/${post.postId}/comment`, requestBody);
    // add new comment to the existing comments on the site
  }

  addPost(user:User, post:Post) {
    const requestBody = {
      "contentString":post.content,
      "userId":user.userId
    };
    const newPost = this.httpClient.post<Post>(this.base+`/post`, requestBody);
    // add new post or refresh the page
  }

  addLike(user:User, post:Post) {
    const like = this.httpClient.post(this.base+`/post/${post.postId}/like`, null);
    return true;
  }

  deletePost(user:User, post:Post) {
    const didDelete = this.httpClient.delete(this.base+`/post/${post.postId}`);
    // remove from the list of posts
  }

  deleteComment(user:User, post:Post, comment:Comment) {
    const didDelete = this.httpClient.delete(this.base+`/post/${post.postId}/comment/${comment.commentId}`);
    // remove from the list of comments
  }

  updatePost(user:User, post:Post) {
    const requestBody = {
      "contentString":post.content
    }
    const updatedPost = this.httpClient.put(this.base+`/post/${post.postId}`, requestBody);
  }

  updateComment(user:User, post:Post, comment:Comment) {
    const requestBody = {
      "contentString":comment.content
    }
    const updatedComment = this.httpClient.put(this.base+`/post/${post.postId}/comment/${comment.commentId}`, requestBody);
    // replace updated comment
  }
}
