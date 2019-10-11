import { Injectable, Compiler } from '@angular/core';
import { SessionUser } from '../model/session-user';
import { Router } from '@angular/router';
import { TcUser } from '../model/tc-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService: any;
  private currentSession: SessionUser = null;
  private token: string = null;

  constructor(private router: Router,private _compiler: Compiler) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    if (this.currentSession !== null) {
      this.token = this.currentSession.token;
    }
  }

  setLocalData (data: any, name: string, parse: boolean) {
    if (parse) {
      this.localStorageService.setItem(name, JSON.stringify(data));
    } else {
      this.localStorageService.setItem(name, data);
    }
  }

  removeLocalData (name: string) {
    this.localStorageService.removeItem(name);
  }

  getLocalData ( name: string, parse: boolean ) : any {
    if (parse) {
      var data = JSON.parse(this.localStorageService.getItem(name));
    } else {
      var data = this.localStorageService.getItem(name);
    }
    return data;
  }

  setCurrentSession(session: SessionUser): void {
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
    this.currentSession = session;
    this.token = session.token;
  }

  loadSessionData(): SessionUser {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <SessionUser> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): SessionUser {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): TcUser {
    var session: SessionUser = this.getCurrentSession();
    return (session && session.tcUser) ? session.tcUser : null;
  }

  isAuthenticated(): boolean {
    if (this.getCurrentToken() != null) {
      return true;
    }
    return false;
  }

  getCurrentToken(): string {
    if (this.token === null) {
      this.currentSession = this.loadSessionData();
      if (this.currentSession !== null) {
        this.token = this.currentSession.token;
      }
    }
    return this.token;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
    this._compiler.clearCache();
  }

  removeLastSession() {
    this.removeCurrentSession();
  }

  
}
