import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {SwimmingPool} from '../../models/swimming-pool';
import { map } from 'rxjs/operators'
import { DataSharingService } from '../../services/data-sharing.service'
import { CustomerService } from '../../services/customer.service'
import { PoolServicesService } from '../../services/pool-services.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
	selector: 'app-my-pools',
	templateUrl: './my-pools.page.html',
	styleUrls: ['./my-pools.page.scss'],
})
export class MyPoolsPage implements OnInit {

	public uid:string="";
	public swimmingPools;
	public selectedSwimmingPool: any= {key:'', data :  new SwimmingPool()};
	public mode:string='single';
	public selectedSwimmingPoolKey:string='';
	public selectedSwimmingPoolName:string='';

	public customerChangesSub: Subscription = new Subscription();
	public poolsChangesSub: Subscription = new Subscription();
	public poolChangesSub: Subscription = new Subscription();



	constructor(
		public authService:AuthenticationService,
		public customerService: CustomerService,
		public poolServicesService: PoolServicesService,
		public dataSharingService:DataSharingService,
		private router: Router


		) { }

	ngOnInit() {

	}


	ionViewWillEnter(){
		this.customerChangesSub = this.dataSharingService.getCustomerChanges().subscribe(
			(data) =>{
				this.uid = data.key;
				console.log("customer", data)
				if(data){
					this.poolsChangesSub = this.customerService.getCustomerPools(data.key).subscribe(
						pools =>{
							this.swimmingPools = pools;
							if( this.swimmingPools[0]){
								this.selectedSwimmingPool = this.swimmingPools[0];
								this.selectedSwimmingPoolKey = this.swimmingPools[0].key;

								this.selectedSwimmingPoolName = this.selectedSwimmingPool.data.name;
								this.dataSharingService.currentPool(
									{
										uid:this.uid,
										poolId:this.selectedSwimmingPoolKey,
										swimmingPool:this.selectedSwimmingPool.data 
									})
								if(this.swimmingPools.length > 1){
									this.mode ='multiple';
								}
							}
						})
				}
			})
	}

	ionViewWillLeave(){
		this.customerChangesSub.unsubscribe();
		this.poolsChangesSub.unsubscribe();
		this.poolsChangesSub.unsubscribe();
	}

	onSelectPoolChange(event){
		this.poolChangesSub = this.poolServicesService.getSwimmingPool(event.detail.value).subscribe(
			(data) =>{
				this.selectedSwimmingPool = {key:event.detail.value, data :  data};
				this.selectedSwimmingPoolName = data.name;
				this.dataSharingService.currentPool({uid:this.uid, poolId:event.detail.value,swimmingPool:data })
			})
	}

}
