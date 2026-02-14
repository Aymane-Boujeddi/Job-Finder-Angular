import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Application } from '../models/application.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
    private httpClient = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/applications';

  getApplications(userId: string): Observable<Application[]> {
    return this.httpClient.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addApplication(application: Application): Observable<Application> {
    return this.httpClient.post<Application>(this.apiUrl,application);
  }

  updateApplication(id: number, changes: Partial<Application>): Observable<Application> {
    return this.httpClient.patch<Application>(`${this.apiUrl}/${id}`,changes);
  }

  deleteApplication(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
