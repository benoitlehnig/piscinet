import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Visit} from '../../models/Visit';

@Component({
	selector: 'app-technical',
	templateUrl: './technical.page.html',
	styleUrls: ['./technical.page.scss'],
})
export class TechnicalPage implements OnInit {

	public visit:Visit = new Visit();
	constructor(private storage: Storage
		) { }

	ngOnInit() {
	}
	ionViewWillEnter(){
		this.storage.get('visit').then((val) => {
			console.log('visit val', val);
			this.visit = val ;
		});
	}

}
