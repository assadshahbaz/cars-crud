import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  $loader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  fetchAll(APIName: string) {
    return this.http.get(`${environment.baseURL}${APIName}`);
  }

  fetchSingle(APIName: string, id: string) {
    return this.http.get(`${environment.baseURL}${APIName}/${id}`);
  }

  create(APIName: string, body: any) {
    return this.http.post(`${environment.baseURL}${APIName}`, body);
  }

  update(APIName: string, body: any, id: string) {
    return this.http.patch(`${environment.baseURL}${APIName}/${id}`, body);
  }

  delete(APIName: string, id: string) {
    return this.http.delete(`${environment.baseURL}${APIName}/${id}`);
  }
}
