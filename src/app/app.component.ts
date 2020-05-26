import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isUserLogged= false;
  public user;
  public claims:any={email: ''};
  public appPages = [

  {
    title: 'Clients',
    url: 'customers',
    icon: 'person'
  },
  {
    title: 'Visites',
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
    public router:Router,
    private storage: Storage

    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('fr');
      this.afAuth.onAuthStateChanged((user: firebase.User) => {
        if (user) {
         user.getIdTokenResult().then(
           result=> {
             console.log(result);
             this.storage.set('claims', result.claims); 
             this.claims = result.claims;
             if(this.claims['customer'] ===true){
               this.appPages = this.appPagesCustomer
             }
           }
            )
          console.log('initializeApp User is logged in');
          this.isUserLogged = true;
        } else {
          console.log('User is not logged in');
             this.isUserLogged = false;
             this.claims = {};
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
  }

  logout(){
      this.authService.logoutUser();
  }
}
