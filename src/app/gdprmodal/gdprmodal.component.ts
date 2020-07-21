import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
	selector: 'app-gdprmodal',
	templateUrl: './gdprmodal.component.html',
	styleUrls: ['./gdprmodal.component.scss'],
})
export class GdprmodalComponent implements OnInit {

	@Input("homeref") value;
	@Input("uid") uid;
	@Input("claims") claims;

	public notificationConsent:boolean=false;
	constructor(
		public navParams : NavParams,
		private storage: Storage,

		) { }

	ngOnInit() {
		console.log("claims:",this.claims);
	}

	closePopup(){
		this.storage.set("notificationConsent",this.notificationConsent);
		this.navParams.get('homeref').dismissGDPRPopover();
	}

}
