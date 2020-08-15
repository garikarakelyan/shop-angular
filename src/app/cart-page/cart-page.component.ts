import { OrderService } from './../shared/services/order.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts = [];
  totalPrice = 0;
  form: FormGroup;
  isSubmitted: boolean = false;
  added: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.buildForm();
  }

  getProducts() {
    this.cartProducts = this.productService.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    if (this.form.invalid) {
        return;
    }
    this.isSubmitted = true;
    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    this.orderService.create(order).subscribe(res => {
      this.form.reset();
      this.isSubmitted = false;
      this.added = 'Delivery is framed'
      // this.router.navigate(['/admin', 'dashboard'])
    })
  }

  onDelete(product) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }

}
