import {Component} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products!: Product[];

  constructor(public productservice: ProductService) {
  }

  get totalCost() {
    let res: number = 0;
    this.productservice.productsHere.forEach((el: Product) => {
      res += el.price;
    })
    if (res != 0) {
      return res
    }
    return res.toFixed(2);
  }

}
