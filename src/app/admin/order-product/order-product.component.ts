import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit, OnDestroy {
  orders = [];
  productSubscribe: Subscription;
  removeSubscribe: Subscription;
  productName;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.productSubscribe = this.orderService.getProducts()
    .subscribe( orders => {
      this.orders = orders;
    })
  }

  onRemove(item) {
    this.removeSubscribe = this.orderService.remove(item)
    .subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== item)
    })
  }

  onEdit(id) {
    this.router.navigate(['/admin','product',id,'edit'])
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
