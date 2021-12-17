import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpsHomeClientStoresComponentRoutingModule } from './viewStores-routing.module';

import { OpsHomeClientStoresComponent } from './viewStores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpsHomeClientStoresComponentRoutingModule
  ],
  declarations: [OpsHomeClientStoresComponent]
})
export class OpsHomeClientStoresComponentModule {}
