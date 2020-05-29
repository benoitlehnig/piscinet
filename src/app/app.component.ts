import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

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
  public appPages = [

  {
    title: 'Clients',
    url: 'customers',
    icon: 'person'
  },
  {
    title: 'Visits',
    url: 'visits',
    icon: 'shield-checkmark'
  },
  {
    title: 'Employes',
    url: 'employees',
    icon: 'people-circle'
  }
  ];
  public appPagesCustomer = [

  {
    title: 'Clients',
    url: 'customers',
    icon: 'person'
  },
  {
    title: 'Visites',
    url: 'visits',
    icon: 'shield-checkmark'
  }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private functions: AngularFireFunctions,
    public translate: TranslateService,
    public authService:AuthenticationService,
    public afAuth:AngularFireAuth,
    private storage: Storage

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
    const path = window.location.pathname;
    console.log("path",path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().replace('/',""));
    }

    this.afAuth.authState.subscribe( data=>{
      console.log("data", data);
      if(data){
        this.isUserLogged =true;
        this.displayName = data.displayName;
      }
      else{
        this.isUserLogged =false;
      }
    });

    this.storage.get('claims').then((val) => {
      this.claims = val;
      if(this.claims['customer'] ===true){
        this.appPages = this.appPagesCustomer
      }
    })
    
  }

  logout(){
    this.authService.logoutUser();
  }
}
