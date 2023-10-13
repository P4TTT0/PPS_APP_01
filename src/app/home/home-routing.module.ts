import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { NgApexchartsModule } from "ng-apexcharts";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgApexchartsModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
