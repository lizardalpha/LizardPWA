import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { IonicSelectableModule } from 'ionic-selectable';

import { OpsHomeClientStoresInstallationsComponentRoutingModule } from './viewInstallationForStore-routing.module';

import { OpsHomeClientStoresInstallationsComponent } from './viewInstallationForStore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    IonicSelectableModule,
    OpsHomeClientStoresInstallationsComponentRoutingModule
  ],
  declarations: [OpsHomeClientStoresInstallationsComponent]
})
export class OpsHomeClientStoresInstallationsComponentModule {}
