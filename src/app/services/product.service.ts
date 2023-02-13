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
import * as $ from 'jquery';
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


  product!:Product;
  products!: Product[];
  favorites!: Favorites[];
  brandfilter: string = '';

  async getAProduct(id:string): Promise<Unsubscribe>{
    const productRef = doc(this.firestore, 'products', id);
    return onSnapshot(productRef, (snapshot: any) => {
      this.product={...snapshot.data(),id:snapshot.id}
    });
  }

  async getFavoriteProdcuts(): Promise<Unsubscribe> {
    let filtered_q = query(
      collection(this.firestore, 'favorites'),
      where('uid', '==', this.authservice.user?.uid || 0 )
    );

    return onSnapshot(filtered_q, (snapshot: any) => {
      this.favorites = snapshot.docs.map(
        (data: { data(): Favorites; id: string }) => {
          return { ...data.data(), id: data.id };
        }
      );
    });

  }

  async getFilteredProdcutsMobile(brand: string): Promise<Unsubscribe> {
    this.brandfilter = brand;
    let upmin: HTMLInputElement | null = document.querySelector(
      '.minimum-fiyat-mobile'
    );
    let upmax: HTMLInputElement | null = document.querySelector(
      '.maksimum-fiyat-mobile'
    );

    let upper_bound: string | number =
      upmax != null ? parseInt(upmax?.value) : Infinity;
    let lower_bound: string | number =
      upmin != null ? parseInt(upmin?.value) : 0;
    lower_bound = Number.isNaN(lower_bound) ? 0 : lower_bound;
    upper_bound = Number.isNaN(upper_bound) ? Infinity : upper_bound;

    let user_q = query(collection(this.firestore, 'products'));
    if (this.brandfilter.length > 0) {
      user_q = query(
        collection(this.firestore, 'products'),
        where('price', '<=', upper_bound),
        where('price', '>=', lower_bound),
        where('brand', '==', this.brandfilter)
      );
    } else {
      user_q = query(
        collection(this.firestore, 'products'),
        where('price', '<=', upper_bound),
        where('price', '>=', lower_bound)
      );
    }

    const unsubscribeProducts = onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map(
        (data: { data(): Product; id: string }) => {
          return { ...data.data(), id: data.id };
        }
      );
    });
    //?toggleMobileFilters

    $('.mobile-filters').toggleClass('scale-0').toggleClass('w-0').toggleClass('sm:w-1/2').toggleClass('w-3/4');
    //?-------------------
    return unsubscribeProducts;
  }

  async getFilteredProdcutsLarge(brand: string): Promise<Unsubscribe> {
    this.brandfilter = brand;
    //! Fiyat
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
    //! ---------------------

    //! Kategori

    //! ---------------------
    let user_q = query(collection(this.firestore, 'products'));
    if (this.brandfilter.length > 0) {
      user_q = query(
        collection(this.firestore, 'products'),
        where('price', '<=', upper_bound),
        where('price', '>=', lower_bound),
        where('brand', '==', this.brandfilter)
      );
    } else {
      user_q = query(
        collection(this.firestore, 'products'),
        where('price', '<=', upper_bound),
        where('price', '>=', lower_bound)
      );
    }

    return onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map(
        (data: { data(): Product; id: string }) => {
          return { ...data.data(), id: data.id };
        }
      );
    });

  }

  async getAllProducts(): Promise<Unsubscribe> {
    let user_q = query(collection(this.firestore, 'products'));
    return onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map(
        (data: { data(): Product; id: string }) => {
          return { ...data.data(), id: data.id };
        }
      );
    });

  }

  async toggleFavoriteProducts(pid: string): Promise<void> {
    let favoriteRef = doc(this.firestore, 'favorites', this.favorites[0].id);
    let data = {
      uid: this.authservice.user?.uid,
      pids: this.favorites[0].pids,
    };

    if (this.favorites[0].pids.includes(pid)) {
      this.favorites[0].pids = this.favorites[0].pids.filter(
        (letter: string) => {
          return letter != pid;
        }
      );
      console.log(this.favorites[0].pids);
    } else {
      this.favorites[0].pids.push(pid);
    }
    await updateDoc(favoriteRef, data)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  async getUsersFavorites(): Promise<Unsubscribe> {
    let user_q = query(collection(this.firestore, ''));
    return onSnapshot(user_q, (snapshot: any) => {
      this.products = snapshot.docs.map((data: any) => {
        return { ...data.data() };
      });
    });

  }

  async addProduct(data: Product) {
    let productRef = collection(this.firestore, 'products');
    await addDoc(productRef, data)
      .then(() => {
        this.toastr.success('Successfully added product ✨','Success');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProduct(id: string, data: any) {
    let productRef = doc(this.firestore, 'products', id);
    await updateDoc(productRef, data)
      .then(() => {
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
      .then(() => {
        this.router.navigate(['/']);
        this.toastr.success('Successfully deleted product 👽');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
