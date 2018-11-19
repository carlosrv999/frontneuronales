// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PredictComponent, ModalContentComponent } from './predict.component';
import { WeightsComponent } from './weights.component';

// Theme Routing
import { NeuralNetworkRoutingModule } from './neuralnetwork-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { DialogComponent } from './dialog.component';
import { UploadService } from './upload.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    MatProgressBarModule,
    NeuralNetworkRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  entryComponents: [
    ModalContentComponent,
    DialogComponent
  ],
  declarations: [
    PredictComponent,
    WeightsComponent,
    DialogComponent,
    ModalContentComponent
  ],
  providers: [
    ApiService,
    UploadService
  ]
})
export class NeuralNetworkModule { }
