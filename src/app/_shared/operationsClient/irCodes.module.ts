import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { OpsIRCodeComponent } from './irCodes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
  ],
  declarations: [OpsIRCodeComponent],
  exports: [OpsIRCodeComponent],
})
export class OpsIRCodeComponentModule {}
