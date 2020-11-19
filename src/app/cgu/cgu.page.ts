import { Component, OnInit } from '@angular/core';
import {CmsServicesService} from '../services/cms-services.service';
import * as moment from 'moment';

@Component({
	selector: 'app-cgu',
	templateUrl: './cgu.page.html',
	styleUrls: ['./cgu.page.scss'],
})
export class CGUPage implements OnInit {

	public cgu=null;
	public lastUpdateDate = moment();

	constructor(
		public cmsServicesService:CmsServicesService
		) { }

	ngOnInit() {
	}

	ionViewDidEnter(){
		this.cmsServicesService.getCGU().subscribe(
			cgu => {
				console.log(cgu);
				if(cgu !== null ){
					this.cgu = cgu;
					for(let i =0;i<this.cgu.length;i++){
						if(moment(this.lastUpdateDate).isAfter(
							moment.unix(this.cgu[i].updated_at.seconds))	
							){
							this.lastUpdateDate = moment.unix(this.cgu[i].updated_at.seconds).utc()
						}
					}
				}
			})
	}

}
