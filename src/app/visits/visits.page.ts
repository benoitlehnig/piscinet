import { Component, OnInit } from '@angular/core';
import { VisitServicesService } from '../services/visit-services.service';
import {Visit} from '../models/visit';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits;
  public offlinevisitMode :boolean = false;

  constructor(
    public visitServicesService: VisitServicesService,
    public activatedRoute:ActivatedRoute
    ) 
  { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.initLiverData()
    });

  }
  initLiverData(){
    this.visits = this.visitServicesService.getVisitsSinceMonth(1,100);
  }
}
