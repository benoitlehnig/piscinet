import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {SwimmingPool} from '../../models/swimming-pool';
import { map } from 'rxjs/operators'
import { DataSharingService } from '../../services/data-sharing.service'

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
		public afDatabase: AngularFireDatabase,
		public dataSharingService:DataSharingService

		) { }

	ngOnInit() {
		this.authService.user.subscribe(
			result =>
			{
				if(result){
					this.uid = result.uid;
					this.swimmingPools = this.afDatabase.list<SwimmingPool>('/pools/'+this.uid).snapshotChanges().pipe(
						map(changes => 
							changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
							)
						);
					this.swimmingPools.subscribe(
						swimmingPools=>{
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

	ionViewWillEnter(){
		

	}

	onSelectPoolChange(event){
		console.log(event);
		this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+event.detail.value).valueChanges().subscribe(
			(data) =>{
				this.selectedSwimmingPool = {key:event.detail.value, data :  data};
				this.selectedSwimmingPoolName = data.name;
				this.dataSharingService.currentPool({uid:this.uid, poolId:event.detail.value,swimmingPool:data })
			})
	}

}
