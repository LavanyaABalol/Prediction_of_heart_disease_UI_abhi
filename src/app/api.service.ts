import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  predict(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/predict`, data);
  }
}