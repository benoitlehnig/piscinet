import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Employee} from '../models/employee';
import { map } from 'rxjs/operators';
import {SwimmingPool} from '../models/swimming-pool';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  constructor(
  	public afDatabase: AngularFireDatabase,
  	) { }


  getEmployee(uid){
  	return this.afDatabase.object<Employee>('employees/'+uid).valueChanges()
  }
  getEmployees(){
  	return this.afDatabase.list<Employee>('/employees', ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
  }
}
