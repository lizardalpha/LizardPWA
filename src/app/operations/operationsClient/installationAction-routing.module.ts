import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpsHomeClientStoresInstallationsActionComponent } from './installationAction.page';

const routes: Routes = [
  {
    path: '',
    component: OpsHomeClientStoresInstallationsActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpsHomeInstallationActionComponentRoutingModule {}
