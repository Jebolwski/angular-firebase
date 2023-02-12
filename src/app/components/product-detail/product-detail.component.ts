import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

 constructor(public productService: ProductService,private route:ActivatedRoute){
   let pid = this.route.snapshot.paramMap.get('id');
   productService.getAProduct(pid || "");
 }

}
