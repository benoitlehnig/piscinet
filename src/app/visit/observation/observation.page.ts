import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/Visit';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
@Component({
	selector: 'app-observation',
	templateUrl: './observation.page.html',
	styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {

	public visit:Visit = new Visit();
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
