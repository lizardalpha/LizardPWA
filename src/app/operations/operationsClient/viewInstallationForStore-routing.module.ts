import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpsHomeClientStoresInstallationsComponent } from './viewInstallationForStore.page';

const routes: Routes = [
  {
    path: '',
    component: OpsHomeClientStoresInstallationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpsHomeClientStoresInstallationsComponentRoutingModule {}
