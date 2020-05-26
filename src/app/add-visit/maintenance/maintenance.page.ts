import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Maintenance} from '../../models/Visit';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	maintenance = new Maintenance();
	constructor(private storage: Storage) { }

	ngOnInit() {

	}
	ionViewWillLeave(){
		this.saveMaintenance();
	}

	saveMaintenance(){
		this.storage.get('newVisit').then((val) => {
			console.log('newVisit', val);
			val.maintenance= this.maintenance;
			this.storage.set("newVisit",val);
		});

	}
}
