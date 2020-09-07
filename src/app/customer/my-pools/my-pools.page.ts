	import { Component, OnInit } from '@angular/core';
	import { AuthenticationService } from '../../services/authentication.service';
	import {SwimmingPool} from '../../models/swimming-pool';
	import { map } from 'rxjs/operators'
	import { DataSharingService } from '../../services/data-sharing.service'
	import { CustomerServicesService } from '../../services/customer-services.service'
	import { PoolServicesService } from '../../services/pool-services.service'

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

		constructor(
			public authService:AuthenticationService,
			public customerServicesService: CustomerServicesService,
			public poolServicesService: PoolServicesService,
			public dataSharingService:DataSharingService

			) { }

		ngOnInit() {
			this.authService.user.subscribe(
				result =>
				{
					if(result){
						this.uid = result.uid;
						this.dataSharingService.getCustomerChanges().subscribe(
							(data) =>{
								console.log("customer", data)
								if(data){
									this.swimmingPools = this.customerServicesService.getCustomerPools(data.key);
									this.swimmingPools.subscribe(
										swimmingPools=>{
											console.log("swimmingPools, ", swimmingPools)
											if( swimmingPools[0]){
												this.selectedSwimmingPool = swimmingPools[0];
												this.selectedSwimmingPoolKey = swimmingPools[0].key;
												this.selectedSwimmingPoolName = this.selectedSwimmingPool.data.name;
												this.dataSharingService.currentPool({uid:this.uid, poolId:this.selectedSwimmingPoolKey,swimmingPool:this.selectedSwimmingPool.data })
												if(swimmingPools.length > 1){
													this.mode ='multiple';
												}
											}
										});
								}
							})
						
					}
				})
		}


		ionViewWillEnter(){
			

		}

		onSelectPoolChange(event){
			this.poolServicesService.getSwimmingPool(event.detail.value).subscribe(
				(data) =>{
					this.selectedSwimmingPool = {key:event.detail.value, data :  data};
					this.selectedSwimmingPoolName = data.name;
					this.dataSharingService.currentPool({uid:this.uid, poolId:event.detail.value,swimmingPool:data })
				})
		}

	}
