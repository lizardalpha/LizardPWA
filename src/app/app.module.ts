import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonApp } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NavBarComponent } from './navbar/navbar.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_gaurds/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_gaurds/auth-guard.service';
import { LoaderService } from './directives/loader.service';
import { ItemsearchPipe } from './directives/itemsearchpipe.component';
import { OpsIRCodeComponent } from './_shared/operationsClient/irCodes.component';
import { OpsIRCodeComponentModule } from './_shared/operationsClient/irCodes.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { ModalController } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    AppComponent
    , ItemsearchPipe
    , NavBarComponent
    
   
  ],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OpsIRCodeComponentModule,
    IonicSelectableModule,
    
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })

    , AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, authInterceptorProviders, AuthGuard, LoaderService],
  exports: [FormsModule,
    ItemsearchPipe,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
