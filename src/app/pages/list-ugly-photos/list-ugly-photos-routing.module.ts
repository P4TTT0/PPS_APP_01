import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUglyPhotosPage } from './list-ugly-photos.page';

const routes: Routes = [
  {
    path: '',
    component: ListUglyPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListUglyPhotosPageRoutingModule {}
