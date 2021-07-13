import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(),
    accountName: new FormControl(),
    description: new FormControl(),
  });

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  saveAccount() {
    const values = this.accountForm.value;
    //Todo: Handle Errors
    this.accountService.createAccount(values).subscribe((account) => {
      this.accountForm.reset();
      if (account && account.id) {
        this.router.navigate(['/accounts']);
      }
      window.alert('Account Created!');
    });
  }
}
