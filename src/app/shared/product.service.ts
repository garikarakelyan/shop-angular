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

  getProducts() {
      return this.http.get(`${environment.dbUrl}/products.json`)
      .pipe(map(response => {
        return Object.keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      }))
  }

  getProduct(id) {
    return this.http.get(`${environment.dbUrl}/products/${id}.json`)
    .pipe(map((response: Product) => {
      return {
        ...response,
        id,
        date: new Date(response.date)
      }
    }))
  }

  remove(id) {
    return this.http.delete(`${environment.dbUrl}/products/${id}.json`)
  }

  update(product: Product) {
    return this.http.patch(`${environment.dbUrl}/products/${product.id}.json`, product)
  }
}
