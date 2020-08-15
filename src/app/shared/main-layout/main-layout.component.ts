import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  type;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  setType(type) {
    this.type = type;
    if(this.type !== 'Cart') {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });
      this.productService.setType(this.type);
    }

  }

  goToHome() {
    this.productService.setType('');
  }



}
