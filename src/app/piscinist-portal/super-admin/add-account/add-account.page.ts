import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';


import {Company} from '../../../models/company';
import {AccountService} from '../../../services/account.service'

@Component({
	selector: 'app-add-account',
	templateUrl: './add-account.page.html',
	styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

	public mode:string="add";
	public account:Company = new Company();
	public accountId:string="";
		public accountChangesSub: Subscription = new Subscription();


	constructor(
		private functions: AngularFireFunctions,
		public activatedRoute:ActivatedRoute,
		public navCtrl: NavController,
		public accountService:AccountService

		) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			if(this.mode ==='update'){
				this.accountId = params['id'];
				this.accountChangesSub = this.accountService.getAccount(this.accountId).subscribe(
					(data)=>
					this.account = data);
			}
		});
	}
	ionViewWillLeave(){
		this.accountChangesSub.unsubscribe()
	}

	addAccount(){
		const callable = this.functions.httpsCallable('addAccount');
		const obs = callable(this.account);
		obs.subscribe(async res => {
			this.navCtrl.navigateRoot(['super-admin/']);
		});
	}

	updateAccount(){
		let accountToUpdate={'accountId':this.accountId, 'value' : this.account};
		const callable = this.functions.httpsCallable('updateAccount');
		const obs = callable(accountToUpdate);
		obs.subscribe(async res => {
			this.navCtrl.navigateRoot(['super-admin/']);
		});
	}
	async submitForm(){
		if(this.mode ==='add'){
			this.addAccount()
		}
		if(this.mode ==='update'){
			this.updateAccount()
		}
	}
}
