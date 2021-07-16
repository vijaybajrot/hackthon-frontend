import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreateComponent } from './accounts/account-create/account-create.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AccountTransactionsComponent } from './accounts/account-transactions/account-transactions.component';
import { CreateTransactionComponent } from './accounts/create-transaction/create-transaction.component';
import { ReloadComponent } from './reload/reload.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'accounts',
    pathMatch:'full'
  },
  {
    path: '_reload',
    component: ReloadComponent
  },
  {
    path:'accounts',
    component: AccountListComponent
  },
  {
    path:'accounts/create',
    component: AccountCreateComponent
  },
  {
    path:'accounts/:id/transactions',
    component: AccountTransactionsComponent
  },
  {
    path:'accounts/:id/transactions/create',
    component: CreateTransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
