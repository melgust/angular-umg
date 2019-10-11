import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {

  private router: Router;
  private storageService: StorageService;

  constructor(router: Router, storageService: StorageService) {
    this.router = router;
    this.storageService = storageService;
  }
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.storageService.isAuthenticated()) {
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
  
}
