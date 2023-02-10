import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  Unsubscribe,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Product } from '../interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { Favorites } from '../interfaces/favorites';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    public firestore: Firestore,
    private toastr: ToastrService,
    private router: Router,
    private authservice: AuthserviceService
  ) {}

  products!: Product[];
  favorites!: Favorites;

  async getFavoriteProdcuts(): Promise<Unsubscribe> {
    let filtered_q = query(collection(this.firestore, 'favorites'));
    console.log(this.authservice.user?.uid);

    const unsubscribeProducts = onSnapshot(filtered_q, (snapshot: any) => {
      this.favorites = snapshot.docs.map((data: { data(): Favorites }) => {
        console.log(data.data());

        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  async getFilteredProdcuts(): Promise<Unsubscribe> {
    let upmin: HTMLInputElement | null =
      document.querySelector('.minimum-fiyat');
    let upmax: HTMLInputElement | null =
      document.querySelector('.maksimum-fiyat');

    let upper_bound: string | number =
      upmax != null ? parseInt(upmax?.value) : Infinity;
    let lower_bound: string | number =
      upmin != null ? parseInt(upmin?.value) : 0;
    lower_bound = Number.isNaN(lower_bound) ? 0 : lower_bound;
    upper_bound = Number.isNaN(upper_bound) ? Infinity : upper_bound;
    let user_q = query(
      collection(this.firestore, 'products'),
      where('price', '<=', upper_bound),
      where('price', '>=', lower_bound)
    );

    const unsubscribeProducts = onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map((data: { data(): Product }) => {
        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  async getAllProducts(): Promise<Unsubscribe> {
    let user_q = query(collection(this.firestore, 'products'));
    const unsubscribeProducts = onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map((data: any) => {
        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  async getUsersFavorites(): Promise<Unsubscribe> {
    let user_q = query(collection(this.firestore, ''));
    const unsubscribeProducts = onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map((data: any) => {
        return { ...data.data() };
      });
    });

    return unsubscribeProducts;
  }

  async addProduct(data: Product) {
    let productRef = collection(this.firestore, 'products');
    await addDoc(productRef, data)
      .then((resp) => {
        this.toastr.success('Successfully added product ✨');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProduct(id: string, data: any) {
    let productRef = doc(this.firestore, 'products', id);
    await updateDoc(productRef, data)
      .then((resp) => {
        this.router.navigate(['/']);
        this.toastr.success('Successfully updated product 👍');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteProduct(id: string) {
    let productRef = doc(this.firestore, 'products', id);
    await deleteDoc(productRef)
      .then((resp) => {
        this.router.navigate(['/']);
        this.toastr.success('Successfully deleted product 👽');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
