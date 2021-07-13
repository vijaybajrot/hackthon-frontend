import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, AccountService, Transaction } from '../account.service';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss'],
})
export class AccountTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  account!: Account;

  constructor(
    private accountService: AccountService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const accountId = params.id;

      this.accountService
        .getAccount(accountId)
        .subscribe((account: Account) => {
          this.account = account;
          this.accountService
            .getAccountTransactions(accountId)
            .subscribe((transactions) => (this.transactions = transactions));
        });
    });
  }
}
