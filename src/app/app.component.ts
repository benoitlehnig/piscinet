import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


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
    public translate: TranslateService,
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
      console.log("desktop",this.platform.is('desktop'))
      console.log("pwa",this.platform.is('pwa'))
      console.log("mobileweb",this.platform.is('mobileweb'))
      
    });
  }

  ngOnInit() {

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




}
