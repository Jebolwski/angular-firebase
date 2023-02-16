import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  constructor(public productservice: ProductService) {}

  toggleAddProduct(): void {
    $('.add-product-div').toggle(200);
  }

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(120),
      Validators.minLength(10),
    ]),
    desc: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(70),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.max(10000000),
      Validators.maxLength(12),
      Validators.min(1),
      Validators.minLength(1),
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(4),
    ]),
    brand: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
    ]),
  });

  get name() {
    return this.productForm.get('name');
  }
  get price() {
    return this.productForm.get('price');
  }
  get desc() {
    return this.productForm.get('desc');
  }
  get category() {
    return this.productForm.get('category');
  }
}
