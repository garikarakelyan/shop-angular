import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Product } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order){
    return this.http.post(`${environment.dbUrl}/orders.json`, order)
    .pipe(
      map((res: Product) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      })
    )
  }

  getProducts() {
      return this.http.get(`${environment.dbUrl}/orders.json`)
      .pipe(map(response => {
        return Object.keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      }))
  }

  remove(id) {
    return this.http.delete(`${environment.dbUrl}/orders/${id}.json`)
  }
}
