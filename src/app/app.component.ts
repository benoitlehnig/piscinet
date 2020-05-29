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
}
