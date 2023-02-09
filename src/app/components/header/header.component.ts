import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthserviceService } from 'src/app/services/authservice.service';
import SwiperCore, { SwiperOptions } from 'swiper';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public service: AuthserviceService) {}

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

  categoriesOptions: OwlOptions = {
    loop: false,
    autoplayHoverPause: false,
    animateIn: true,
    center: true,
    rewind: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 4,
      },
      840: {
        items: 6,
      },
      1040: {
        items: 10,
      },
    },
  };

  config: SwiperOptions = {
    slidesPerView: 3,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
}
