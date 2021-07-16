import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnInit {
  accountId!: number;
  errors: Array<{ field: string; message: string }> = [];
  transactionForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    txnType: new FormControl('', [Validators.required]),
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

  hasError(fieldName: string) {
    const field = this.transactionForm.get(fieldName) as FormControl;
    if (!field) return false;

    return field.touched && !field.valid;
  }

  save() {
    const { amount, txnType } = this.transactionForm.value;
    if (!amount || !txnType) {
      return window.alert('Please enter amount and type');
    }

    this.accountService
      .createTransaction(this.accountId, { amount, txnType })
      .subscribe(
        (transation) => {
          console.log(transation);
          window.alert(
            `Transation Created, Txn Number: ${transation.txnNumber}`
          );
          this.router.navigate(['../'], { relativeTo: this.activeRoute });
        },
        (error: HttpErrorResponse) => {
          this.transactionForm.reset();
          if (error.status === HttpStatusCode.BadRequest) {
            return window.alert('Unable to create transation');
          }
          if (error.status === HttpStatusCode.UnprocessableEntity) {
            this.errors = error.error?.errors;
          }
        }
      );
  }
}
