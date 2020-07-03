export class Company {
	public name:string="";
	public googleAddress: string ="";
	public location:any="";
	public email:string="";
	public telPhoneNumber: string;
	public logoPictureUrl:string="";
	public configuration:Configuration =new Configuration();
}

export class Configuration{
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
	public emailServerPassword:string="";
}

export class EmailTemplates{
	public visitOK:string="";
	public visitKO:string="";
	public welcomeCustomer:string="";
	public welcomeEmployee:string="";
}
export class EmailDataName{
	public email:string="";
	public name:string="";
}