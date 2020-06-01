import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {SwimmingPool} from '../../models/swimming-pool';
import { map } from 'rxjs/operators'
import { Storage } from '@ionic/storage';

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

	constructor(
		public authService:AuthenticationService,
		public afDatabase: AngularFireDatabase,
		public storage : Storage
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
							this.selectedSwimmingPool = swimmingPools[0];
							this.selectedSwimmingPoolKey = swimmingPools[0].key;
							this.storage.set('currentPool',{uid:this.uid, poolId:this.selectedSwimmingPoolKey,swimmingPool:this.selectedSwimmingPool.data }); 
							if(swimmingPools.length > 1){
								this.mode ='multiple';
							}
						}
						);
				}
				
			})
	}

	ionViewWillEnter(){
		

	}
	compareById(o1, o2) {
		return o1.id === o2.id
	}
	onSelectPoolChange(event){
		this.storage.set('currentPool',{uid:this.uid, poolId:this.selectedSwimmingPoolKey,swimmingPool:this.selectedSwimmingPool.data }); 
	}

}
