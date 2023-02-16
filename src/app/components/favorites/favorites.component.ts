import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import * as $ from "jquery";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  constructor(public productservice:ProductService) {
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  toggleMobileFilters(): void {
    $('.mobile-filters').toggleClass('scale-0').toggleClass('w-0').toggleClass('sm:w-1/2').toggleClass('w-3/4');
  }
}
