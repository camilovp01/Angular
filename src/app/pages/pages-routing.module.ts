import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DasboardComponent, data: { titulo: 'Mi dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Mi Progress' } },
            { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Mis Gráficas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Mis Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Mi Rxjs' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },

            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }