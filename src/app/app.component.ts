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
    public authservice: AuthserviceService,
    public firestore: Firestore,
    private productservice: ProductService
  ) {}

  async getProducts() {
    let user_q = query(collection(this.firestore, 'products'));
    const unsubscribeProducts = onSnapshot(user_q, (snapshot) => {
      this.productservice.products = snapshot.docs.map((data) => {
        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  ngOnInit(): void {
    this.getProducts();
    let theme = localStorage.getItem('theme');
    this.authservice.toggleDarkMode();
  }
}
