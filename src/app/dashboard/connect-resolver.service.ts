import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Post} from '../models/post';
import { ConnectService } from '../services/connect.service';
import { DashboardService } from './dashboard.service';

@Injectable({providedIn: 'root'})
export class ConnectResolverService implements Resolve<Post[]> {
  constructor(
    private connectService: ConnectService,
    private dashboardService: DashboardService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const posts = this.dashboardService.getPosts();

    if (posts.length == 0) {
      return this.connectService.fetchPosts();
    }else {
      return posts;
    }
  }
}
