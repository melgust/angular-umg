import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { User } from '../model/user';
import { ToastrService, Toast } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { SessionUser } from '../model/session-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  user: any = new User();
  private toastr: ToastrService;
  private loginService: LoginService;
  private router: Router;
  private response;
  errorMessage: any;
  private storageService: StorageService;


  constructor(
    router: Router,
    loginService: LoginService,
    toastr: ToastrService,
    storageService: StorageService
  ) { 
    this.router = router;
    this.loginService = loginService;
    this.toastr = toastr;
    this.storageService = storageService;
  }

  ngOnInit() {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
  }

  login() {
    this.loginService.login(this.user).subscribe (
      Response => {
        this.response = Response;
        if (this.response.status === 'ok') {
          let token = this.response.singleValue;
          let tcUser = this.response.data[0];
          const loginData = new SessionUser();
          loginData.tcUser = tcUser;
          loginData.token = token;
          this.storageService.setCurrentSession(loginData);
          sessionStorage.setItem('token', token);
          this.toastr.success('Acceso correcto');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = this.response.message;
          this.toastr.error(this.response.message);
        }
      }, 
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      }
    );
  }

}
