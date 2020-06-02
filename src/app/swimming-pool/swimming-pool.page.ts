import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../models/swimming-pool';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import {Customer} from '../models/customer';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-swimming-pool',
	templateUrl: './swimming-pool.page.html',
	styleUrls: ['./swimming-pool.page.scss'],
})
export class SwimmingPoolPage implements OnInit {

	public poolId:string;
	public uid:string;
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public customer:Customer = new Customer();
	public customerStringified = "";
	public visitTypeText= {visitTypeFull: '',visitTypeControl:'', visitTypeMaintenance:'' };

	constructor(
		private storage: Storage,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public translateService : TranslateService
		) { 
		
	}

	ngOnInit() {
		this.translateService.get(['VISIT.VisitTypeFull', 'VISIT.VisitTypeControl', 'VISIT.VisitTypeMaintenance']).subscribe(
			value => {
				// value is our translated string
				console.log(value);
				this.visitTypeText.visitTypeFull = value['VISIT.VisitTypeFull'];
				this.visitTypeText.visitTypeControl = value['VISIT.VisitTypeControl'];
				this.visitTypeText.visitTypeMaintenance = value['VISIT.VisitTypeMaintenance'];
			});

	}

	ionViewWillEnter(){
		this.ngOnInit()
		console.log("enter2")
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.poolId = this.activatedRoute.snapshot.paramMap.get('sid');
		this.afDatabase.object<Customer>('customers/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.customer = data;
				this.customerStringified = JSON.stringify(data);
			})
		this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
			(data) =>{
				this.swimmingPool = data;
				this.storage.set('currentPool',{uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool }); 
			})
	}

}
