import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable({providedIn: 'root'})
export class ConnectService {
  private connectBaseURL: string;

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService
  ) {
    this.connectBaseURL = 'http://35.225.143.245:8080';
  }

  fetchPosts() {
    return this.http.get<Post[]>(
      `${this.connectBaseURL}/post`
      )
      .pipe(
        map(posts => {
          return posts.map( post => {
            return {
              ...post,
              likes: post.likes ? post.likes : 0
            };
          });
        }),
        tap(posts => {
          this.dashboardService.setPosts(posts);
        })
      );
  }

}
