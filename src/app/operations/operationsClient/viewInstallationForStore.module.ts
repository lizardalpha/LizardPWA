import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpsHomeClientStoresInstallationsComponentRoutingModule } from './viewInstallationForStore-routing.module';

import { OpsHomeClientStoresInstallationsComponent } from './viewInstallationForStore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpsHomeClientStoresInstallationsComponentRoutingModule
  ],
  declarations: [OpsHomeClientStoresInstallationsComponent]
})
export class OpsHomeClientStoresInstallationsComponentModule {}
