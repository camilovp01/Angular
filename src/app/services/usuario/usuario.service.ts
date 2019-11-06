import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string;
  public usuario: Usuario;

  constructor(private http: HttpClient, public router: Router) {
    this.token = localStorage.getItem('token') || '';
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
  }

  esAutenticado() {
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  crear(usuario: Usuario) {
    let url = environment.urlServicios + 'usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal.fire({
          title: "Usuario creado",
          text: usuario.email,
          icon: "success",
        });
        return resp.usuario;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = environment.urlServicios + 'login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  loginGoogle(token: string) {
    let url = environment.urlServicios + 'login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
