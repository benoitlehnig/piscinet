import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataSharingService } from '../../../services/data-sharing.service'
import { Subscription } from 'rxjs';



@Component({
	selector: 'app-map-view',
	templateUrl: './map-view.page.html',
	styleUrls: ['./map-view.page.scss'],
})
export class MapViewPage implements OnInit {

	//Google Maps parameters
	public zoom = 8;
	public center: google.maps.LatLngLiteral = {lat:43.810522, lng:4.827776}
	public options: google.maps.MapOptions = {
		zoom : 8,
		center: this.center,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: true,
		rotateControl:false
	}
	@ViewChild('Map') mapElement: ElementRef;


	public map: any;
	public customers;
	public markers=[];


	public customersChangesSub: Subscription = new Subscription();

	
	constructor(
		public dataSharingService:DataSharingService
		) { }


	ngOnInit() {}
	
	ionViewWillEnter() {
		this.customersChangesSub = this.dataSharingService.getCustomersChanges().subscribe(
			data => {
				if(data){
					this.customers = data;
					this.customers.forEach(obj => {
						const newMarker={
							position: {
								lat: obj.data.location.lat + ((Math.random() - 0.5) * 2) / 10,
								lng: obj.data.location.lng + ((Math.random() - 0.5) * 2) / 10,
							},
							title: obj.data.firstName +" "+ obj.data.lastName						}
						this.markers.push(newMarker)
					})
				}
			});
	}

	ionViewWillLeave(){
		this.customersChangesSub.unsubscribe();
	}

}
