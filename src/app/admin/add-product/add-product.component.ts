import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup
  isSubmitted: boolean = false;

  constructor() { }

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

  get f() { return this.productForm.controls; }

  onSubmit() {
    if (this.productForm.invalid) {
        return;
    }
    const product = {
      type: this.productForm.value.type,
      title: this.productForm.value.title,
      photo: this.productForm.value.photo,
      info: this.productForm.value.info,
      price: this.productForm.value.price,
    }

    console.log(this.productForm)

}

onReset() {
  
}

}
