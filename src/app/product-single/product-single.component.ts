import { ProductService } from './../shared/services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  @Input() product;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  goToSingle(item) {
    this.router.navigate(['/product', item])
  } 

  addProduct(product) {
    this.productService.addProduct(product)
  }

}
