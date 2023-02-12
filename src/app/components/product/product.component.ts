import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  @Input() extraclass!: string;

  constructor(
    public productservice: ProductService,
    public authservice: AuthserviceService
  ) {}

  ngOnInit(): void {}
}
