export class SwimmingPool {
	customerUid: string="";
	name: string="Principale";
    picture: string="";
    length: number=null;
    width: number=null;
    depth: number=null;
    shape: string="rectangular";
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
    sandFilterWeight:number=0;
    cleanFilterPressure:number=0;
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
    automaticFillBrand: string="";
    automaticFillModel: string="";
    frostPreventionSystem: boolean=false;
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
