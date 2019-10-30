import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { TcProduct } from '../model/tc-product';

@Injectable({
  providedIn: 'root'
})
export class TcProductService {

  private url: String;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.url = Config.apiUrl;
   }

   add(data: TcProduct){
    return this.http.post(this.url + 'product/add', data);
  }

  update(data: TcProduct, id: number) {
    return this.http.put(this.url + 'product/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.url + 'product/' + id);
  }

  get( id: number ) {
    return this.http.get(this.url + 'product/' + id);
  }

  getAll() {
    return this.http.get(this.url + 'product/all');
  }

  getAllActive() {
    return this.http.get(this.url + 'product/all/active');
  }

}
