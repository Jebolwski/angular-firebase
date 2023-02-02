import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  constructor(public authservice: AuthserviceService, private title: Title) {}
  updateProfileForm!: FormGroup;

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      photoURL: new FormControl(this.authservice.user.photoURL, [
        Validators.minLength(5),
        Validators.maxLength(150),
      ]),
      username: new FormControl(this.authservice.user.displayName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    });
    this.title.setTitle('Update ' + this.authservice.user.displayName);
  }

  get photoURL() {
    return this.updateProfileForm.get('photoURL');
  }
  get username() {
    return this.updateProfileForm.get('username');
  }
}
