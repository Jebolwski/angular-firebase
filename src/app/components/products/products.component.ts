import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(public productservice: ProductService) {
    this.productservice.getFavoriteProdcuts();
  }

  toggleMobileFilters(): void {
    $('.mobile-filters').toggleClass('scale-0').toggleClass('w-0').toggleClass('sm:w-1/2').toggleClass('w-3/4');
  }
}
