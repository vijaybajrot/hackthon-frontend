import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  constructor(private http: HttpClient) {}

  sync(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.syncApiUrl}/seed-data`,
      {}
    );
  }
}
