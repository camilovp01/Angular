import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/services.index';
import { Medico } from 'src/app/models/medico/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public totalRegistros: number = 0;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde).subscribe((resp: any) => {
      this.medicos = resp;
      this.totalRegistros = this._medicoService.totalMedicos;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {
    if (!termino) {
      this.desde = 0;
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this._medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'Se eliminará el usuario ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico(medico._id).subscribe(() => {
          this.cargarMedicos();
          Swal.fire(
            'Borrado!',
            'El usuario' + medico.nombre + ' ha sido eliminado',
            'success'
          )
        });
      }
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }

}
