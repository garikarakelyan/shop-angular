import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  @Input() product;

  constructor() { }

  ngOnInit(): void {
  }

}
