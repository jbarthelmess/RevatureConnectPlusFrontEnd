import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  showPosts:Post[] = [];
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data:Array<any>) =>{
      for(let postData of data) {
        const newPost = new Post(postData.postId, postData.userId, postData.timestamp,  postData.content);
        this.showPosts.push(newPost);
      }
    });
  }

}
