import { Component, OnInit,Input  } from '@angular/core';
import { NavParams} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public navParams : NavParams,) { }

@Input("homeref") value;
@Input("uid") uid;
@Input("customerStringified") customerStringified;

  ngOnInit() {}

  sendEmailUserCreation(){
  	this.navParams.get('homeref').sendEmailUserCreation();

  }
  dismissPopover(){
  	this.navParams.get('homeref').dismissPopover();
  }

}
