import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

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

@NgModule({
  declarations: [
    AppComponent
    , ItemsearchPipe
    , NavBarComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
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
    ReactiveFormsModule,],
  bootstrap: [AppComponent],
})
export class AppModule {}