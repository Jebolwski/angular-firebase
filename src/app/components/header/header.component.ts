import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthserviceService } from 'src/app/services/authservice.service';
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public service: AuthserviceService) {}

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
