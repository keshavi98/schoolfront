import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    RouterModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
