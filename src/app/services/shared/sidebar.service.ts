import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  // menu: any = [
  //   {
  //     titulo: 'principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'DashBoard', url: '/dashboard' },
  //       { titulo: 'Progress', url: '/progress' },
  //       { titulo: 'Grafica1', url: '/grafica1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RxJs', url: '/rxjs' },
  //       { titulo: 'RxJs', url: '/rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //     ]
  //   }
  // ];

  constructor(public _usuarioService: UsuarioService) {
  }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
