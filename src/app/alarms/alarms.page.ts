import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../models/swimming-pool';
import { AuthenticationService } from '../services/authentication.service';
import * as moment from 'moment';
import { PoolServicesService } from '../services/pool-services.service'

@Component({
	selector: 'app-alarms',
	templateUrl: './alarms.page.html',
	styleUrls: ['./alarms.page.scss'],
})
export class AlarmsPage implements OnInit {


	public alarms=[];
	public swimmingPool;
	public claims;
	constructor(
		public authenticationService:AuthenticationService,
		public poolServicesService: PoolServicesService,

		) { }

	ngOnInit() {
		this.swimmingPool = this.poolServicesService.getPoolsWithCustomers();
		this.swimmingPool.subscribe((data)=>{
			data.forEach( (element:any) => {
				this.checkCurtainRule(element);
				this.checkMaintenanceRule(element);
				this.checkTechnicalLocal(element);
			})
		})
		this.claims = this.authenticationService.getClaims();

	}

	checkCurtainRule(element){
		let currentDate = moment().format();
		let currentDateYear = moment().year();
		if(element.lastCurtainCleaningDate ==="")
		{
			this.alarms.push({'type':'curtain', data:element,'numberOfDays': ""})
		}
		else{
			if( moment().month() <6){
				console.log("data", element.lastCurtainCleaningDate,currentDateYear+'-01-01' , moment(element.lastCurtainCleaningDate).isAfter(currentDateYear+'-01-01'))
				if(moment(element.lastCurtainCleaningDate).isAfter(currentDateYear+'-01-01')) {
					console.log("dooo ", element);

				}
				if(moment(element.lastCurtainCleaningDate).isBefore(currentDateYear+'-01-01')) {
					console.log("dooo 2", element);
					this.alarms.push({'type':'curtain', data:element,'numberOfDays':-moment(element.lastCurtainCleaningDate).diff(currentDate, 'days')})
					console.log(this.alarms);
				}
			}
		}
		

	}
	checkMaintenanceRule(element){
		let currentDate = moment().format();
		if(element.lastMaintenanceDate ==="")
		{
			this.alarms.push({'type':'maintenance', data:element,'numberOfDays': ""})
		}
		else{
			if( moment().month() >5 && moment().month()<9){
				if(moment(element.lastMaintenanceDate).diff(currentDate, 'days')> 8 || element.lastMaintenanceDate==="" ){
					this.alarms.push({'type':'maintenance', data:element, 'numberOfDays': -moment(element.lastMaintenanceDate).diff(currentDate, 'days')})
				}
			}
			if( moment().month() >=9 && moment().month()<4){
				if(moment(element.lastMaintenanceDate).diff(currentDate, 'weeks')> 5 || element.lastMaintenanceDate==="" ){
					this.alarms.push({'type':'maintenance', data:element,'numberOfDays': -moment(element.lastMaintenanceDate).diff(currentDate, 'days')})
				}
			}
			if( moment().month() ===5){
				if(moment(element.lastMaintenanceDate).diff(currentDate, 'weeks')> 5  || element.lastMaintenanceDate==="" ){
					this.alarms.push({'type':'maintenance', data:element,'numberOfDays': -moment(element.lastMaintenanceDate).diff(currentDate, 'days')})
				}
			}
		}
	}
	checkTechnicalLocal(element){
		let currentDate = moment().format();
		console.log("moment().month()", moment().month())
		if(element.lastTLCleaningDate ==="")
		{
			this.alarms.push({'type':'technicalLocal', data:element,'numberOfDays': ""})
		}
		else{
			if( moment().month() ===5 || moment().month() ===6){
				if(moment(element.lastTLCleaningDate).diff(currentDate, 'weeks')> 8 || element.lastTLCleaningDate==="" ){
					this.alarms.push({'type':'technicalLocal', data:element,'numberOfDays': -moment(element.lastTLCleaningDate).diff(currentDate, 'days')})
				}
			}
			if( moment().month() ===9){
				if(moment(element.lastTLCleaningDate).diff(currentDate, 'weeks')> 4 || element.lastTLCleaningDate===""){
					this.alarms.push({'type':'technicalLocal', data:element,'numberOfDays': -moment(element.lastTLCleaningDate).diff(currentDate, 'days')})
				}
			}
		}
	}


}
