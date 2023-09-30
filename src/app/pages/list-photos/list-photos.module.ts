import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPhotosPageRoutingModule } from './list-photos-routing.module';

import { ListPhotosPage } from './list-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPhotosPageRoutingModule
  ],
  declarations: [ListPhotosPage]
})
export class ListPhotosPageModule {}
