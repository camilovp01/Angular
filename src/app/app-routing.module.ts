import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PagesComponent,
  //   children: [
  //     { path: 'progress', component: ProgressComponent },
  //     { path: 'grafica1', component: Graficas1Component },
  //     { path: 'dashboard', component: DasboardComponent },
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //   ]
  // },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    //PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
