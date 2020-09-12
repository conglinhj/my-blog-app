import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { httpInterceptorProviders } from './interceptors';
import { InMemoryDataService } from './services/in-memory-data.service';
import { MaterialModule } from './shared/material.module';


const InMemoryDB = environment.useMemoryDB
  ? [HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false, apiBase: '' })]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...InMemoryDB
  ],
  providers: [
    httpInterceptorProviders
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
