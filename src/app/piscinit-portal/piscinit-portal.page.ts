import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../services/authentication.service';
import { OnlineCheckService } from '../services/online-check.service'
import { DataSharingService } from '../services/data-sharing.service'




import {AppConstants } from '../app-constants';


@Component({
	selector: 'app-piscinit-portal',
	templateUrl: './piscinit-portal.page.html',
	styleUrls: ['./piscinit-portal.page.scss'],
})
export class PiscinitPortalPage implements OnInit {

	public selectedIndex = 0;
	public isUserLogged:boolean= false;
	public uid;
	public displayName;
	public appPages =[];
	public isOnline:boolean=true;
	public offlineVisits=[];

	public claims:{[key: string]: any}={'admin':false, 'email':""}
	
	public claimsChangesSub: Subscription = new Subscription();
	public onlineChangesSub: Subscription = new Subscription();
	public currentOfflineVisitChangesSub: Subscription = new Subscription();



	constructor(   
		private appConstants: AppConstants,
		public router:Router,
		public authenticationService:AuthenticationService,
		private storage: Storage,
		public onlineCheckService: OnlineCheckService,
		public dataSharingService: DataSharingService,

		) { }

	ngOnInit() {
	}
	ionViewWillEnter() {
		this.appPages = this.appConstants.appEmployeePages;
		this.claimsChangesSub = this.authenticationService.getClaimsChanges().subscribe(
			data=>{
				console.log("this claims," , data);
				if(data !==null){
					this.claims = data;
					if(this.claims['admin'] ===true){
						this.appPages = this.appConstants.appAdminPages;
					}
					if(this.claims['superAdmin'] ===true){
						this.appPages = this.appConstants.appASuperAdminPages;
					}
				}
				
			});
		this.onlineChangesSub = this.onlineCheckService.onlineCheck().subscribe(isOnline => {
			this.isOnline = isOnline;
			this.storage.get('offlineVisits').then(
				data =>{
					if(data !==null){
						this.dataSharingService.offlineVisitNumberDataChanges( JSON.parse(data));
					}
				});
			this.currentOfflineVisitChangesSub = this.dataSharingService.currentOfflineVisitNumberChanges.subscribe(data => {
				if(data !==null){
					this.offlineVisits = data
				}
			});
		});
		
	}
	ionViewWillLeave(){
		this.claimsChangesSub.unsubscribe();
		this.onlineChangesSub.unsubscribe();
		this.currentOfflineVisitChangesSub.unsubscribe();
	}

	logout(){
		this.authenticationService.logoutUser();
	}
	redirectTo(url){
		this.router.navigate([url]);
	}

	selectTabNavigation(){
		const path = window.location.pathname;
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
		}
	}

	
}
