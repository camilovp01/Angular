import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    
    let url = environment.urlServicios + 'imagenes/';

    if (!img) {
      return url + 'usuarios/notfound';
    }
    
    if (img.indexOf('https') >= 0) {
      return img;
    }

    if (!img) {
      return url + 'usuario/notfound';
    }

    switch (tipo) {
      case 'usuarios':
        return url + 'usuarios/' + img;

      case 'medicos':
        return url + 'medicos/' + img;

      case 'hospitales':
        return url + 'hospitales/' + img;

      default:
        return url + 'usuarios/notfound';
    }
  }

}
