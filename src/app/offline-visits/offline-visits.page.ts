import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from '../services/authentication.service';
import { OnlineCheckService } from '../services/online-check.service'
import {Customer} from '../models/customer';
import { CustomerServicesService } from '../services/customer-services.service'
import { DataSharingService } from '../services/data-sharing.service'


@Component({
  selector: 'app-offline-visits',
  templateUrl: './offline-visits.page.html',
  styleUrls: ['./offline-visits.page.scss'],
})
export class OfflineVisitsPage implements OnInit {

  public visits= [];
  public alertText ={header:'',message:'', buttonCancel: '', buttonOK:'' };
  public visitTypeText= {visitTypeFull: '',visitTypeControl:'', visitTypeMaintenance:'' };
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
    public customerServicesService:CustomerServicesService,
    public dataSharingService:DataSharingService
    ) { }


  ngOnInit() {
    this.translateService.get(['OFFLINEVISITS.AlertHeader', 'OFFLINEVISITS.AlertMesssage','OFFLINEVISITS.AlertCancel', 
      'OFFLINEVISITS.AlertOK','VISIT.VisitTypeFull', 'VISIT.VisitTypeControl', 'VISIT.VisitTypeMaintenance']).subscribe(
      value => {
        this.alertText = {
          header : value['OFFLINEVISITS.AlertHeader'],
          message:value['OFFLINEVISITS.AlertMesssage'],
          buttonCancel:value['OFFLINEVISITS.AlertCancel'], 
          buttonOK:value['OFFLINEVISITS.AlertOK'] 
        }
        this.visitTypeText.visitTypeFull = value['VISIT.VisitTypeFull'];
        this.visitTypeText.visitTypeControl = value['VISIT.VisitTypeControl'];
        this.visitTypeText.visitTypeMaintenance = value['VISIT.VisitTypeMaintenance'];

      });
      
      this.onlineCheckService.onlineCheck().subscribe(isOnline => {
        console.log('isOnline',isOnline);

        this.isOnline = isOnline;
      })
    }

    ionViewWillEnter(){

      this.initData();
      this.claims = this.authenticationService.getClaims();

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
              this.customerServicesService.getCustomer(obj.customerUid).subscribe(
                (data3) =>{
                  this.visits[index].customerInfo = data3;
                })
            }
          });
          }
          

        })
    }
  }
