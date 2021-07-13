import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { AccountTransactionsComponent } from './accounts/account-transactions/account-transactions.component';
import { AccountCreateComponent } from './accounts/account-create/account-create.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateTransactionComponent } from './accounts/create-transaction/create-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    AccountsComponent,
    AccountListComponent,
    AccountCreateComponent,
    AccountTransactionsComponent,
    CreateTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
