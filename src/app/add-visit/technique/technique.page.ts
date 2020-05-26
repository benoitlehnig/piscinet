import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Technique} from '../../models/Visit';


@Component({
	selector: 'app-technique',
	templateUrl: './technique.page.html',
	styleUrls: ['./technique.page.scss'],
})
export class TechniquePage implements OnInit {

	
	technical=new Technique();
	constructor(private storage: Storage) { }


	ngOnInit() {
	}

	ionViewWillLeave(){
		this.saveTechnical();
	}
	
	saveTechnical(){
		this.storage.get('newVisit').then((val) => {
			console.log('newVisit', val);
			val.technique= this.technical;
			this.storage.set("newVisit",val);
		});


	}
}
