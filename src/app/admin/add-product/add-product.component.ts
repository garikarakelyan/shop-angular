import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup
  isSubmitted: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.productForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    if (this.productForm.invalid) {
        return;
    }
    this.isSubmitted = true;
    const product = {
      type: this.productForm.value.type,
      title: this.productForm.value.title,
      photo: this.productForm.value.photo,
      info: this.productForm.value.info,
      price: this.productForm.value.price,
      date: new Date()
    }

    this.productService.create(product).subscribe(res => {
      this.productForm.reset();
      this.isSubmitted = false;
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

onReset() {

}

}
