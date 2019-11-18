import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


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
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

            //Mantenimientos
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { tiltulo: 'Mantenimiento de Médicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { tiltulo: 'Actualizar Médico' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }