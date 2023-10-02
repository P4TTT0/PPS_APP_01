import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListUglyPhotosPageRoutingModule } from './list-ugly-photos-routing.module';

import { ListUglyPhotosPage } from './list-ugly-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListUglyPhotosPageRoutingModule
  ],
  declarations: [ListUglyPhotosPage]
})
export class ListUglyPhotosPageModule {}
