import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/Visit';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

	visit:Visit = new Visit();
	visitId:string="";
	customerInfo:any;
	swimmingPoolName:string="";
	constructor(
		private activatedRoute: ActivatedRoute,
		public db: AngularFireDatabase


		) {

	}

	ngOnInit() {
		this.visitId = this.activatedRoute.snapshot.paramMap.get('vid');

	}
	ionViewWillEnter(){
		this.db.object<Visit>('visits/'+this.visitId).valueChanges().subscribe(
			(data) =>{
				this.visit = data;
				console.log(this.visit);
			})

	}

}
