import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, repeat } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(public http: HttpClient) { }

  cargarHospitales(desde: number) {
    let url = environment.urlServicios + 'hospital/?desde=' + desde;
    return this.http.get(url);
  }

  buscarHospital(termino: string) {
    let url = environment.urlServicios + 'busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  actualizar(hospital: Hospital) {
    let url = environment.urlServicios + 'hospital/' + hospital._id;
    return this.http.put(url, hospital).pipe(
      map(() => {
        Swal.fire({
          title: "Hospital actualizado",
          text: hospital.nombre,
          icon: "success",
        });
        return true;
      })
    );
  }

  borrarHospital(id: string) {
    let url = environment.urlServicios + 'hospital/' + id;
    return this.http.delete(url);
  }

  crearHospital(nombre: string) {
    let url = environment.urlServicios + 'hospital';
    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  obtenerHospital(id: string) {

    let url = environment.urlServicios + 'hospital/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );

  }

}
