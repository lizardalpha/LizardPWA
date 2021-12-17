import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpsHomeInstallationActionComponentRoutingModule } from './installationAction-routing.module';

import { OpsHomeClientStoresInstallationsActionComponent } from './installationAction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpsHomeInstallationActionComponentRoutingModule
  ],
  declarations: [OpsHomeClientStoresInstallationsActionComponent]
})
export class OpsHomeClientInstallationACtionComponentModule {}
