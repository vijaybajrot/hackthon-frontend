import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reload',
  template: `
    <p>
      Loading...
    </p>
  `,
  styles: [
  ]
})
export class ReloadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
