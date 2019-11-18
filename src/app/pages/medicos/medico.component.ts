import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico/medico.model';
import { MedicoService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital/hospital.model';
import { HospitalesService } from 'src/app/services/services.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/services/services.index';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico('', '', '', '', '');
  public hospital: Hospital = new Hospital('');


  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalesService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });

  }

  ngOnInit() {
    this._hospitalService.cargarHospitales(0)
      .subscribe((resp: any) => this.hospitales = resp.hospitales);
    this._modalUploadService.notificacion
      .subscribe((resp: any) => {
        this.medico.img = resp.medico.img;
      });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
      .subscribe(medico => {

        console.log(medico);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f);
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambioHospital(id: string) {
    console.log(id);
    this._hospitalService.obtenerHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }


}
