import { Product } from './../../shared/models/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  form: FormGroup;
  product: Product;
  isSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProduct()
  }

  getProduct() {
    this.route.params
    .pipe(
      switchMap( params => {
        return this.productService.getProduct(params['id']);
      })
    )
    .subscribe(product => {
        this.product = product;
        this.buildForm(this.product);
    })
  }

  buildForm(product) {
    this.form = new FormGroup ({
      type: new FormControl(product.type, Validators.required),
      title: new FormControl(product.title, Validators.required),
      photo: new FormControl(product.photo, Validators.required),
      info: new FormControl(product.info, Validators.required),
      price: new FormControl(product.price, Validators.required),
    })
  }

  onSubmit() {
    if (this.form.invalid) {
        return;
    }
    this.isSubmitted = true;

    this.productService.update({
      ...this.product,
     type: this.form.value.type,
     title: this.form.value.title,
     photo: this.form.value.photo,
     info: this.form.value.info,
     price: this.form.value.price,
     date: new Date()
    })
    .subscribe(res => {
      this.isSubmitted = false;
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

}
