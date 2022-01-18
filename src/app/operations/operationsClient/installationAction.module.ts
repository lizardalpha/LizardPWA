import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { OpsHomeInstallationActionComponentRoutingModule } from './installationAction-routing.module';

import { OpsHomeClientStoresInstallationsActionComponent } from './installationAction.page';

declare var jQuery: any;
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    OpsHomeInstallationActionComponentRoutingModule,
    
  ],
  declarations: [OpsHomeClientStoresInstallationsActionComponent]
})
export class OpsHomeClientInstallationACtionComponentModule {}
