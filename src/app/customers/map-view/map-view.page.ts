import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'


@Component({
	selector: 'app-map-view',
	templateUrl: './map-view.page.html',
	styleUrls: ['./map-view.page.scss'],
})
export class MapViewPage implements OnInit {

	zoom = 8;
	center: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
		zoom : 8,
		center: this.center,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: true,
		rotateControl:false
	}
	@ViewChild('Map') mapElement: ElementRef;
	map: any;

	public customers;
	public markers=[];

	constructor(
		public dataSharingService:DataSharingService
		) { }


	ngOnInit() {

		this.center = {lat:43.810522, lng:4.827776}
		let sub = this.dataSharingService.getCustomersChanges().subscribe(
			data => {
				if(data){
					this.customers = data;
					this.customers.forEach(obj => {
						console.log(obj)
						const newMarker={
							position: {
								lat: obj.data.location.lat + ((Math.random() - 0.5) * 2) / 10,
								lng: obj.data.location.lng + ((Math.random() - 0.5) * 2) / 10,
							},
							title: obj.data.firstName +" "+ obj.data.lastName						}
						this.markers.push(newMarker)
					})
				
					console.log(this.customers);
				}
				
			});	sub.unsubscribe();

	}


}
