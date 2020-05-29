export class SwimmingPool {
	customerUid: string="";
	name: string="Principale";
    picture: string="";
    length: number=0;
    width: number=0;
    depth: number=0;
    shape: string="";
    environment: number=0;
    state: number=0
    cover: string="";
    warning: boolean=true;
    access: string="";
    winterCover: boolean=false;
    dateSandFilter: string="";
    brandSandFilter: string="";
    brandFilter: string="";
    cvFilter: string="";
    dateFilter: string="";
    electronicalProduct: string="";
    dateElectronicalProduct: string="";
    PH: boolean=false;
    PHDate: string="";
    pomp:  boolean=false;
    pompDate: string="";
    automaticFill: boolean=false;
    automaticFillDate: string="";
    observation: string="";
    lastVisitDate: string="";
    numberOfVisits: number=0;

	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}
