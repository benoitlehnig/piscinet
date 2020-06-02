import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-offline-visits',
  templateUrl: './offline-visits.page.html',
  styleUrls: ['./offline-visits.page.scss'],
})
export class OfflineVisitsPage implements OnInit {

public visits= [];
  constructor(
  	public storage:Storage,
    public activatedRoute:ActivatedRoute) { }


  ngOnInit() {

  	this.storage.get('offlineVisits').then(
  		val => {
  			console.log(val);
  			this.visits = val;
  		})
  }

}
