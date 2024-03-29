import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentaje1: number = 20;
  porcentaje2: number = 60;

  constructor() { }

  ngOnInit() {
  }

  actualizar1(event: number) {
    this.porcentaje1 = event;
  }

  actualizar2(event: number) {
    this.porcentaje2 = event;
  }

}
