import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private router: Router;
  private storageService: StorageService;

  constructor(
    storageService: StorageService,
    router: Router
  ) { 
    this.storageService = storageService;
    this.router = router;
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.logout();
  }

  goToProviders() {
    this.router.navigate(['/provider']);
  }

}
