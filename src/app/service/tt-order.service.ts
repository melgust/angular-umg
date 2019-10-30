import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { TtOrder } from '../model/tt-order';

@Injectable({
  providedIn: 'root'
})
export class TtOrderService {

  private url: String;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.url = Config.apiUrl;
   }

   add(data: TtOrder){
    return this.http.post(this.url + 'order/add', data);
  }

  update(data: TtOrder, id: number) {
    return this.http.put(this.url + 'order/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.url + 'order/' + id);
  }

  get( id: number ) {
    return this.http.get(this.url + 'order/' + id);
  }

  getAll() {
    return this.http.get(this.url + 'order/all');
  }

  getAllActive() {
    return this.http.get(this.url + 'order/all/active');
  }

}
