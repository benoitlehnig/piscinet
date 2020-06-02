import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
	providedIn: 'root'
})
export class DataSharingService {

	private someDataSource = new BehaviorSubject(null);

	currentSomeDataChanges = this.someDataSource.asObservable();

	constructor() { }

	someDataChanges(data) {
		this.someDataSource.next(data);
	}

	getData(){
		return this.currentSomeDataChanges;
	}
}
