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
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'firebase-blog';

  constructor(
    private authservice: AuthserviceService,
    public firestore: Firestore,
    private productservice: ProductService
  ) {}
  async getUser() {
    let user_q = query(
      collection(this.firestore, 'users'),
      where('uid', '==', this.authservice.user.uid)
    );
    const unsubscribeUser = onSnapshot(user_q, (snapshot) => {
      snapshot.docs.map((data) => {
        this.authservice.user.displayName = data.data()['displayName'];
        this.authservice.user.photoURL = data.data()['photoURL'];
        localStorage.setItem('user', JSON.stringify(this.authservice.user));
      });
    });

    return unsubscribeUser;
  }

  async getProducts() {
    let user_q = query(collection(this.firestore, 'products'));
    const unsubscribeProducts = onSnapshot(user_q, (snapshot) => {
      this.productservice.products = snapshot.docs.map((data) => {
        console.log(data.data());
        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  ngOnInit(): void {
    this.getUser();
    this.getProducts();
  }
}
