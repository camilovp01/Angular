import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public _usuarioService: UsuarioService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');
    let params = new HttpParams();
    params = params.append('token', this._usuarioService.token);
    const reqClon = req.clone({
      params
    });
    return next.handle(reqClon).pipe(
      catchError(this.controlError)
    );
  }

  controlError(error: HttpErrorResponse) {
    Swal.fire('Error', error.error.mensaje, 'error');
    console.log('error', error);
    return throwError(error);
  }

}
