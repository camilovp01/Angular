import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then((e) => console.log('terminó', e))
      .catch(e => console.error('error en la promesa', e));
  }

  ngOnInit() {
  }

  contarTres() {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        console.log(contador);
        if (contador === 3) {
          resolve('Todo ok!');
          clearInterval(intervalo); // si no se limpia el intervalo sigue contando asi haya llegado al resolve()
        }
      }, 1000);
    });
  }

}
