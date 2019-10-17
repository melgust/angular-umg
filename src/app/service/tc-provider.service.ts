import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { TcProvider } from '../model/tc-provider';

@Injectable({
  providedIn: 'root'
})
export class TcProviderService {

  private url: String;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.url = Config.apiUrl;
   }

   add(data: TcProvider){
    return this.http.post(this.url + 'provider/add', data);
  }

  update(data: TcProvider, id: number) {
    return this.http.put(this.url + 'provider/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.url + 'provider/' + id);
  }

  get( id: number ) {
    return this.http.get(this.url + 'provider/' + id);
  }

  getAll() {
    return this.http.get(this.url + 'provider/all');
  }

  getAllActive() {
    return this.http.get(this.url + 'provider/all/active');
  }

}
