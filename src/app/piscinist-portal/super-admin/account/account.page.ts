import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Company} from '../../../models/company';
import {AccountService} from '../../../services/account.service'
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-account',
	templateUrl: './account.page.html',
	styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

	public accountId:string="";
	public account:Company = new Company();
	public accountChangesSub: Subscription = new Subscription();

	constructor(
		public  accountService: AccountService,
		public  activatedRoute: ActivatedRoute,
		) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.accountId = this.activatedRoute.snapshot.paramMap.get('id');
		this.accountChangesSub  = this.accountService.getAccount(this.accountId).subscribe(
			(data) =>{
				console.log("account : ", data);
				this.account = data;
			})		
	}

	ionViewWillLeave(){
		this.accountChangesSub.unsubscribe()
	}

	saveAccount(){
		
	}

}
