import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from 'src/app/models/hospital/hospital.model';
import { HospitalesService } from 'src/app/services/hospitales/hospitales.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/services/services.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _hospitalServices: HospitalesService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalServices.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (!termino) {
      this.desde = 0;
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalServices.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalServices.actualizar(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'Se eliminará el Hospital ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this._hospitalServices.borrarHospital(hospital._id).subscribe(() => {
          this.cargarHospitales();
          Swal.fire(
            'Borrado!',
            'El hospital' + hospital.nombre + ' ha sido eliminado',
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
    this.cargarHospitales();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  crearHospital(nombre: string) {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: "info"
    }).then(valor => {
      if (!valor || valor.value.length <= 0) {
        return;
      }
      let nombre = valor.value;
      this._hospitalServices.crearHospital(nombre).subscribe(() => {
        Swal.fire({
          title: 'Hospital creado',
          text: nombre,
          icon: "success"
        })
        this.cargarHospitales();
      });
    });
  }

}
