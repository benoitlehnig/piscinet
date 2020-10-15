import { Component, OnInit } from '@angular/core';
import { VisitServicesService } from '../services/visit-services.service';
import {Visit} from '../models/visit';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SelectCustomerComponent } from '../visit/select-customer/select-customer.component';
import { ActionSheetController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { CustomerServicesService } from '../services/customer-services.service';
import { PoolServicesService } from '../services/pool-services.service';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits;
  public offlinevisitMode :boolean = false;

  public visitTypeFullText:string = "";
  public visitTypeMaintenanceText:string = "";
  public newVisitCancelText:string = "";
  public newVisitType : string='full';


  constructor(
    public visitServicesService: VisitServicesService,
    public activatedRoute:ActivatedRoute,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public translateService : TranslateService,
    public customerServicesService: CustomerServicesService,
    public poolServicesService: PoolServicesService,
    public dataSharingService:DataSharingService,
    public router:Router

    ) 
  { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.initLiverData()
    });
    this.translateService.get(['VISIT.VisitTypeMaintenanceButton','CUSTOMER.VisitTypeFull','CUSTOMER.VisitTypeMaintenance','CUSTOMER.NewVisitCancel']).subscribe(
      value => {
        this.visitTypeFullText =  value['CUSTOMER.VisitTypeFull'];
        this.visitTypeMaintenanceText =  value['CUSTOMER.VisitTypeMaintenance'];
        this.newVisitCancelText =  value['CUSTOMER.NewVisitCancel'];
      });

  }
  initLiverData(){
    this.visits = this.visitServicesService.getVisitsSinceMonth(1,100);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectCustomerComponent,
      componentProps: {homeref:this},
      cssClass: 'modal'
    });
    return await modal.present();
  }
  

  selectCustomer(customerUid, poolId){
    this.modalController.dismiss();

    if(customerUid !=="" && poolId !==""){
      let customerStringified="";
      let swimmingPoolStringified="";
      this.customerServicesService.getCustomer(customerUid).subscribe(
        (customer) =>{
          customerStringified = JSON.stringify(customer);
          this.poolServicesService.getSwimmingPool(poolId).subscribe(
            (swimmingPool) =>{

              swimmingPoolStringified = JSON.stringify(swimmingPool);
              this.dataSharingService.currentPool({uid:customerUid, poolId:poolId,swimmingPool:swimmingPool })
              this.router.navigate(['/customers/'+customerUid+'/swimming-pool/' +poolId+'/add-visit',{ mode: 'add', customer: customerStringified,
                swimmingPoolName:swimmingPool.name,visitType:this.newVisitType,swimmingPoolStringified:swimmingPoolStringified }])
            })
        })


    }
    
    
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Nouvelle visite',
      cssClass: 'my-custom-class',
      buttons: [{
        text: this.visitTypeFullText,
        icon: 'shield-checkmark',
        handler: () => {
          this.newVisitType = 'full';
          this.presentModal()
          
        }
      }, {
        text:  this.visitTypeMaintenanceText,
        icon: 'shield-checkmark',
        handler: () => {
          this.newVisitType = 'maintenane';
          this.presentModal()
        }
      },
      {
        text: this.newVisitCancelText,
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
