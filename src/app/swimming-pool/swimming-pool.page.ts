import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../models/swimming-pool';
import {Customer} from '../models/customer';
import {TranslateService} from '@ngx-translate/core';
import { DataSharingService } from '../services/data-sharing.service';
import { CustomerServicesService } from '../services/customer-services.service';
import { PoolServicesService } from '../services/pool-services.service';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';


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

	constructor(
		private activatedRoute: ActivatedRoute,
		public customerServicesService: CustomerServicesService,
		public translateService : TranslateService,
		public dataSharingService:DataSharingService,
		public poolServicesService: PoolServicesService,
		public actionSheetController: ActionSheetController,
		private router: Router

		) { 
		
	}

	ngOnInit() {
		this.translateService.get(['VISIT.VisitTypeFullButton', 'VISIT.VisitTypeControlButton', 'VISIT.VisitTypeMaintenanceButton','CUSTOMER.VisitTypeFull','CUSTOMER.VisitTypeMaintenance','CUSTOMER.NewVisitCancel']).subscribe(
			value => {
				this.visitTypeText.visitTypeFull = value['VISIT.VisitTypeFullButton'];
				this.visitTypeText.visitTypeTechnical = value['VISIT.VisitTypeTechnicalButton'];
				this.visitTypeText.visitTypeMaintenance = value['VISIT.VisitTypeMaintenanceButton'];
				this.visitTypeFullText =  value['CUSTOMER.VisitTypeFull'];
				this.visitTypeMaintenanceText =  value['CUSTOMER.VisitTypeMaintenance'];
				this.newVisitCancelText =  value['CUSTOMER.NewVisitCancel'];
			});

	}

	ionViewWillEnter(){
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.poolId = this.activatedRoute.snapshot.paramMap.get('sid');
		this.customerServicesService.getCustomer(this.uid).subscribe(
			(data) =>{
				this.customer = data;
				this.customerStringified = JSON.stringify(data);
			})
		this.poolServicesService.getSwimmingPool(this.poolId).subscribe(
			(data) =>{
				this.swimmingPool = data;
				this.swimmingPoolStringified = JSON.stringify(this.swimmingPool);
				this.dataSharingService.currentPool({uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool })
			})
	}


	async presentActionSheet() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Nouvelle visite',
			cssClass: 'my-custom-class',
			buttons: [{
				text: this.visitTypeFullText,
				icon: 'shield-checkmark',
				handler: () => {
					
					this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +this.poolId+'/add-visit',{ mode: 'add', customer: this.customerStringified,
						swimmingPoolName:this.swimmingPool.name,visitType:'full',swimmingPoolStringified:this.swimmingPoolStringified }])
				}
			}, {
				text:  this.visitTypeMaintenanceText,
				icon: 'shield-checkmark',
				handler: () => {
						this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +this.poolId+'/add-visit',{ mode: 'add', customer: this.customerStringified,
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
			}]
		});
		await actionSheet.present();
	}

}
