import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string;
  public usuario: Usuario;
  public menu: any = [];

  constructor(private http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.token = localStorage.getItem('token') || '';
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
    this.menu = this.token.length > 0 ? JSON.parse(localStorage.getItem('menu')) : null;
  }

  renovarToken() {
    let url = environment.urlServicios + 'login/renovartoken';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        Swal.fire('No se pudo actulizar token', 'No se actualizó token', 'error');
        return throwError('');
      })
    );
  }

  esAutenticado() {
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.menu = menu;
  }

  crear(usuario: Usuario) {
    let url = environment.urlServicios + 'usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
    );
  }

  loginGoogle(token: string) {
    let url = environment.urlServicios + 'login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }));
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = [];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  actualizar(usuario: Usuario) {
    let url = environment.urlServicios + 'usuario/' + usuario._id;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioDb: Usuario = resp.usuario;
          this.guardarStorage(usuarioDb._id, this.token, usuarioDb, this.menu);
        }
        Swal.fire({
          title: "Usuario actualizado",
          text: usuario.nombre,
          icon: "success",
        });
        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire({
          title: "Imagen actualizada",
          text: resp.usuario.nombre,
          icon: "success",
        });
        this.guardarStorage(id, this.token, this.usuario, this.menu);
        this.router.navigate(['/profile']);
      })
      .catch((resp) => {
        console.log(resp)
      });
  }

  cargarUsuarios(desde: number) {
    let url = environment.urlServicios + 'usuario/?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(termino: string) {
    let url = environment.urlServicios + 'busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.usuarios)
    );
  }

  borrarUsuario(id: string) {
    let url = environment.urlServicios + 'usuario/' + id;
    return this.http.delete(url);
  }

}
