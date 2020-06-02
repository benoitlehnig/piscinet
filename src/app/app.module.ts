import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';


import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { IonicStorageModule } from '@ionic/storage';
import { AvatarModule } from 'ngx-avatar';

import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AvatarModule,
  IonicModule.forRoot(),
  IonicStorageModule.forRoot(),
  AngularFireModule.initializeApp(environment.firebaseConfig),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ 
  StatusBar,
  LaunchNavigator,
  SplashScreen,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
