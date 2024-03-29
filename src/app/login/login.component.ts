import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public recuerdame: boolean = false;
  public email: string;
  public auth2: any;

  constructor(public router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '381051639735-86kgaapka4v082na8rc54uvbo7rbtauh.apps.googleusercontent.com',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      // this._usuarioService.loginGoogle(token).subscribe(() => this.router.navigate(['/dashboard']));
      this._usuarioService.loginGoogle(token).subscribe(() => window.location.href = '#/dashboard'); // evita el bug responsive
    });
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuarioService.login(usuario, form.value.recuerdame).subscribe(() => this.router.navigate(['/dashboard']));
  }

}
