import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TtOrderService } from 'src/app/service/tt-order.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TtOrder } from 'src/app/model/tt-order';
import { TcClientService } from 'src/app/service/tc-client.service';
import { TcClient } from 'src/app/model/tc-client';
import { TcProductService } from 'src/app/service/tc-product.service';
import { TcProduct } from 'src/app/model/tc-product';
import { TtOrderDetail } from 'src/app/model/tt-order-detail';

@Component({
  selector: 'app-tt-order-add',
  templateUrl: './tt-order-add.component.html',
  styleUrls: ['./tt-order-add.component.scss'],
  providers: [
    TcClientService,
    TcProductService
  ]
})
export class TtOrderAddComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private ttOrderService: TtOrderService;
  private storageService: StorageService;
  private tcClientService: TcClientService;
  private tcProductService: TcProductService;
  private toastr: ToastrService;
  private response: any;
  generalForm: FormGroup;
  private formBuilder: FormBuilder;
  private isEdit: boolean;
  dataStatus: any = [
    {statusId: 0, statusDesc: "Inactivo"},
    {statusId: 1, statusDesc: "Activo"}
  ];

  dataClient: any;
  dataProduct: any;
  data: TtOrder;

  constructor(
    route: ActivatedRoute,
    router: Router,
    storageService: StorageService,
    toastr: ToastrService,
    ttOrderService: TtOrderService,
    tcClientService: TcClientService,
    tcProductService: TcProductService,
    formBuilder: FormBuilder
  ) {
    this.route = route;
    this.router = router;
    this.storageService = storageService;
    this.toastr = toastr;
    this.ttOrderService = ttOrderService;
    this.tcClientService = tcClientService;
    this.tcProductService = tcProductService;
    this.formBuilder = formBuilder;
   }

  loadCatalogs() {
    this.tcClientService.getAll().subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'ok') {
          this.dataClient = this.response.data;
        } else {
          this.toastr.error(this.response.message);
        }
      },
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      }
    );
    this.tcProductService.getAll().subscribe(
      Response => {
        this.response = Response;
        if (this.response.status === 'ok') {
          this.dataProduct = this.response.data;
        } else {
          this.toastr.error(this.response.message);
        }
      },
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      }
    );
  }

  ngOnInit() {
    this.data = new TtOrder();
    this.data.details = new Array();
    this.loadCatalogs();
    this.isEdit = false;
    this.generalForm = this.formBuilder.group({
      orderId: null,
      clientId: [null, [Validators.required]],
      total: [null, [Validators.required]],
      statusId: 1
    });

    let orderId = this.route.snapshot.params['orderId'];
    if (orderId != undefined) {
      this.ttOrderService.get(orderId).subscribe(
        Response => {
          this.response = Response;
            if (this.response.status === 'ok') {
            let ttOrder: TtOrder = this.response.data[0];
            this.generalForm.get('orderId').setValue(ttOrder.orderId);
            this.generalForm.get('clientId').setValue(ttOrder.tcClient.clientId);
            this.generalForm.get('total').setValue(ttOrder.total);
            this.generalForm.get('statusId').setValue(ttOrder.statusId);
            this.data = ttOrder;
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
    let data: TtOrder = this.generalForm.value;
    if (this.isEdit) {
      this.ttOrderService.update(data, data.orderId).subscribe(
        Response => {
          this.response = Response;
          if (this.response.status === 'ok') {          
            this.toastr.success(this.response.message);
            this.router.navigate(['/order']);
          } else {
            this.toastr.error(this.response.message);
          }
      },
      error => {
        this.toastr.error('Status: ' + error.error.status + ' Error: ' + error.error.error + ' Message: ' + error.error.message);
      });
    } else {
      this.ttOrderService.add(data).subscribe(
        Response => {
          this.response = Response;
          if (this.response.status === 'ok') {
            this.toastr.success(this.response.message);
            this.router.navigate(['/order']);
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
    this.router.navigate(['/order']);
  }

  setClient(item: TcClient) {
    this.data.tcClient = item;
  }

  addDetail() {
    let ttOrderDetail: TtOrderDetail = new TtOrderDetail();
    this.data.details.push(ttOrderDetail);
  }

  setProduct(item: TcProduct, detail: TtOrderDetail) {
    detail.tcProduct = item;
    detail.price = item.price;
  }

  setTotalCost(detail: TtOrderDetail) {
    console.log(detail);
    
    detail.totalCost = detail.price * detail.totalItems;
  }

}
