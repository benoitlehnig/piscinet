import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import {AccountService} from '../../services/account.service'
import {Company} from '../../models/company';

@Component({
	selector: 'app-super-admin',
	templateUrl: './super-admin.page.html',
	styleUrls: ['./super-admin.page.scss'],
})
export class SuperAdminPage implements OnInit {

	public accounts:Array<Company>=[];
	public accountsChangesSub: Subscription = new Subscription();


	constructor(
		public  accountService: AccountService,

		) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.accountsChangesSub  = this.accountService.getAcccounts().subscribe(
			(data)=> {
				this.accounts = data});
		
	}

	ionViewWillLeave(){
		this.accountsChangesSub.unsubscribe()
	}




}
