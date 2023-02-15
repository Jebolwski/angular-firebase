import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from './services/authservice.service';

import {Firestore} from '@angular/fire/firestore';
import {ProductService} from './services/product.service';
import {SwUpdate} from '@angular/service-worker';

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

  async ngOnInit(): Promise<void> {
    this.productservice.getAllProducts();
    let theme: string | null = localStorage.getItem('theme');
    this.authservice.toggleDarkMode(theme);
    await this.productservice.getCart();
  }
}
