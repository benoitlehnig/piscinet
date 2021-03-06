export class Customer {
  public firstName: string ="";
  public lastName: string ="";
  public email: string ="";
  public googleAddress: string ="";
  public location: any ="";
  public address: string ="";
  public town: string ="";
  public postalCode: string ="";
  public telPhoneNumber: string ="";
  public telFixNumber: string ="";
  public guardianNumber: string ="";
  public typeOfContract: string ="";
  public contractOfProduct: string ="";
  public userRecordUid:string="";
  public nextComeBack: NextComeBack= new NextComeBack();

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class NextComeBack{
  public returnDate:string="";
  public heatPompRequest:boolean=false;
}