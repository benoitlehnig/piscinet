import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import {AppConstants } from './app-constants';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isUserLogged:boolean= false;
  public user;
  public displayName;
  public claims:any={email: ''};
  public appPages =[];
  public isOnline:boolean=true;
  public offlineVisits=[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private functions: AngularFireFunctions,
    public translate: TranslateService,
    public authService:AuthenticationService,
    public afAuth:AngularFireAuth,
    private storage: Storage,
    private appConstants: AppConstants

    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('fr');
      console.log("desktop",this.platform.is('desktop'))
      console.log("pwa",this.platform.is('pwa'))
      console.log("mobileweb",this.platform.is('mobileweb'))
      this.storage.get('offlineVisits').then(
        data =>{
          if(data !==null){this.offlineVisits = data}
       });
      this.createOnline$().subscribe(isOnline => this.isOnline = isOnline);

    });
  }

  ngOnInit() {

    this.afAuth.user.subscribe(
      data =>{
        console.log("user >>", data);
        if(data){
          this.isUserLogged =true;
          this.displayName = data.displayName;
          data.getIdTokenResult().then(
            result=> {
              this.claims = result.claims;
              if(this.claims['customer'] ===true){
                this.appPages = this.appConstants.appCustomerPages;
              }
              if(this.claims['admin'] ===true){
                this.appPages = this.appConstants.appAdminPages;
              }
              if(this.claims['employee'] ===true){
                this.appPages = this.appConstants.appEmployeePages;
              }
              this.selectTabNavigation();
              this.initNotification();
            })
        }
        else{
          this.isUserLogged =false;
        }
      }
      );

  }
  selectTabNavigation(){
    const path = window.location.pathname;
    console.log("path",path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().replace('/',""));
    }
  }

  logout(){
    this.authService.logoutUser();
  }

  initNotification(){
      /*
      PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    */
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

}
