import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';


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

import { GdprmodalComponent } from './gdprmodal/gdprmodal.component';

import { AngularFireAnalyticsModule,ScreenTrackingService,UserTrackingService  } from '@angular/fire/analytics';

import {NgsRevealModule} from 'ngx-scrollreveal';

import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  autoOpen:true,
  revokable : false,
  cookie: {
    domain: environment.cookieDomain
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  "content": {
    "href": "https:/checkmypool.net/cgu",
  },
  theme: 'edgeless',
  type: 'opt-out'
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent,GdprmodalComponent],
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
  NgsRevealModule,
  IonicStorageModule.forRoot(),
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireMessagingModule,
  AngularFireAnalyticsModule,
  NgcCookieConsentModule.forRoot(cookieConfig),

  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production,registrationStrategy: 'registerImmediately' }),
  ],
  providers: [ 
  StatusBar,
  LaunchNavigator,
  SplashScreen,
  ScreenTrackingService,
  UserTrackingService ,
  Camera,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
