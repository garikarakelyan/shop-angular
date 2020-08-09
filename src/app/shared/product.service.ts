import { Product } from './models/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product){
    return this.http.post(`${environment.dbUrl}/products.json`, product)
    .pipe(
      map((res: Product) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      })
    )
  }
}
