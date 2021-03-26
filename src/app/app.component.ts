import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { StorageService } from './utils/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  emailUser: string;

  constructor(public storage: StorageService) { }

  ngOnInit(): void {
    const localUser = this.storage.getLocalUser();
    if (localUser) {
      this.emailUser = localUser.email;
    } else {
      this.emailUser = '';
    }
  }

  title = 'ang-admin-app';
}
