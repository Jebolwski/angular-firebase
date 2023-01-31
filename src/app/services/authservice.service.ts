import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(
    private angularfireauth: AngularFireAuth,
    private router: Router
  ) {}

  user: any = localStorage.getItem('user');

  async loginWithEmailPsw(data: {
    email: string;
    password: string;
  }): Promise<any> {
    this.angularfireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = localStorage.getItem('user');
      })
      .catch((err) => {
        console.error(err, 'messi');
      });
  }

  async loginWithGmail(): Promise<any> {
    return this.angularfireauth
      .signInWithPopup(new GoogleAuthProvider())
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = localStorage.getItem('user');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signUp(data: { email: string; password: string }) {
    this.angularfireauth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signOut(): Promise<any> {
    this.angularfireauth.signOut().then((resp) => {
      localStorage.removeItem('user');
      this.user = undefined;
    });
  }
}
