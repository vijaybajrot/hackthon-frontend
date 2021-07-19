import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const accountId = params.id;

      this.accountService.getAccount(accountId).subscribe(
        (account: Account) => {
          this.account = account;
          this.accountService
            .getAccountTransactions(accountId)
            .subscribe((transactions) => (this.transactions = transactions));
        },
        (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            return this.router.navigate(['/']);
          }

          throw error;
        }
      );
    });
  }
}
