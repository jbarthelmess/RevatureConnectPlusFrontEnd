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
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthenticationService } from './services/authentication.service';
//import { GreetingComponent } from './greeting/greeting.component';
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
    //GreetingComponent
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
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthenticationService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
