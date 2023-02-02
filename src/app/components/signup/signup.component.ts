import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(public service: AuthserviceService) {}
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    confirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    photoURL: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(150),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });

  get email() {
    return this.signUpForm.get('email');
  }
  get username() {
    return this.signUpForm.get('username');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get photoURL() {
    return this.signUpForm.get('photoURL');
  }
  get confirm() {
    return this.signUpForm.get('confirm');
  }
}
