import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-donut',
  templateUrl: './grafico-donut.component.html',
  styles: []
})
export class GraficoDonutComponent implements OnInit {

  @Input() data: MultiDataSet[];
  @Input() labels: Label[];
  @Input() chartType: ChartType;

  constructor() { }

  ngOnInit() {
  }

}
