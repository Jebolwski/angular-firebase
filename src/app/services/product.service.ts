import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Product } from '../interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firebase: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  products!: any[];

  async addProduct(data: Product) {
    let productRef = collection(this.firebase, 'products');
    await addDoc(productRef, data)
      .then((resp) => {
        console.log(resp);
        this.toastr.success('Successfully added product ✨');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProduct(id: string, data: any) {
    let productRef = doc(this.firebase, 'products', id);
    await updateDoc(productRef, data)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/']);
        this.toastr.success('Successfully updated product 👍');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteProduct(id: string) {
    let productRef = doc(this.firebase, 'products', id);
    await deleteDoc(productRef)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/']);
        this.toastr.success('Successfully deleted product 👽');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
