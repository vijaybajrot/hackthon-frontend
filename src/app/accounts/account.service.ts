import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export type Account = {
  id: number;
  accountBalance: number;
  accountNumber: string;
  accountName: string;
  description?: string;
};

export type Transaction = {
  id: number;
  txnNumber: string;
  amount: number;
  txnType: string;
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts`);
  }

  public getAccountTransactions(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${environment.apiUrl}/accounts/${accountId}/transactions`
    );
  }

  public createAccount(data: {
    accountNumber: string;
    accountName: string;
    description: string;
  }) {
    return this.http.post<Account>(`${environment.apiUrl}/accounts`, data);
  }

  public getAccount(accountId: number): Observable<Account> {
    return this.http.get<Account>(
      `${environment.apiUrl}/accounts/${accountId}`
    );
  }

  public createTransaction(
    accountId: number,
    data: { amount: number; txnType: string }
  ): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${environment.apiUrl}/accounts/${accountId}/transactions`,
      data
    );
  }
}
