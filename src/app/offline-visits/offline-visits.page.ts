import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-offline-visits',
  templateUrl: './offline-visits.page.html',
  styleUrls: ['./offline-visits.page.scss'],
})
export class OfflineVisitsPage implements OnInit {

  public visits= [];
  public alertText ={header:'',message:'', buttonCancel: '', buttonOK:'' };
  constructor(
  	public storage:Storage,
    public activatedRoute:ActivatedRoute,
    public alertController: AlertController,
    public translateService : TranslateService,

    ) { }


  ngOnInit() {
    this.translateService.get(['OFFLINEVISITS.AlertHeader', 'OFFLINEVISITS.AlertMesssage','OFFLINEVISITS.AlertCancel', 'OFFLINEVISITS.AlertOK']).subscribe(
      value => {
        this.alertText = {header : value['OFFLINEVISITS.AlertHeader'],
        message:value['OFFLINEVISITS.AlertMesssage'],
        buttonCancel:value['OFFLINEVISITS.AlertCancel'], 
        buttonOK:value['OFFLINEVISITS.AlertOK'] 
      };
    });
    this.storage.get('offlineVisits').then(
      val => {
        console.log(val);
        this.visits = val;
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.alertText.header,
      message: this.alertText.message,
      buttons:  [
      {
        text: this.alertText.buttonCancel,
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: this.alertText.buttonOK,
        handler: () => {
          this.removalAll();
        }
      }
      ]
    });

    await alert.present();
  }
  requestRemovalAll(){
    this.presentAlert()
  }

  removalAll(){
    this.storage.remove('offlineVisits');
    this.visits =[];

  }
}
