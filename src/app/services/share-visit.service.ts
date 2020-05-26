import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ShareVisitService {

	private visit: {
		maintenance:null,
		technique:null,
		observation:null
	};

	addMaintenance(maintenance:any) {
		visit.maintenance = maintenance
	}
	addTechnique(technique:any) {
		visit.technique = technique
	}
	addObservation(technique:any) {
		visit.observation = observation
	}

	get visit(){
		return this.visit
	}
	constructor() { }
}
