import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customermodel } from './customermodel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Customermodelservice {
    private apiUrl = "http://localhost:8080/customers";
  constructor(private http: HttpClient) { }

  getAllCustomermodels(){
    return this.http.get<Customermodel[]>(this.apiUrl);
  }

  createCustomermodel(Customermodel: Customermodel): Observable<Customermodel> {
    return this.http.post<Customermodel>(this.apiUrl, Customermodel);
  }

  getCustomermodelById(id: any): Observable<Customermodel> {
    return this.http.get<Customermodel>(`${this.apiUrl}/${id}`);
  }

  updateCustomermodel(id: any, Customermodel: Customermodel): Observable<Customermodel> {
    return this.http.put<Customermodel>(`${this.apiUrl}/${id}`, Customermodel);
  }

  deleteCustomermodel(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
