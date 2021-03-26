import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Comment } from "../models/comment";
import { Post } from "../models/post";

@Injectable()
export class DashboardService {
  postsChanged = new Subject<Post[]>();
  commentsChanged = new Subject<Comment[]>();

  private posts: Post[] = [];
  private comments: Comment[] = [];

  // post services
  setPosts(posts: Post[]) {
    this.posts = posts;
    this.postsChanged.next(this.posts.slice());
  }

  getPosts() {
    return this.posts.slice();
  }

  getPost(index: number) {
    return this.posts[index];
  }

  addPost(post: Post){
    this.posts.push(post);
    this.postsChanged.next(this.posts.slice());
  }

  // comment services
  setComments(comments: Comment[]){
    this.comments = comments;
    this.commentsChanged.next(this.comments.slice());
  }

  getComments() {
    return this.comments.slice();
  }

  getComment(index: number) {
    return this.comments[index];
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    this.commentsChanged.next(this.comments.slice());
  }

}
