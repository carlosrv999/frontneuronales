import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'predict.component.html',
  styleUrls: ['loading.css']
})
export class PredictComponent implements OnInit {
  bsModalRef: BsModalRef;

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Muy Alto', 'Alto', 'Medio', 'Bajo'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public data: any[];

  public barChartData: any[] = [
    { data: this.data, label: 'Nivel de Vulnerabilidad' }
  ];


  public formgroup: FormGroup;
  loading = false;
  public themeColors(): void {
    Array.from(document.querySelectorAll('.theme-color')).forEach(function (el) {
      const elem = document.getElementsByClassName(el.classList[0])[0];
      const background = getStyle('background-color', elem);

      const table = document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
          <tr>
            <td class="text-muted">HEX:</td>
            <td class="font-weight-bold">${rgbToHex(background)}</td>
          </tr>
          <tr>
            <td class="text-muted">RGB:</td>
            <td class="font-weight-bold">${background}</td>
          </tr>
        </table>
      `;

      el.parentNode.appendChild(table);
    });

  }

  createform() {
    this.formgroup = this.fb.group({
      'area': [0, Validators.required],
      'riesgo_deslizamiento': [1, Validators.required],
      'riesgo_inundacion': [0, Validators.required],
      'mov_masas': [1, Validators.required],
      'inundacion': [1, Validators.required],
      'infra_niv_i': [0, Validators.required],
      'infra_niv_ii': [0, Validators.required],
      'infra_niv_iii': [0, Validators.required]
    });
  }

  submitForm() {
    this.loading = !this.loading;
    this.api.getApi(this.formgroup.value).subscribe(
      (res: any) => {
        
        
        this.loading = false;
        let respuesta = [];
        respuesta[0] = res[0];
        respuesta[1] = res[1];
        respuesta[2] = res[2];
        respuesta[3] = res[3];
        this.data = respuesta;
        const initialState = {
          barChartOptions: {
            scaleShowVerticalLines: false,
            responsive: true
          },
          barChartLabels:  ['Muy Alto', 'Alto', 'Medio', 'Bajo'],
          barChartType: 'bar',
          barChartLegend: true,
          barChartData: [
            { data: this.data, label: 'Nivel de Vulnerabilidad' },
          ],
          list: [
            'Open a modal with component',
            'Pass your data',
            'Do something else',
            '...'
          ],
        };
        this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
        this.bsModalRef.content.closeBtnName = 'Close';
        console.log(this.data);
      }, (err: any) => {
        this.loading = false;
        console.log(err);
      }
    )
  }

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.themeColors();
    this.createform();
  }
}

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Resultados</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="card">
        <div class="card-header">
          Resultado
        </div>
        <div class="card-body">
          <div class="chart-wrapper">
            <canvas baseChart class="chart"
            [datasets]="barChartData"
            [labels]="barChartLabels"
            [options]="barChartOptions"
            [legend]="barChartLegend"
            [chartType]="barChartType"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})

export class ModalContentComponent implements OnInit, OnDestroy {
  closeBtnName: string;
  barChartOptions: any;
  barChartLabels:  any[];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}