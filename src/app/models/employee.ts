export class Employee {
	public firstName: string;
	public lastName: string;
	public email: string;
	public googleAddress: string ="";
	public location: any ="";
	public address: string;
	public town: string;
	public postalCode: string;
	public telPhoneNumber: string;

	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}
