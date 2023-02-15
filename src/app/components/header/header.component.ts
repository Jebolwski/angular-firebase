import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from 'src/app/services/authservice.service';
import {SwiperOptions} from 'swiper';
import * as $ from 'jquery';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public service: AuthserviceService, public productservice: ProductService) {
  }

  ngOnInit(): void {
    $('.account-div').on('mouseover', () => {
      $('.account-hover-div').show();
    });
    $('.account-div').on('mouseleave', () => {
      $('.account-hover-div').hide();
    });
  }

  toggleAddProduct(): void {
    $('.add-product-div').toggle(200);
  }



  config: SwiperOptions = {
    slidesPerView: 3,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
}
