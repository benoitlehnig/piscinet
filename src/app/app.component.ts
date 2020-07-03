import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';
import { DataSharingService } from './services/data-sharing.service'
import { OnlineCheckService } from './services/online-check.service'
import { TranslateService } from '@ngx-translate/core';
import {AppConstants } from './app-constants';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isUserLogged:boolean= false;
  public uid;
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
    private appConstants: AppConstants,
    public dataSharingService:DataSharingService,
    public onlineCheckService: OnlineCheckService,
    private router: Router,
    private afMessaging: AngularFireMessaging
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
      this.onlineCheckService.onlineCheck().subscribe(isOnline => {
        this.isOnline = isOnline;

        this.storage.get('offlineVisits').then(
          data =>{
            if(data !==null){
              this.dataSharingService.offlineVisitNumberDataChanges( JSON.parse(data));
            }
          });
        this.dataSharingService.curretOfflineVisitNumberChanges.subscribe(data => {
          if(data !==null){
            this.offlineVisits = data
          }
        });

        
      });

    });
  }

  async ngOnInit() {

    this.afAuth.user.subscribe(
      data =>{
        console.log("user >>", data);
        if(data){
          this.uid = data.uid;
          this.isUserLogged =true;
          this.displayName = data.displayName;
          data.getIdTokenResult().then(
            result=> {
              this.claims = result.claims;
              if(this.claims['customer'] ===true){
                this.appPages = this.appConstants.appCustomerPages;
                this.router.navigateByUrl('/myProfile');
              }
              if(this.claims['admin'] ===true){
                this.appPages = this.appConstants.appAdminPages;
                this.router.navigateByUrl('/customers');
              }
              if(this.claims['employee'] ===true){
                this.appPages = this.appConstants.appEmployeePages;
                this.router.navigateByUrl('/customers');
              }
              if(this.claims['superAdmin'] ===true || this.claims.user_id ==='lQbe5AiDp8NSC0fWuhYwkdMBArw2'){
                this.appPages = this.appConstants.appASuperAdminPages;
                this.router.navigateByUrl('/customers');
              }
              this.selectTabNavigation();
              this.initNotification();
              this.listen()
              this.requestPermission();
            })
        }
        else{
          this.isUserLogged =false;
          
        }
      }
      );

  }

  ngAfterViewInit() {

  }

  selectTabNavigation(){
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
    }
  }

  logout(){
    this.authService.logoutUser();
  }

  initNotification(){
    this.requestPermission()
  }
  requestPermission() {

 
    this.afMessaging.requestToken
    .subscribe(
      (token) => { 
        console.log('Permission granted! Save to the server!', token); 
        const callable = this.functions.httpsCallable('addDevice');
        const obs = callable({'uid':this.uid, 'token': token});
        obs.subscribe(async res => {
        });
      },
      (error) => { console.error(error); },  
      );
      
  }
  listen() {
    
  }


}
