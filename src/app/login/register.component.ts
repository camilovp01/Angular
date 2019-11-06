import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let c1 = group.controls[campo1].value;
      let c2 = group.controls[campo2].value;
      if (c1 === c2) {
        return null;
      }

      return {
        passwordsDiferentes: true
      }
    }
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(null)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true,
    })
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal.fire({
        title: "Debe aceptar las condiciones del servicio",
        html: "<a href='http://condiciones.com' target='_blank'>Condiciones aquí</a>",
        icon: "warning",
      });
      return
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    if (this.forma.valid) {
      this._usuarioService.crear(usuario).subscribe(() => this.router.navigate(['/login']));
    }
  }

}
