import { Injectable } from '@angular/core';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  addDoc,
  collection,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product';
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

  user: any = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  async loginWithEmailPsw(data: {
    email: string;
    password: string;
  }): Promise<any> {
    this.angularfireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.user = undefined;
        localStorage.removeItem('user');
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
    username: string;
    uid: number;
    photoURL: string;
  }) {
    this.angularfireauth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        let users = collection(this.firestore, 'users');
        let user_data = {
          photoURL: data.photoURL,
          displayName: data.username,
          uid: resp.user?.uid,
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
    this.angularfireauth
      .signOut()
      .then((resp) => {
        localStorage.removeItem('user');
        this.user = undefined!;
        this.router.navigate(['/']);
        this.toastr.success('Successfully signed out 🚀');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async loginWithGithub(): Promise<any> {
    return this.angularfireauth
      .signInWithPopup(new GithubAuthProvider())
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

  async updateProfile(data: { photoURL: string; username: string }) {
    //TODO Getting user from firestore
    let user_q = query(
      collection(this.firestore, 'users'),
      where('uid', '==', this.user.uid)
    );
    let getUsers = await getDocs(user_q);
    let id: string = '';
    getUsers.forEach((data) => {
      id = data.id;
    });
    let new_data = { displayName: data.username, photoURL: data.photoURL };

    let userRef = doc(this.firestore, 'users', String(id));
    await updateDoc(userRef, new_data)
      .then((data) => {
        this.toastr.success('Successfully updated your profile 🚀');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
