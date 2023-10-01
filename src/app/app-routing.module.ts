import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { AlwaysRefreshRouteReuseStrategy } from './classes/always-refresh-route-reuse-strategy'; // Asegúrate de importar la clase

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'list-photos',
    loadChildren: () => import('./pages/list-photos/list-photos.module').then( m => m.ListPhotosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: AlwaysRefreshRouteReuseStrategy } 
  ]
})
export class AppRoutingModule { }
