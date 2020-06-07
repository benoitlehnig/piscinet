import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

	@Input("homeref") value;
	@Input("uid") uid;


	constructor(public navParams : NavParams,) { }

	ngOnInit() {}
	sendEmailUserCreation(){
		this.navParams.get('homeref').sendEmailUserCreation();

	}
	dismissPopover(){
		this.navParams.get('homeref').dismissPopover();
	}
	setAdmin(){
		this.navParams.get('homeref').setAdmin();
	}

}
