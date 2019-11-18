import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hospital } from 'src/app/models/hospital/hospital.model';
import { Medico } from 'src/app/models/medico/medico.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public usuarios: Usuario[] = [];
  public cargando: boolean = true;

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    this.activatedRoute.params.subscribe((params) => {
      let termino = params.termino
      console.log(termino);
      this.buscar(termino).subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
        this.cargando = false;
        console.log(resp);
      });
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    let url = environment.urlServicios + 'busqueda/todo/' + termino
    return this.http.get(url);
  }

}
