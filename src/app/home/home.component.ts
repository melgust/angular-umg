import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private storageService: StorageService;

  constructor(
    storageService: StorageService
  ) { 
    this.storageService = storageService;
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.logout();
  }

}
