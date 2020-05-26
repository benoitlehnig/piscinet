import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observation} from '../../models/Visit';


@Component({
	selector: 'app-observation',
	templateUrl: './observation.page.html',
	styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {

	observation= new Observation();
	constructor(private storage: Storage) { }

	ngOnInit() {
	}
	ionViewWillLeave(){
		this.saveObservation();		
	}
	saveObservation(){
		this.storage.get('newVisit').then((val) => {
			console.log('newVisit', val);
			val.observation= this.observation;
			this.storage.set("newVisit",val);
		});

	}

}
