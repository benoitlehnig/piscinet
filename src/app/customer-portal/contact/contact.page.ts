import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
	selector: 'app-contact',
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

	public contact:Contact = new Contact();

	public reasonList =[];
	public successMessageSentText:string="";

	public messageSent:boolean=false;



	constructor(
		public translateService : TranslateService,
		private functions: AngularFireFunctions,

		) { }


	ngOnInit() {
	}

	ionViewWillEnter(){
		
		for (let i =0; i<2; i++){
			this.translateService.get('CONTACT.Reason'+i).subscribe(
				value => {
					this.reasonList.push({index:i,text:value});
				})
		}
	}

	sendContactRequest(){
		this.contact.dateTimeLogged =  moment().format();
		const callable = this.functions.httpsCallable('addMessage');
		const obs = callable(this.contact);
		obs.subscribe(res => {
			

		});	
		console.log("sendContactRequest ", this.contact);
		this.messageSent =true;
	}


}
