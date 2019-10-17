import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {
  private storageService: StorageService;
  private jwtHelper: any = new JwtHelperService();

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.storageService.getCurrentToken();
    if (jwt !== null) {
      if (this.jwtHelper.isTokenExpired(jwt)) {
        this.storageService.logout();
      } else {
        try {
          
        } catch (error) {
          
        }
        let setHeaders = {
          Authorization: `Bearer ${jwt}`,
          'Content-type': 'application/json'
        };
        req = req.clone({
          setHeaders : setHeaders
        });
      }      
    } else {
      req = req.clone({
        setHeaders: {
          'Content-type': 'application/json'
        }
      });
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          
        }
      }, error => {
        if (error.error.status == 401 || error.error.status == 403) {
          this.storageService.logout();
        }        
      })
    )

  }
  
}

