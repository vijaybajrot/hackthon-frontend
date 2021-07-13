import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnInit {
  accountId!: number;
  transactionForm: FormGroup = new FormGroup({
    amount: new FormControl(),
    txnType: new FormControl(''),
  });

  constructor(
    private accountService: AccountService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.accountId = parseInt(params.id);
    });
  }

  save() {
    const { amount, txnType } = this.transactionForm.value;
    if (!amount || !txnType) {
      return window.alert('Please enter amount and type');
    }

    this.accountService
      .createTransaction(this.accountId, { amount, txnType })
      .subscribe((transation) => {
        console.log(transation);
        window.alert(`Transation Created, Txn Number: ${transation.txnNumber}`);
        this.router.navigate(['../'], { relativeTo: this.activeRoute });
      });
  }
}
