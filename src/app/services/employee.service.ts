import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Employee} from '../models/employee';
import { map } from 'rxjs/operators';
import {SwimmingPool} from '../models/swimming-pool';
import {DataSharingService} from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public accountId:string="piscinet";

  constructor(
    public afDatabase: AngularFireDatabase,
    public dataSharingService: DataSharingService,
    ) 
  {
   this.dataSharingService.getAccoundIDChanges().subscribe(
      data=>{
        console.log("accountId",data);
        if(data !==null){
          if(data['accountId'] !== null){
            this.accountId=data;
          } 
        }  
      })
  }


  getEmployee(uid){
    return this.afDatabase.object<Employee>( this.accountId+'/employees/'+uid).valueChanges()
  }
  getEmployees(){
    return this.afDatabase.list<Employee>( this.accountId+'/employees', ref => ref.orderByChild('lastName')).snapshotChanges()
    .pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
        )
      );
  }
}
