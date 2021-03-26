import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input() post:Post;
  comment:string = "";
  constructor(private postService:PostService) { }

  ngOnInit(): void {
  }

  addComment() {
    this.postService.addComment(this.post.postId, this.comment);
    this.comment = "";
  }

}
