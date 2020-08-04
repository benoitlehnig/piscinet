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
    cover: string="liner";
    barrier: boolean=false;
    alarmElectronicSystem: boolean=false;
    access: string="ladder";
    winterCover: boolean=false;
    curtain: boolean=false;
    robot: boolean=false;
    coverType: string="";
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
    pompModel: string="";
    pompBrand: string="";
    pompPower: string="";
    pompPhase: string="";
    automaticFill: boolean=false;
    automaticFillDate: string="";
    automaticFillType: string="";
    counterCurrent: boolean=false;
    observation: string="";
    lastVisitDate: string="";
    numberOfVisits: number=0;
    lastCurtainCleaningDate:string="";
    lastTLCleaningDate:string="";
    lastMaintenanceDate:string="";
        
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
