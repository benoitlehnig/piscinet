import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataSharingService } from '../../../services/data-sharing.service';
import { PoolService } from '../../../services/pool.service';
import { PhotoService } from '../../../services/photo.service';

@Component({
	selector: 'app-pictures',
	templateUrl: './pictures.page.html',
	styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {

	public poolId:string="";
	public accountId:string="";
	public pictures=[];

	public poolChangesSub: Subscription = new Subscription();
	public accountChangesSub: Subscription = new Subscription();
	public picturesChangesSub: Subscription = new Subscription();

	constructor(
		public dataSharingService:DataSharingService,
		public poolService:PoolService,
		public photoService:PhotoService,
		) { }

	ngOnInit() {
		

	}

	ionViewWillEnter(){
		this.accountChangesSub = this.dataSharingService.getAccoundIDChanges().subscribe(
			accountId =>{
				console.log(accountId);
				if(accountId!==null){
					this.accountId = accountId;
				}
			})
		this.poolChangesSub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				console.log("PicturesPage",data, data.poolId);
				if(data !== null){
					this.poolId = data.poolId;
					this.picturesChangesSub = this.poolService.getSwimmingPoolPictures(this.poolId).subscribe(
						pictures =>{
							console.log("picturesChangesSub",pictures);
							this.pictures = pictures;
						})
				}
			}
			);
	}

	ionViewWillLeave(){
		this.poolChangesSub.unsubscribe();
	}

	addPicture() {
		this.photoService.addNewToGallery(this.accountId,this.poolId);
	}
	removePicture(pictureId){
		console.log("removePicture",pictureId)
		this.photoService.removeFromGallery(this.accountId,this.poolId,pictureId);

	}
}
