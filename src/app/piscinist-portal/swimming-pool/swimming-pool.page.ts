import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import {TranslateService} from '@ngx-translate/core';

import {SwimmingPool} from '../../models/swimming-pool';
import {Customer} from '../../models/customer';
import { DataSharingService } from '../../services/data-sharing.service';
import { CustomerService } from '../../services/customer.service';
import { PoolService } from '../../services/pool.service';


import { Subscription } from 'rxjs';


@Component({
	selector: 'app-swimming-pool',
	templateUrl: './swimming-pool.page.html',
	styleUrls: ['./swimming-pool.page.scss'],
})
export class SwimmingPoolPage implements OnInit {

	public poolId:string;
	public uid:string;
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public swimmingPoolStringified:string="";
	public customer:Customer = new Customer();
	public customerStringified = "";
	public visitTypeText= {visitTypeFull: '',visitTypeTechnical:'', visitTypeMaintenance:'' };
	public visitTypeFullText:string = "";
	public visitTypeMaintenanceText:string = "";
	public newVisitCancelText:string = "";

		public visitTypesText=[];



	public customerChangesSub: Subscription = new Subscription();
	public poolChangesSub: Subscription = new Subscription();


	constructor(
		private activatedRoute: ActivatedRoute,
		public customerService: CustomerService,
		public translateService : TranslateService,
		public dataSharingService:DataSharingService,
		public poolService: PoolService,
		public actionSheetController: ActionSheetController,
		private router: Router

		) { 
		
	}

	ngOnInit() {
		

	}

	ionViewWillEnter(){
		this.translateService.get(['VISIT.TYPES','VISIT.VisitTypeFullButton', 'VISIT.VisitTypeControlButton', 'VISIT.VisitTypeMaintenanceButton','CUSTOMER.VisitTypeFull','CUSTOMER.VisitTypeMaintenance','CUSTOMER.NewVisitCancel']).subscribe(
			value => {
				this.visitTypesText = value['VISIT.TYPES'];

				this.visitTypeText.visitTypeFull = value['VISIT.VisitTypeFullButton'];
				this.visitTypeText.visitTypeTechnical = value['VISIT.VisitTypeTechnicalButton'];
				this.visitTypeText.visitTypeMaintenance = value['VISIT.VisitTypeMaintenanceButton'];
				this.visitTypeFullText =  value['CUSTOMER.VisitTypeFull'];
				this.visitTypeMaintenanceText =  value['CUSTOMER.VisitTypeMaintenance'];
				this.newVisitCancelText =  value['CUSTOMER.NewVisitCancel'];
			});
		
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.poolId = this.activatedRoute.snapshot.paramMap.get('sid');
		this.customerChangesSub = this.customerService.getCustomer(this.uid).subscribe(
			(data) =>{
				this.customer = data;
				this.customerStringified = JSON.stringify(data);
			})
		this.poolChangesSub = this.poolService.getSwimmingPool(this.poolId).subscribe(
			(data) =>{
				this.swimmingPool = data;
				this.swimmingPoolStringified = JSON.stringify(this.swimmingPool);
				this.dataSharingService.currentPool({uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool })
			})
	}
	ionViewWillLeave(){
		this.customerChangesSub.unsubscribe();
		this.poolChangesSub.unsubscribe();
	}


	async presentActionSheet() {
		let buttons= [{
			text: this.visitTypesText['full'].Long,
			icon: 'shield-checkmark',
			handler: () => {
				this.router.navigate(['piscinistPortal/customers/'+this.uid+'/swimming-pool/' +this.poolId+'/add-visit',{ mode: 'add', customer: this.customerStringified,
					swimmingPoolName:this.swimmingPool.name,visitType:'full',swimmingPoolStringified:this.swimmingPoolStringified }])
			}
		}, {
			text:  this.visitTypesText['maintenance'].Long,
			icon: 'shield-checkmark',
			handler: () => {
				this.router.navigate(['piscinistPortal/customers/'+this.uid+'/swimming-pool/' +this.poolId+'/add-visit',{ mode: 'add', customer: this.customerStringified,
					swimmingPoolName:this.swimmingPool.name,visitType:'maintenance',swimmingPoolStringified:this.swimmingPoolStringified }])
			}
		},
		{
			text: this.newVisitCancelText,
			icon: 'close',
			role: 'cancel',
			handler: () => {
				console.log('Cancel clicked');
			}
		}];
		if(this.customer.typeOfContract === "technical"){
			buttons =[{
				text:  this.visitTypesText['technical'].Long,
				icon: 'shield-checkmark',
				handler: () => {
					this.router.navigate(['piscinistPortal/customers/'+this.uid+'/swimming-pool/' +this.poolId+'/add-visit',{ mode: 'add', customer: this.customerStringified,
						swimmingPoolName:this.swimmingPool.name,visitType:'technical',swimmingPoolStringified:this.swimmingPoolStringified }])
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
		}
		if(this.customer.typeOfContract === "seasonal"){
			buttons =[{
				text:  this.visitTypesText['adhoc'].Long,
				icon: 'shield-checkmark',
				handler: () => {
					this.router.navigate(['piscinistPortal/customers/'+this.uid+'/swimming-pool/' +this.poolId+'/add-visit',{ mode: 'add', customer: this.customerStringified,
						swimmingPoolName:this.swimmingPool.name,visitType:'adhoc',swimmingPoolStringified:this.swimmingPoolStringified }])
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
		}
		const actionSheet = await this.actionSheetController.create({
			header: 'Nouvelle visite',
			cssClass: 'my-custom-class',
			buttons: buttons
		});
		await actionSheet.present();
	}

}
