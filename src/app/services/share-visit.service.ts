import { Injectable } from '@angular/core';
import {Visit} from '../models/Visit';

@Injectable({
	providedIn: 'root'
})
export class ShareVisitService {

	private visit:Visit = new Visit()

		get visit(){
		return this.visit
	}
	constructor() { }
}
