import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  addDoc,
  collection,
  getDoc,
  doc,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(
    private angularfireauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    public firestore: Firestore
  ) {}

  user: any = JSON.parse(localStorage.getItem('user')!);

  async loginWithEmailPsw(data: {
    email: string;
    password: string;
  }): Promise<any> {
    this.angularfireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);

        //TODO Getting user from firestore
        let user_q = query(
          collection(this.firestore, 'users'),
          where('uid', '==', this.user.uid)
        );
        let getUser = await getDocs(user_q);
        //TODO Putting displayName and photoURL to user
        getUser.forEach((data) => {
          this.user.displayName = data.data()['displayName'];
          this.user.photoURL = data.data()['photoURL'];
          localStorage.setItem('user', JSON.stringify(this.user));
        });
        await this.router.navigate(['/']);
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
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        this.toastr.success('Successfully signed in 🦄');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signUp(data: {
    email: string;
    password: string;
    displayName: string;
    uid: number;
    photoURL: string;
  }) {
    this.angularfireauth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        console.log(resp);
        let users = collection(this.firestore, 'users');
        let user_data = {
          photoURL: data.photoURL,
          displayName: data.displayName,
          uid: resp.user?.uid,
          id: resp.user?.uid,
        };
        addDoc(users, user_data);
        this.toastr.success('Successfully signed up ✨');
        this.router.navigate(['/signin']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signOut(): Promise<any> {
    this.angularfireauth.signOut().then((resp) => {
      localStorage.removeItem('user');
      this.toastr.success('Successfully signed out 🚀');
      this.user = undefined!;
    });
  }
}
