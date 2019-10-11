import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../model/user';
import { Config } from './config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: String;
  private http: HttpClient;

  constructor(
    http: HttpClient
  ) { 
    this.http = http;
    this.url = Config.apiUrl;
  }

  login(user: User) {
    return this.http.post(this.url + 'user/login', user);
  }
}
