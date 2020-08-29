export class Company {
	public name:string="";
	public googleAddress: string ="";
	public location:any="";
	public email:string="";
	public telPhoneNumber: string;
	public nameSecondaryVisit:string="";
	public configuration:Configuration =new Configuration();
	public plan:string="free";
	public numberOfSwimmingPools:number=0;
}

export class Configuration{
	public logoPictureUrl:string="https://firebasestorage.googleapis.com/v0/b/piscinet-79e4a.appspot.com/o/4QVv7PDq0vCMmrqOQcq3%2FswimmingPoolAvatar.png?alt=media&token=0df5cb4c-ce6e-4f85-91f7-2f738971ca6b";
	public logoPictureForNotifUrl:string="https://firebasestorage.googleapis.com/v0/b/piscinet-79e4a.appspot.com/o/4QVv7PDq0vCMmrqOQcq3%2FswimmingPoolAvatar.png?alt=media&token=0df5cb4c-ce6e-4f85-91f7-2f738971ca6b";
	public nameLoginPage:string="";
	public emailConfiguration:EmailConfiguration= new EmailConfiguration();
}

export class EmailConfiguration{
	public serverEmail:ServerEmail= new ServerEmail();
	public sendEmailAfterVisit:boolean=false;
	public emailTemplates:EmailTemplates=new EmailTemplates();


}
export class ServerEmail{
	public from:EmailDataName= new EmailDataName();
	public reply_to:EmailDataName= new EmailDataName();
	public emailServerPassword:string="bl120201";
}

export class EmailTemplates{
	public visitOK:string="d-5583dd041e5f427d9810c9edd5e63544";
	public visitKO:string="d-4ab1d101a62a427c9b9131be968b3b4f";
	public welcomeCustomer:string="d-e2bb5a74bc5841a98992909bdfe4635d";
	public welcomeEmployee:string="d-e2bb5a74bc5841a98992909bdfe4635d";
}
export class EmailDataName{
	public email:string="poolsoftcontact@gmail.com";
	public name:string="poolSoft";
}