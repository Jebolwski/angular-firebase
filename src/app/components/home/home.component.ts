import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public productservice: ProductService) {}

  highlightsOptions: OwlOptions = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      840: {
        items: 3,
      },
      1040: {
        items: 4,
      },
    },
  };

  brandsOptions: OwlOptions = {
    loop: true,
    startPosition: 'center',
    autoplayHoverPause: false,
    animateIn: true,
    center: true,
    responsiveRefreshRate: 200,
    rewind: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      840: {
        items: 4,
      },
      1040: {
        items: 6,
      },
    },
  };
}
