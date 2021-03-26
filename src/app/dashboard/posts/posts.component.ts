import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[];
  subscription: Subscription;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.subscription = this.dashboardService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
      this.posts = this.dashboardService.getPosts();
      console.log( ...this.posts);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
