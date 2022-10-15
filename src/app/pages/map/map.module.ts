import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    MapRoutingModule
  ]
})
export class MapModule { }
