import { Component, OnInit } from '@angular/core';
import { TcProviderService } from 'src/app/service/tc-provider.service';
import { StorageService } from 'src/app/service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tc-provider',
  templateUrl: './tc-provider.component.html',
  styleUrls: ['./tc-provider.component.scss'],
  providers: [
    TcProviderService, StorageService
  ]
})
export class TcProviderComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private tcProviderService: TcProviderService;
  private storageService: StorageService;
  private toastr: ToastrService;
  private response: any;
  data: any;

  constructor(
    route: ActivatedRoute,
    router: Router,
    storageService: StorageService,
    toastr: ToastrService,
    tcProviderService: TcProviderService
  ) {
    this.route = route;
    this.router = router;
    this.storageService = storageService;
    this.toastr = toastr;
    this.tcProviderService = tcProviderService;
   }

  ngOnInit() {
    this.tcProviderService.getAll().subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'ok') {
          this.data = this.response.data;
          this.toastr.success(this.response.message);
        } else {
          this.toastr.error(this.response.message);
        }
    },
    error => {
      this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
    });
  }

}
