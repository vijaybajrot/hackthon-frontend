import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit {
  errors: Array<{ field: string; message: string }> = [];
  accountForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    accountName: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  saveAccount() {
    if (this.accountForm.invalid) {
      return;
    }
    const values = this.accountForm.value;

    this.accountService.createAccount(values).subscribe(
      (account) => {
        this.accountForm.reset();
        if (account && account.id) {
          this.router.navigate(['/accounts']);
        }
        window.alert('Account Created!');
      },
      (error: HttpErrorResponse) => {
        this.accountForm.reset();
        if (error.status === HttpStatusCode.BadRequest) {
          return window.alert(
            'Unable to create account, Account number already exists!'
          );
        }
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          this.errors = error.error?.errors;
        }
      }
    );
  }

  hasError(fieldName: string) {
    const field = this.accountForm.get(fieldName) as FormControl;
    if (!field) return false;

    return field.touched && !field.valid;
  }
}
