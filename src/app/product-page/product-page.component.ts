import { Product } from './../shared/models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: any;


  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.product$ = this.router.params
    .pipe(switchMap( params => {
      return this.productService.getProduct(params['id'])
    }))
  }

  addProduct(product) {
    this.productService.addProduct(product)
  }

}
