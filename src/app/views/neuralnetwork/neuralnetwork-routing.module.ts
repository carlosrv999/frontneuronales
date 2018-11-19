import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictComponent } from './predict.component';
import { WeightsComponent } from './weights.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'predecir',
        component: PredictComponent,
        data: {
          title: 'Predecir'
        }
      },
      {
        path: 'pesos',
        component: WeightsComponent,
        data: {
          title: 'Configurar Pesos'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeuralNetworkRoutingModule {}
