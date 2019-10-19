import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscribtion: Subscription;

  constructor() {
    this.suscribtion = this.regresaObservable().subscribe(
      num => console.log('subs', num),
      error => console.error('error', error),
      () => console.log("el observador terminó")
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('saliendo de RxjsComponent');
    this.suscribtion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;

        const salida = { valor: contador };

        observer.next(salida);

        // if (contador == 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador == 2) {
        //   // alert('2');
        //   // clearInterval(intervalo);
        //   observer.error('falló');
        // }

      }, 1000);

    }).pipe(
      map((salida:any) => salida.valor),
      filter((valor, index) => { // index numero de veces que ha sido notificado
        return valor % 2 === 0 ? false : true;
      })
    );
  }

}
