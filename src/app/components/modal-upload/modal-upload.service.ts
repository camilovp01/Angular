import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public coleccion: string;
  public id: string;
  public hide: string = 'hide';
  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.hide = 'hide';
    this.coleccion = null;
    this.id = null;
  }

  mostrarModal(coleccion: string, id: string) {
    this.hide = '';
    this.coleccion = coleccion;
    this.id = id;
  }
}
