// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ColorsComponent, ModalContentComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  entryComponents: [
    ModalContentComponent
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent,
    ModalContentComponent
  ],
  providers: [
    ApiService
  ]
})
export class ThemeModule { }
