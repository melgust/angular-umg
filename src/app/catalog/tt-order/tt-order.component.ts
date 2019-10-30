import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TtOrder } from 'src/app/model/tt-order';
import { TtOrderService } from 'src/app/service/tt-order.service';

@Component({
  selector: 'app-tt-order',
  templateUrl: './tt-order.component.html',
  styleUrls: ['./tt-order.component.scss'],
  providers: [
    TtOrderService, StorageService
  ]
})
export class TtOrderComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;
  private ttOrderService: TtOrderService;
  private storageService: StorageService;
  private toastr: ToastrService;
  private response: any;
  data: any;

  constructor(
    route: ActivatedRoute,
    router: Router,
    storageService: StorageService,
    toastr: ToastrService,
    ttOrderService: TtOrderService
  ) {
    this.route = route;
    this.router = router;
    this.storageService = storageService;
    this.toastr = toastr;
    this.ttOrderService = ttOrderService;
   }

  ngOnInit() {
    this.ttOrderService.getAll().subscribe(
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

  addOrder() {
    this.router.navigate(['/order/add']);
  }

  editOrder(item: TtOrder) {
    this.router.navigate(['/order/' + item.orderId + '/edit']);
  }

}
