import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthserviceService } from './services/authservice.service';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'firebase-blog';

  constructor(
    private authservice: AuthserviceService,
    public firestore: Firestore
  ) {}
  getUser() {
    console.log('messi');

    const collectionRef = collection(this.firestore, 'users');
    let user_q = query(
      collection(this.firestore, 'users'),
      where('uid', '==', this.authservice.user.uid)
    );
    const unsubscribe = onSnapshot(user_q, (snapshot) => {
      snapshot.docs.map((data) => {
        console.log('geldi');

        this.authservice.user.displayName = data.data()['displayName'];
        this.authservice.user.photoURL = data.data()['photoURL'];
        localStorage.setItem('user', JSON.stringify(this.authservice.user));
      });
    });
    return unsubscribe;
  }
  ngOnInit(): void {
    console.log(this.authservice.user);
    this.getUser();
  }
}
