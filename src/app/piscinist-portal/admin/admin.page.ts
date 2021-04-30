import { Component, OnInit,NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';




import {Company} from '../../models/company';
import {StorageService} from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { EmployeeService } from '../../services/employee.service'
import { AccountService } from '../../services/account.service'
import {Employee} from '../../models/employee';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

	public company:Company = new Company();
	public pushNotifAllVisitSubscription:boolean=false;
	public accountID='piscinet';
	public uid:string ="";

	public GoogleAutocomplete: google.maps.places.AutocompleteService;
	public geocoder = new google.maps.Geocoder;
	public autocomplete: { input: string; };
	public autocompleteItems: any[];
	public location: any;
	public loading ;

	public uploader:FileUploader;
	public hasBaseDropZoneOver:boolean;
	public hasAnotherDropZoneOver:boolean;
	public response:string;
	public fileToUpload: File;
	public maxFileSize = 300 * 300;  


	public accountChangesSub: Subscription = new Subscription();
	public userChangesSub: Subscription = new Subscription();

	constructor(
		private afs: AngularFirestore,
		public authService:AuthenticationService,
		public employeeService:EmployeeService,
		private accountService: AccountService,
		private functions: AngularFireFunctions,
		public storageService : StorageService,
		public zone: NgZone,

		) {
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
	}

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.accountChangesSub = this.accountService.getAccount(null).subscribe(
			(data)=>{
				this.company = data;
				this.autocomplete = { input: this.company.googleAddress};

			})
		this.userChangesSub = this.authService.userDetails().subscribe( (data)=>{
			this.uid = data.uid;
			this.employeeService.getEmployee(this.uid).subscribe(
				employee =>{
					if( employee !==null){
						this.pushNotifAllVisitSubscription = employee.pushNotifAllVisitSubscription;
					}
				})
		});
		this.uploader = new FileUploader({

			disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
			formatDataFunctionIsAsync: true,
			maxFileSize: this.maxFileSize
		});
		this.uploader.onAfterAddingFile = (fileItem) => {
			fileItem.withCredentials = false;
			this.fileToUpload = fileItem._file;
		};

		this.uploader.onWhenAddingFileFailed = (item, filter) => {
			let message = '';
			switch (filter.name) {
				case 'fileSize':
				message = 'Warning ! \nThe uploaded file \"' + item.name + '\" is ' + this.formatBytes(item.size) + ', this exceeds the maximum allowed size of ' + this.formatBytes(this.maxFileSize);
				break;
				default:
				message = 'Error trying to upload file '+item.name;
				break;
			}

			alert(message);
		};

	}
	
	formatBytes(bytes, decimals?) {
		if (bytes == 0) return '0 Bytes';
		const k = 1024,
		dm = decimals || 2,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	ionViewWillLeave(){
		this.accountChangesSub.unsubscribe()
		this.userChangesSub.unsubscribe()
	}

	saveConfiguration(){
		this.accountService.saveAccount(null, this.company);
	}

	updateSearchResults(){
		if (this.autocomplete.input == '') {
			this.autocompleteItems = [];
			return;
		}

		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input,  componentRestrictions: {country: 'fr'}, types: ['address'] },
			(predictions, status) => {
				this.autocompleteItems = [];
				this.zone.run(() => {
					predictions.forEach((prediction) => {
						this.autocompleteItems.push(prediction);
					});
				});
			});
	}
	selectSearchResult(item) {
		this.location = item
		this.company.googleAddress = this.location.description;
		this.geocoder.geocode({'placeId': this.location.place_id}, (results, status) => {
			this.company.location = {lat: results[0].geometry.location.lat(),lng :results[0].geometry.location.lng()}; 
		})
		this.autocomplete = { input: this.company.googleAddress};
		this.autocompleteItems = [];
	}

	subscribeNewVisit(){
		const callable = this.functions.httpsCallable('subscribeAllNewVisits');
		const obs = callable({'uid': this.uid, 'status':this.pushNotifAllVisitSubscription});
		obs.subscribe(res => {
			console.log(res);
		});
	}

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	uploadFile(fileType){
		for(let i=0;i<this.uploader.getNotUploadedItems().length;i++){
			const mediaFolderPath = this.accountID+'/media/'+fileType;
			let returnData = this.storageService.uploadFileAndGetMetadata(
				mediaFolderPath,
				this.fileToUpload,
				);

			returnData.downloadUrl$.subscribe(data=>{
				if(fileType ==='web'){
					this.company.configuration.logoPictureUrl = data;

				}
				else if(fileType ==='notification'){
					this.company.configuration.logoPictureForNotifUrl = data;

				}			});
		}
	}
}
