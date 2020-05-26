import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Visit} from '../models/Visit';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';


@Component({
	selector: 'app-add-visit',
	templateUrl: './add-visit.page.html',
	styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {

	newVisit:Visit = new Visit();
	customerInfo:any;
	swimmingPoolName:string="";

	constructor(
		private storage: Storage,
		private functions: AngularFireFunctions,
		private activatedRoute: ActivatedRoute,
		public navCtrl: NavController,


		) {
		this.newVisit.customerUid = this.activatedRoute.snapshot.paramMap.get('id');
		this.newVisit.poolId =this.activatedRoute.snapshot.paramMap.get('sid');
		this.newVisit.employeeUid ="";
		storage.set('newVisit', this.newVisit); 
	}


	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			console.log(params);
			this.customerInfo =  {firstName:params['customerfirstName'], lastName: params['customerLastName']};
			
			this.swimmingPoolName =  params['swimmingPoolName'];
		});
	}
	addVisit(){
		console.log("saveVisit");
		
		this.storage.get('newVisit').then((val) => {
			console.log('newVisit', val);
			val.dateTime = moment().format();
			const callable = this.functions.httpsCallable('addVisit');
			const obs = callable(val);

			obs.subscribe(res => {
				this.navCtrl.navigateRoot(['swimming-pool/'+this.newVisit.poolId]);

			});
		});

	}

}
