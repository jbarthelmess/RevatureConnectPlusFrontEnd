import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserData } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{
  private user: UserData;
  signupForm: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('',{validators: [Validators.required, Validators.minLength(6)]}),
      terms: new FormControl('', {validators: [Validators.required]})
    })
  }

  onSubmit(){
    this.authService.registerUser({
      username: this.signupForm.value.username,
      password: this.signupForm.value.password
    });
    console.log(this.signupForm.value);
  }

}
