import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, coleccion: string, id: string) {

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) { // 4 terminó el proceso.
          if (xhr.status === 200) {
            console.log('subió');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('falló subida imagen');
            reject(JSON.parse(xhr.response));
          }
        }
      };
      let url = `${environment.urlServicios}upload/${coleccion}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });



  }


}
