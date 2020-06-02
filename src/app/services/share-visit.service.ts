import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
	providedIn: 'root'
})
export class ShareVisitService {

	visit:Visit = new Visit()

	getVisit(){
		return this.visit
	}
	setVisit(visit){
		this.visit = this.visit
	}
	constructor() { }
}
