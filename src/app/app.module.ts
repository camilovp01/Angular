import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './login/login.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    // DasboardComponent,
    // ProgressComponent,
    // Graficas1Component,
    // HeaderComponent,
    // SidebarComponent,
    // BreadcrumbsComponent,
    //PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
