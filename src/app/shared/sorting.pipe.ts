import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/interfaces';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type = ''): any {
    if(!type.trim()) {
      return products;
    }
    return products.filter(product => {
      return product.type == type
    })
  }

}
