import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SyncService } from 'src/app/sync.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  syncing: boolean = false;
  constructor(
    private syncService: SyncService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  sync() {
    this.syncing = true;
    this.syncService.sync().subscribe(
      (data) => {
        this.syncing = false;
        console.log(data);
        if (data.message && data.message == 'success') {
          window.alert('Sync was successfull');
          this.relaod();
        }
      },
      (error: HttpErrorResponse) => {
        this.syncing = false;
        console.log('ERROR IN SYNC !!!!');
        console.log(error);
      }
    );
  }

  relaod() {
    this.router
      .navigateByUrl('/_reload', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }
}
