import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService, SharedService, SidebarService, UsuarioService,
  LoginGuard, SubirArchivoService, ModalUploadService, HospitalesService,
  InterceptorService, MedicoService, VerificarTokenGuard
} from './services.index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalesService,
    MedicoService,
    VerificarTokenGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class ServiceModule { }
