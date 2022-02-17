import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { BasicService } from './basic.service';


@Injectable({
  providedIn: 'root',
})
export class HttpConfig implements HttpInterceptor {
  private totalRequests = 0;


  constructor(
    private basicService: BasicService,
    private tosterService: ToastrService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.sendRequest(req, next);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.basicService.$loader.next(true);

    let request = next.handle(req).pipe(
      tap(event => {
        return event;
      }, err => {
        console.log(err.statusText)
        this.tosterService.error(err.statusText);
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.basicService.$loader.next(false);
        }
      }));
    return request;
  }
}
