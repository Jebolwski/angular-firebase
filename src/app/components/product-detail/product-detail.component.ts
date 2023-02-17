import {Component} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {ActivatedRoute} from "@angular/router";
import SwiperCore, {Navigation, SwiperOptions} from 'swiper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  constructor(public productService: ProductService, private route: ActivatedRoute) {
    SwiperCore.use([Navigation]);
    let pid = this.route.snapshot.paramMap.get('id');
    productService.getFavoriteProdcuts();
    productService.getAProduct(pid || "");
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: {clickable: true},
    scrollbar: {draggable: true},
  };

}
