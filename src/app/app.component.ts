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
import { SwUpdate } from '@angular/service-worker';
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
    private productservice: ProductService,
    private updates: SwUpdate
  ) {
    updates.versionUpdates.subscribe(() => {
      console.log('update avaliable');

      updates.activateUpdate();
    });
  }

  async getProducts() {
    let user_q = query(collection(this.firestore, 'products'));
    const unsubscribeProducts = onSnapshot(user_q, (snapshot: any) => {
      this.productservice.products = snapshot.docs.map((data: any) => {
        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  ngOnInit(): void {
    this.getProducts();
    let theme: string | null = localStorage.getItem('theme');
    this.authservice.toggleDarkMode(theme);
  }
}
