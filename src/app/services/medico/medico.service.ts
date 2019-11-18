import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos = 0;

  constructor(public http: HttpClient) { }

  cargarMedicos(desde: number) {
    let url = environment.urlServicios + 'medico/?desde=' + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total
        return resp.medico
      })
    );
  }

  cargarMedico(id: string) {
    let url = environment.urlServicios + 'medico/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }

  buscarMedico(termino: string) {
    let url = environment.urlServicios + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medicos)
    );
  }

  borrarMedico(id: string) {
    let url = environment.urlServicios + 'medico/' + id;
    return this.http.delete(url);
  }

  guardarMedico(medico: Medico) {
    let url = environment.urlServicios + 'medico/';
    if (medico._id) {
      // actualizando
      url += medico._id;
      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire('Médico Actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      // creando
      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire('Médico Creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }
  }

}
