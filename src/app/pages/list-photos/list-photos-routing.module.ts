import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPhotosPage } from './list-photos.page';

const routes: Routes = [
  {
    path: '',
    component: ListPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPhotosPageRoutingModule {}
