import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';


import { AuthenticationService } from '../../../services/authentication.service';
import { OnlineCheckService } from '../../../services/online-check.service'
import {Customer} from '../../../models/customer';
import { CustomerService } from '../../../services/customer.service'
import { DataSharingService } from '../../../services/data-sharing.service'


@Component({
  selector: 'app-offline-visits',
  templateUrl: './offline-visits.page.html',
  styleUrls: ['./offline-visits.page.scss'],
})
export class OfflineVisitsPage implements OnInit {

  public visits= [];
  public alertText ={header:'',message:'', buttonCancel: '', buttonOK:'' };
  public visitTypesText= [];
  public claims={};
  public isOnline:boolean=true;
  public customer: Customer= new Customer()

  constructor(
  	public storage:Storage,
    public activatedRoute:ActivatedRoute,
    public alertController: AlertController,
    public translateService : TranslateService,
    public authenticationService:AuthenticationService,
    public onlineCheckService: OnlineCheckService,
    public customerService:CustomerService,
    public dataSharingService:DataSharingService
    ) { }


  ngOnInit() {
    
    
  }

  ionViewWillEnter(){
    this.translateService.get(['OFFLINEVISITS.REMOVEALERT', 'VISIT.TYPES']).subscribe(
      value => {
        this.alertText = value['OFFLINEVISITS.REMOVEALERT']
        this.visitTypesText =  value['VISIT.TYPES'];
      });
    
    this.onlineCheckService.onlineCheck().subscribe(isOnline => {
      this.isOnline = isOnline;
    })
    this.initData();
    this.claims = this.authenticationService.getClaims();

  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.alertText['Header'],
      message: this.alertText['Message'],
      buttons:  [
      {
        text: this.alertText['Cancel'],
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: this.alertText['OK'],
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
    this.storage.set('offlineVisits',JSON.stringify(this.visits) );
    this.dataSharingService.offlineVisitNumberDataChanges(this.visits);

  }
  initData(){
    this.storage.get('offlineVisits').then(
      val => {
        this.visits = JSON.parse(val);
        if(this.visits !== null){
          this.visits.forEach((obj, index) => {
            if(obj.customerUid !==""){
              this.customerService.getCustomer(obj.customerUid).subscribe(
                (data3) =>{
                  this.visits[index].customerInfo = data3;
                })
            }
          });
        }
        

      })
  }
}
