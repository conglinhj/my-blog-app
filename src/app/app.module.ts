import { categoryFeature } from './modules/manage/category/category.reducers';
import { tagFeature } from './modules/manage/tag/tag.reducer';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TagEffects } from 'src/app/modules/manage/tag/tag.effects';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { httpInterceptorProviders } from './core/interceptors';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { CategoryEffects } from './modules/manage/category/category.effects';
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
    StoreModule.forRoot({
      [tagFeature.key]: tagFeature.reducers,
      [categoryFeature.key]: categoryFeature.reducers
    }),
    EffectsModule.forRoot([
      TagEffects,
      CategoryEffects,
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // for development
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ...InMemoryDB,
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
