import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';


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
    return next.handle(reqClon);
  }

}
