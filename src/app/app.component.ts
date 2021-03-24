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

import { PopoverController } from '@ionic/angular';
import { GdprmodalComponent } from './gdprmodal/gdprmodal.component';

import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
 
  public uid;


  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

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
    private afMessaging: AngularFireMessaging,
    public popoverController: PopoverController,
    private ccService: NgcCookieConsentService,


    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('fr');
      this.initCookiePopup();

      this.afMessaging.messages.subscribe((message) => { console.log("afMessaging :",message); });
      this.afMessaging.messages.subscribe(
        (messaging: any) => {
          messaging.onMessageCallback = (payload: any) => {
          };
          messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
        });
      console.log("desktop",this.platform.is('desktop'))
      console.log("pwa",this.platform.is('pwa'))
      console.log("mobileweb",this.platform.is('mobileweb'))
      
    });
  }

  async ngOnInit() {

    this.afAuth.user.subscribe(
      data =>{
        if(data){

          this.uid = data.uid;
          data.getIdTokenResult().then(
            result=> {
              if(data.metadata.lastSignInTime ==='' || data.metadata.lastSignInTime===null){
                this.presentGDPRPopover();
              }


              
              this.requestPermission();
            })
        }
        else{
        }
      }
      );

  }
 


  requestPermission() {
    this.afMessaging.requestToken
    .subscribe(
      (token) => { 
        this.storage.get('tokenRegistered').then(data =>{
          let tokenToBeRegistered = false;
          if(data ===null){
            tokenToBeRegistered = true;
          }
          else{
            if(data !== token){
              tokenToBeRegistered = true;
            }
          }
          if( tokenToBeRegistered === true){
            const callable = this.functions.httpsCallable('addDevice');
            const obs = callable({'uid':this.uid, 'token': token});
            obs.subscribe(async res => {
              this.storage.set('tokenRegistered',token);
            });
          }
        })

      },
      (error) => { console.error(error); },  
      );

  }

  initCookiePopup(){
    this.translate.get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
    .subscribe(data => {
      this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
      // Override default messages with the translated ones
      this.ccService.getConfig().content.header = data['cookie.header'];
      this.ccService.getConfig().content.message = data['cookie.message'];
      this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
      this.ccService.getConfig().content.allow = data['cookie.allow'];
      this.ccService.getConfig().content.deny = data['cookie.deny'];
      this.ccService.getConfig().content.link = data['cookie.link'];
      this.ccService.getConfig().content.policy = data['cookie.policy'];
      this.ccService.destroy(); // remove previous cookie bar (with default messages)
      this.ccService.init(this.ccService.getConfig()); // update config with translated messages

    });

  }

  ngOnDestroy(){
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe()
  }

  async presentGDPRPopover() {

    const popover = await this.popoverController.create({
      component: GdprmodalComponent,
      componentProps: {homeref:this, uid:this.uid, claims: this.claims},
      cssClass: 'gdprModal',
      backdropDismiss: false,
      translucent: true
    });
    return await popover.present();
  }
  dismissGDPRPopover(){
    this.popoverController.dismiss();
  }


}
