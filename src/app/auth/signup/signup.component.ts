import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
    password: new FormControl('',{validators: [Validators.required, Validators.minLength(6)]}),
    terms: new FormControl('', {validators: [Validators.required]})
  })

  onSubmit(){
    console.log(this.signupForm.value);
  }

}
