import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private postService:PostService) { }
  posts:Post[] = [];
  ngOnInit(): void {
    this.postService.postRemove.subscribe((change) =>{
      this.posts.splice(change, 1);
    });
    this.postService.postAdd.subscribe((change) =>{
      this.posts = [change, ...this.posts];
    });
    this.postService.getPosts();
  }
}
