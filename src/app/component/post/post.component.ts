import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content:string="";
  postId:number = 0;
  likeCount:number = 0;
  isClicked:boolean = false;
  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  like():void {
    const check = this.service.addLike(this.postId);
    if(check) {
      this.likeCount++;
      this.isClicked = true;
    }
  }
}
