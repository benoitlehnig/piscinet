import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Customer} from '../../models/customer';
import {SwimmingPool} from '../../models/swimming-pool';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AuthenticationService } from '../../services/authentication.service';
import {AccountServicesService}  from '../../services/account-services.service'; 
import { AngularFireFunctions } from '@angular/fire/functions';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import {TranslateService} from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CustomerService } from '../../services/customer.service'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';



@Component({
	selector: 'app-customer',
	templateUrl: './customer.page.html',
	styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

	//google map parameters
	public zoom = 18;
	public center: google.maps.LatLngLiteral
	public options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: true,
		rotateControl:false
	}
	public claims:{[key: string]: any}={'admin':false}
	public emailSentText:string="";

	public uid:string;
	public customer:Customer=new Customer();
	public customerStringified;string="";
	public swimmingPools=[];
	public loading ;
	public loadingText:string="" ;
	public successDeleteText:string="";
	public mapOK = false;
	public eligibilityToAddPool:boolean = true;
	public visitTypesText=[];
	public newVisitCancelText:string = "";
	public nextComeBackDisplay:boolean = false;

	@ViewChild(GoogleMap, { static: false }) map: GoogleMap

	public accountChangesSub: Subscription = new Subscription();
	public customerChangesSub: Subscription = new Subscription();
	public poolsChangesSub: Subscription = new Subscription();


	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		public authenticationService:AuthenticationService,
		private functions: AngularFireFunctions,
		public popoverController: PopoverController,
		public translateService : TranslateService,
		public navCtrl: NavController,
		public loadingController: LoadingController,
		public toastController: ToastController,	
		public customerService:CustomerService,
		public accountServicesService:AccountServicesService,
		public actionSheetController: ActionSheetController

		) { }

	ngOnInit() {}
	ionViewWillEnter() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		this.translateService.get(['CUSTOMER.EmailSent','COMMON.Loading','CUSTOMER.NewVisitCancel','VISIT.TYPES','CUSTOMER.SuccessDeleteText'] ).subscribe(
			value => {
				this.emailSentText = value['CUSTOMER.EmailSent'];
				this.loadingText = value['COMMON.Loading'];
				this.successDeleteText = value['CUSTOMER.SuccessDeleteText'];
				this.visitTypesText = value['VISIT.TYPES'];
				this.newVisitCancelText =  value['CUSTOMER.NewVisitCancel'];
			});	
		this.accountChangesSub = this.accountServicesService.getAccount(this.claims['accountId']).subscribe(
			(account) => {
				if(account.plan ==='free' && account.numberOfSwimmingPools >=5){
					this.eligibilityToAddPool = false;
				}
			})	

		this.customerChangesSub = this.customerService.getCustomer(this.uid).subscribe(
			(data) =>{
				if(data!==null){
					this.customer = data;
					if(this.customer.nextComeBack){
						var now = moment();
						if(now.diff(moment(this.customer.nextComeBack.returnDate)) <0){
							this.nextComeBackDisplay = true;
						}
					}
					this.customerStringified = JSON.stringify(data);
					this.center = this.customer.location;
					this.mapOK = true;
				}
			})
		this.poolsChangesSub = this.customerService.getCustomerPools(this.uid).subscribe(
			(data)=>{
				this.swimmingPools = data;
			})
		
	}
	ionViewWillLeave(){
		this.accountChangesSub.unsubscribe()
		this.customerChangesSub.unsubscribe()
		this.poolsChangesSub.unsubscribe()
	}


	async presentPopover(ev: any) {
		let isActivated:boolean=false;
		if(this.customer.userRecordUid && (this.customer.userRecordUid !== null ||this.customer.userRecordUid !=="")){
			isActivated =true;
		}
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			componentProps: {homeref:this, uid:this.uid,customerStringified:this.customerStringified,isActivated:isActivated,eligibilityToAddPool:this.eligibilityToAddPool},
			cssClass: 'popover',
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	dismissPopover(){
		this.popoverController.dismiss();
	}
	

	activateAccount(){
		let accountCreationRequest={'customer':this.customer, 'uid': this.uid};
		const callable = this.functions.httpsCallable('activateCustomer');
		const obs = callable(accountCreationRequest);
		obs.subscribe(async res => {
			this.sendEmailUserCreation()
		});
	}
	sendEmailUserCreation(){
		let email={'customer':this.customer, 'uid': this.uid};
		const callable = this.functions.httpsCallable('sendUserCreationEmail');
		const obs = callable(email);
		obs.subscribe(async res => {
		});
	}

	async removeCustomer(){
		let customer={'customer':this.customer, 'uid': this.uid};

		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();
		this.navCtrl.navigateRoot(['customers/']);

		const callable = this.functions.httpsCallable('deleteCustomer');
		const obs = callable(customer);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
			this.presentToast();
			this.loading.dismiss();
		});

	}

	async presentToast() {
		let message = this.customer.firstName +" "+ this.customer.lastName +" "+ this.successDeleteText;
		
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

	startVisit(type:string,swimmingPool){
		const swimmingPoolStringified = JSON.stringify(swimmingPool.data);
		this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +swimmingPool.key+'/add-visit',{ mode: 'add', customer: this.customerStringified,
			swimmingPoolName:swimmingPool.name,visitType:type,swimmingPoolStringified:swimmingPoolStringified }])
	}

	async presentActionSheet(swimmingPool) {
		let buttons= [{
			text: this.visitTypesText['full'].Long,
			icon: 'shield-checkmark',
			handler: () => {
				const swimmingPoolStringified = JSON.stringify(swimmingPool.data);
				this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +swimmingPool.key+'/add-visit',{ mode: 'add', customer: this.customerStringified,
					swimmingPoolName:swimmingPool.name,visitType:'full',swimmingPoolStringified:swimmingPoolStringified }])
			}
		}, {
			text:  this.visitTypesText['maintenance'].Long,
			icon: 'shield-checkmark',
			handler: () => {
				const swimmingPoolStringified = JSON.stringify(swimmingPool.data);
				this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +swimmingPool.key+'/add-visit',{ mode: 'add', customer: this.customerStringified,
					swimmingPoolName:swimmingPool.name,visitType:'maintenance',swimmingPoolStringified:swimmingPoolStringified }])
			}
		},
		{
			text: this.newVisitCancelText,
			icon: 'close',
			role: 'cancel',
			handler: () => {
				console.log('Cancel clicked');
			}
		}];
		if(this.customer.typeOfContract === "technical"){
			buttons =[{
				text:  this.visitTypesText['technical'].Long,
				icon: 'shield-checkmark',
				handler: () => {
					const swimmingPoolStringified = JSON.stringify(swimmingPool.data);
					this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +swimmingPool.key+'/add-visit',{ mode: 'add', customer: this.customerStringified,
						swimmingPoolName:swimmingPool.name,visitType:'technical',swimmingPoolStringified:swimmingPoolStringified }])
				}
			}, 
			{
				text: this.newVisitCancelText,
				icon: 'close',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]
		}
		if(this.customer.typeOfContract === "seasonal"){
			buttons =[{
				text:  this.visitTypesText['adhoc'].Long,
				icon: 'shield-checkmark',
				handler: () => {
					const swimmingPoolStringified = JSON.stringify(swimmingPool.data);
					this.router.navigate(['/customers/'+this.uid+'/swimming-pool/' +swimmingPool.key+'/add-visit',{ mode: 'add', customer: this.customerStringified,
						swimmingPoolName:swimmingPool.name,visitType:'adhoc',swimmingPoolStringified:swimmingPoolStringified }])
				}
			}, 
			{
				text: this.newVisitCancelText,
				icon: 'close',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]
		}
		const actionSheet = await this.actionSheetController.create({
			header: 'Nouvelle visite',
			cssClass: 'my-custom-class',
			buttons: buttons
		});
		await actionSheet.present();
	}
	closeMessage(){
		this.nextComeBackDisplay =false;
	}


}
