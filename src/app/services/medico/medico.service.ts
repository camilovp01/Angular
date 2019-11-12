import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

  buscarMedico(termino: string) {
    let url = environment.urlServicios + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medicos)
    );
  }

}
