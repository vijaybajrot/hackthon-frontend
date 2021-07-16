import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SyncService } from 'src/app/sync.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  syncing: boolean = false;
  constructor(private syncService: SyncService, private router: Router) {}

  ngOnInit(): void {
    console.log('header mount');
  }

  sync() {
    this.syncing = true;
    this.syncService.sync().subscribe(
      (data) => {
        this.syncing = false;
        console.log(data);
        if (data.message && data.message == 'success') {
          window.alert('Sync was successfull');
          const currentUrl = this.router.url;
          this.router.navigate([currentUrl], {replaceUrl: true});
        }
      },
      (error: HttpErrorResponse) => {
        this.syncing = false;
        console.log('ERROR IN SYNC !!!!');
        console.log(error);
      }
    );
  }
}
