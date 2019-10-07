import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputPorcentaje') inputPorcentaje: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(newValue: number) {

    //let elementoHTML: any = document.getElementsByName('porcentaje')[0];
    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    //elementoHTML.value = this.porcentaje;
    this.inputPorcentaje.nativeElement.value;
    this.cambioValor.emit(this.porcentaje);
  }

  cambiarValor(valor: number) {
    if (this.porcentaje + valor <= 0 || this.porcentaje + valor >= 100) {
      this.porcentaje = valor < 0 ? this.porcentaje = 0 : this.porcentaje = 100
      return;
    }
    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);

    this.inputPorcentaje.nativeElement.focus();
  }

}
