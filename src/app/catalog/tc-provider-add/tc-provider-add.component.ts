import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TcProviderService } from 'src/app/service/tc-provider.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TcProvider } from 'src/app/model/tc-provider';

@Component({
  selector: 'app-tc-provider-add',
  templateUrl: './tc-provider-add.component.html',
  styleUrls: ['./tc-provider-add.component.scss']
})
export class TcProviderAddComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private tcProviderService: TcProviderService;
  private storageService: StorageService;
  private toastr: ToastrService;
  private response: any;
  generalForm: FormGroup;
  private formBuilder: FormBuilder;
  private isEdit: boolean;
  dataStatus: any = [
    {statusId: 0, statusDesc: "Inactivo"},
    {statusId: 1, statusDesc: "Activo"}
  ];

  constructor(
    route: ActivatedRoute,
    router: Router,
    storageService: StorageService,
    toastr: ToastrService,
    tcProviderService: TcProviderService,
    formBuilder: FormBuilder
  ) {
    this.route = route;
    this.router = router;
    this.storageService = storageService;
    this.toastr = toastr;
    this.tcProviderService = tcProviderService;
    this.formBuilder = formBuilder;
   }

  ngOnInit() {
    this.isEdit = false;
    this.generalForm = this.formBuilder.group({
      providerId: null,
      providerDesc: [null, [Validators.required]],
      contactName: [null, [Validators.required]],
      statusId: 1
    });

    let providerId = this.route.snapshot.params['providerId'];
    if (providerId != undefined) {
      this.tcProviderService.get(providerId).subscribe(
        Response => {
          this.response = Response;
            if (this.response.status === 'ok') {
            let tcProvider = this.response.data[0];
            this.generalForm.get('providerId').setValue(tcProvider.providerId);
            this.generalForm.get('providerDesc').setValue(tcProvider.providerDesc);
            this.generalForm.get('contactName').setValue(tcProvider.contactName);
            this.generalForm.get('statusId').setValue(tcProvider.statusId);
          } else {
            this.toastr.error(this.response.message);
          }
      },
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      });
    }

  }

  onSubmit() {
    if (this.generalForm.invalid) {
      return;
    }
    let data: TcProvider = this.generalForm.value;
    if (this.isEdit) {
      this.tcProviderService.update(data, data.providerId).subscribe(
        Response => {
          this.response = Response;
          if (this.response.status === 'ok') {          
            this.toastr.success(this.response.message);
            this.router.navigate(['/provider']);
          } else {
            this.toastr.error(this.response.message);
          }
      },
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      });
    } else {
      this.tcProviderService.add(data).subscribe(
        Response => {
          this.response = Response;
          if (this.response.status === 'ok') {
            this.toastr.success(this.response.message);
            this.router.navigate(['/provider']);
          } else {
            this.toastr.error(this.response.message);
          }
      },
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      });
    }
  }

  cancel() {
    this.router.navigate(['/provider']);
  }

}
