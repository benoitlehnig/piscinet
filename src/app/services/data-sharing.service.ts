import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
	providedIn: 'root'
})
export class DataSharingService {

	private someDataSource = new BehaviorSubject(null);
	private offlineVisitNumberDataSource = new BehaviorSubject(null);
	private currentPoolDataSource = new BehaviorSubject(null);
	private customersDataSource = new BehaviorSubject(null);
	private customerDataSource = new BehaviorSubject(null);
	private accountIDDataSource = new BehaviorSubject(null);

	currentSomeDataChanges = this.someDataSource.asObservable();
	currentOfflineVisitNumberChanges = this.offlineVisitNumberDataSource.asObservable();
	currentPoolChanges = this.currentPoolDataSource.asObservable();
	customersChanges = this.customersDataSource.asObservable();
	customerChanges = this.customerDataSource.asObservable();
	accountIDChanges = this.accountIDDataSource.asObservable();


	constructor() { }

	someDataChanges(data) {
		this.someDataSource.next(data);
	}
	
	

	getData(){
		return this.currentSomeDataChanges;
	}

	offlineVisitNumberDataChanges(data) {
		this.offlineVisitNumberDataSource.next(data);
	}

	getOfflineVisitNumberData(){
		return this.currentOfflineVisitNumberChanges;
	}

	currentPool(pool){
		this.currentPoolDataSource.next(pool);
	}
	getCurrentPoolChanges(){
		return this.currentPoolChanges;
	}
	currentCustomers(customers){
		this.customersDataSource.next(customers);
	}
	getCustomersChanges(){
		return this.customersChanges;
	}

	currentCustomer(customer){
		this.customerDataSource.next(customer);
	}
	getCustomerChanges(){
		return this.customerChanges;
	}
	currentAccountID(accountId){
		this.accountIDDataSource.next(accountId);
	}
	getAccoundIDChanges(){
		return this.accountIDChanges;
	}
}
