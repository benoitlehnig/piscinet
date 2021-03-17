import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/visit';
import {AppConstants } from '../../app-constants';
import {SwimmingPool} from '../../models/swimming-pool';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
	selector: 'app-technique',
	templateUrl: './technique.page.html',
	styleUrls: ['./technique.page.scss'],
})
export class TechniquePage implements OnInit {

	
	visit:Visit=new Visit();
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public lastTechnique={PH:0,chlore:0};

	chloreSteps=this.appConstants.chloreSteps;
	PHSteps=this.appConstants.PHSteps;

	public visitChangesSub: Subscription = new Subscription();


	constructor(
		public dataSharingService:DataSharingService,
		public appConstants:AppConstants
		) { }


	ngOnInit() {
		this.visitChangesSub = this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			console.log("visit technique:", visit)
			this.visit = visit;
		});
		this.dataSharingService.getCurrentPoolChanges().subscribe(swimmingPool =>{
			if(swimmingPool){
				this.swimmingPool = swimmingPool;
				console.log("lastTechnique", swimmingPool.lastTechnique)
				if(swimmingPool.lastTechnique){
					this.lastTechnique = swimmingPool.lastTechnique
				}
			}
			
		})	
	}
	ngOnDestroy(){
		this.visitChangesSub.unsubscribe();
	}

	ionViewWillLeave(){
		this.saveTechnical();
	}
	
	ionViewWillEnter(){
		
	}
	saveChlore(value){
		this.visit.technique.chlore =value;
		this.saveTechnical();
	}
	savePH(value){
		this.visit.technique.PH =value;
		this.saveTechnical();
	}
	saveTemperature(event){
		console.log(" saveTemperature", event)
		this.visit.technique.waterTemperature = event.detail.value ;
		console.log(" saveTemperature", this.visit.technique.waterTemperature)
		this.saveTechnical();
	}
	saveTechnical(){
		this.dataSharingService.someDataChanges(this.visit);
	}
}
