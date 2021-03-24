import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription }   from 'rxjs';

import {CmsServicesService} from '../../services/cms-services.service';

@Component({
	selector: 'app-cgu',
	templateUrl: './cgu.page.html',
	styleUrls: ['./cgu.page.scss'],
})
export class CGUPage implements OnInit {

	public cgu=null;
	public lastUpdateDate = moment();
	public cguChangesSub: Subscription = new Subscription();


	constructor(
		public cmsServicesService:CmsServicesService
		) { }

	ngOnInit() {
	}

	ionViewDidEnter(){
		this.cguChangesSub = this.cmsServicesService.getCGU().subscribe(
			cgu => {
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
	ionViewWillLeave(){
		this.cguChangesSub.unsubscribe();
	}

}
