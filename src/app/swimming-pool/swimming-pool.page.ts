import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../models/swimming-pool';
import { ActivatedRoute } from '@angular/router';
import {Customer} from '../models/customer';
import {TranslateService} from '@ngx-translate/core';
import { DataSharingService } from '../services/data-sharing.service';
import { CustomerServicesService } from '../services/customer-services.service';
import { PoolServicesService } from '../services/pool-services.service';

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
	public visitTypeText= {visitTypeFull: '',visitTypeControl:'', visitTypeMaintenance:'' };

	constructor(
		private activatedRoute: ActivatedRoute,
		public customerServicesService: CustomerServicesService,
		public translateService : TranslateService,
		public dataSharingService:DataSharingService,
		public poolServicesService: PoolServicesService

		) { 
		
	}

	ngOnInit() {
		this.translateService.get(['VISIT.VisitTypeFull', 'VISIT.VisitTypeControl', 'VISIT.VisitTypeMaintenance']).subscribe(
			value => {
				this.visitTypeText.visitTypeFull = value['VISIT.VisitTypeFull'];
				this.visitTypeText.visitTypeControl = value['VISIT.VisitTypeControl'];
				this.visitTypeText.visitTypeMaintenance = value['VISIT.VisitTypeMaintenance'];
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

}
