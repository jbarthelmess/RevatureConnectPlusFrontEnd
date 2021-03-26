import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeStampPipe } from './pipes/time-stamp.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from './services/authentication.service';
import { WritePostComponent } from './dashboard/write-post/write-post.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeStampPipe,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    WelcomeComponent,
    PostsComponent,
    ProfileComponent,
    DashboardComponent,
    WritePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
