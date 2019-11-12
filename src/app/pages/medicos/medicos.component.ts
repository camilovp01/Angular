import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/services.index';
import { Medico } from 'src/app/models/medico/medico.model';

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

  }

}
