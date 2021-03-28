import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
    this.authService.authChange.subscribe((success) => {
      if(!success) {
        alert("Login Attempt Failed, please try again");
        this.loginForm.reset();
      }
    })
  }

  onSubmit(){
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
     });
  }

}
