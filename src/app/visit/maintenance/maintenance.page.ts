import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/Visit';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	public visit:Visit = new Visit();
	visitId:string="";
	customerInfo:any;
	swimmingPoolName:string="";
	constructor(
		private storage: Storage,


		) {

	}


	ngOnInit() {

		

	}
	ionViewWillEnter(){
		this.storage.get('visit').then((val) => {
			console.log('visit val', val);
			this.visit = val ;
		});
	}
}
