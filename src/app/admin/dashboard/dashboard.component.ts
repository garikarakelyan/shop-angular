import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  products = [];
  productSubscribe: Subscription;
  removeSubscribe: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.productSubscribe = this.productService.getProducts()
    .subscribe( products => {
      this.products = products;
    })
  }

  onRemove(item) {
    this.removeSubscribe = this.productService.remove(item)
    .subscribe(() => {
      this.products = this.products.filter(product => product.id !== item)
    })
  }

  onEdit(id) {
    this.router.navigate(['/admin','product','product.id','edit'])
  }

  ngOnDestroy() {
    if(this.productSubscribe) {
      this.productSubscribe.unsubscribe();
    }
    if(this.removeSubscribe) {
      this.removeSubscribe.unsubscribe();
    }
  }

}
