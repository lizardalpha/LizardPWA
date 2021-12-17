import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_gaurds/auth-guard.service';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },


  //{
  //  path: 'home',
  //  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  //},
  //{
  //  path: '',
  //  redirectTo: 'home',
  //  pathMatch: 'full'
  //},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'Operations',
    loadChildren: () => import('./operations/operationsClient/viewStores.module').then(m => m.OpsHomeClientStoresComponentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'Operations/Installations',
    loadChildren: () => import('./operations/operationsClient/viewInstallationForStore.module').then(m => m.OpsHomeClientStoresInstallationsComponentModule),
   // canActivate: [AuthGuard]
  },
  {
    path: 'Operations/InstallationAction',
    loadChildren: () => import('./operations/operationsClient/installationAction.module').then(m => m.OpsHomeClientInstallationACtionComponentModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
