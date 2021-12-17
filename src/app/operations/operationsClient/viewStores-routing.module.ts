import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpsHomeClientStoresComponent } from './viewStores.page';

const routes: Routes = [
  {
    path: '',
    component: OpsHomeClientStoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpsHomeClientStoresComponentRoutingModule {}
