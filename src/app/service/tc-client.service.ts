import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { TcClient } from '../model/tc-client';

@Injectable({
  providedIn: 'root'
})
export class TcClientService {

  private url: String;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.url = Config.apiUrl;
   }

   add(data: TcClient){
    return this.http.post(this.url + 'client/add', data);
  }

  update(data: TcClient, id: number) {
    return this.http.put(this.url + 'client/' + id, data);
  }

  delete(id: number)  {
    return this.http.delete(this.url + 'client/' + id);
  }

  get( id: number ) {
    return this.http.get(this.url + 'client/' + id);
  }

  getAll() {
    return this.http.get(this.url + 'client/all');
  }

  getAllActive() {
    return this.http.get(this.url + 'client/all/active');
  }

}
