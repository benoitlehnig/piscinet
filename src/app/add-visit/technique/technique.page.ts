import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/visit';
import {AppConstants } from '../../app-constants';
import {SwimmingPool} from '../../models/swimming-pool';


@Component({
	selector: 'app-technique',
	templateUrl: './technique.page.html',
	styleUrls: ['./technique.page.scss'],
})
export class TechniquePage implements OnInit {

	
	visit:Visit=new Visit();
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public lastTechnique=null;

	chloreSteps=this.appConstants.chloreSteps;
	PHSteps=this.appConstants.PHSteps;

	constructor(
		public dataSharingService:DataSharingService,
		public appConstants:AppConstants
		) { }


	ngOnInit() {
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			console.log("visit technique:", visit)
            this.visit = visit;
        });
        this.dataSharingService.getCurrentPoolChanges().subscribe(swimmingPool =>{
			this.swimmingPool = swimmingPool;
			if(swimmingPool.lastTechnique){
				this.lastTechnique = swimmingPool.lastTechnique
			}
		})	
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
	saveTechnical(){
		this.dataSharingService.someDataChanges(this.visit);
	}
}
