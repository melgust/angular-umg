import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { User } from '../model/user';
import { ToastrService, Toast } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(
    router: Router,
    loginService: LoginService,
    toastr: ToastrService
  ) { 
    this.router = router;
    this.loginService = loginService;
    this.toastr = toastr;
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
          let token = this.response.singleResponse;
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
