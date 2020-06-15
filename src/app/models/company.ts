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
	public sendEmailAfterVisit:boolean=false;
}
