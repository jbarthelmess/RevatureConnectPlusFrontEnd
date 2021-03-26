import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {
  newPost:string = "";
  constructor(private postService:PostService, private userService:UserService) { }

  ngOnInit(): void {
  }

  addNewPost() {
    this.postService.addPost(this.newPost).subscribe((data)=>{
      console.log(data);
    })
  }

}
