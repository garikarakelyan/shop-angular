import { Product } from './models/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): any {
    if(!productName.trim()) {
      return products;
    }

    return products.filter(product => {
      return product.title.toLowerCase().includes(productName.toLowerCase())
    })
  }

}
