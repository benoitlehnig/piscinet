import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import {Visit} from '../../models/visit';

import { VisitService } from '../../services/visit.service';
import { CustomerService } from '../../services/customer.service';
import { PoolService } from '../../services/pool.service';
import { DataSharingService } from '../../services/data-sharing.service';

import { SelectCustomerComponent } from './visit/select-customer/select-customer.component';

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits;
  public offlinevisitMode :boolean = false;

  public visitTypesText=[];

  public newVisitCancelText:string = "";

  public visitsChangesSub: Subscription = new Subscription();
  public activatedRouteChangesSub: Subscription = new Subscription();
  public customerChangesSub: Subscription = new Subscription();
  public poolChangesSub: Subscription = new Subscription();

  constructor(
    public visitService: VisitService,
    public activatedRoute:ActivatedRoute,
    public modalController: ModalController,
    public translateService : TranslateService,
    public customerService: CustomerService,
    public poolService: PoolService,
    public dataSharingService:DataSharingService,
    public router:Router
    ) 
  { }

  ngOnInit(){}

  ionViewWillEnter() {
    this.activatedRouteChangesSub = this.activatedRoute.params.subscribe(params => {
      this.initLiverData()
    });
    this.translateService.get(['VISIT.VisitTypeMaintenanceButton','VISIT.TYPES','CUSTOMER.NewVisitCancel']).subscribe(
      value => {
        this.visitTypesText =  value['VISIT.TYPES'];
        this.newVisitCancelText =  value['CUSTOMER.NewVisitCancel'];
      });

  }

  ionViewWillLeave(){
    this.activatedRouteChangesSub.unsubscribe();
    this.visitsChangesSub.unsubscribe();
    this.customerChangesSub.unsubscribe();
    this.poolChangesSub.unsubscribe();
  }
  
  initLiverData(){
    this.visitsChangesSub = this.visitService.getVisitsSinceMonth(1,100).subscribe(
      (data)=>{
        this.visits = data;
      })
  }

  async presentCustomerSelectionModal() {
    const modal = await this.modalController.create({
      component: SelectCustomerComponent,
      componentProps: {homeref:this},
      cssClass: 'modal'
    });
    return await modal.present();
  }
  

  selectCustomer(customerUid, poolId,visitType){
    this.modalController.dismiss();

    if(customerUid !=="" && poolId !==""){
      let customerStringified="";
      let swimmingPoolStringified="";
      this.customerChangesSub = this.customerService.getCustomer(customerUid).subscribe(
        (customer) =>{
          customerStringified = JSON.stringify(customer);
          this.poolChangesSub = this.poolService.getSwimmingPool(poolId).subscribe(
            (swimmingPool) =>{

              swimmingPoolStringified = JSON.stringify(swimmingPool);
              this.dataSharingService.currentPool({uid:customerUid, poolId:poolId,swimmingPool:swimmingPool })
              this.router.navigate(['/customers/'+customerUid+'/swimming-pool/' +poolId+'/add-visit',{ mode: 'add', customer: customerStringified,
                swimmingPoolName:swimmingPool.name,visitType:visitType,swimmingPoolStringified:swimmingPoolStringified }])
            })
        })


    }
    
    
  }

}
