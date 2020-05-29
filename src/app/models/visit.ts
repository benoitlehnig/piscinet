export class Visit {
	public maintenance: Maintenance= new Maintenance();
	public observation: Observation = new Observation();
	public technique: Technique = new Technique();
	public employeeUid:string="";
	public customerUid: string="";
	public dateTime: string="";
	public poolId: string="";

	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}

export class Maintenance{
	public typeOfVisit:string="";
	public  analyse: boolean=false;
	public  curtain: boolean=false;
	public  cleaningSkimmer: boolean=false;
	public  emptySkimmer: boolean=false;
	public  cleaningSkimmerFrame: boolean=false;
	public  loopholes:boolean=false;
	public  emptyPoolRobotBag: boolean=false;
	public  cleaningWaterLine: boolean=false;
	public  vacuum: boolean=false;
	public  cleaningBeam: boolean=false;
	public  cleaningAlarm: boolean=false;
	public  properAlarm: boolean=false;
	public  passageLandingSurface: boolean=false;
	public  passageLandingDepth: boolean=false;
	public  goodFloat: boolean=false;
	public  floatNotBlocked: boolean=false;
	public  bottomDrain: boolean=false;
	public  vacuumCleaner: boolean=false;
	public  TLFilterWashing: boolean=false;
	public  TLCleaningPreFilter: boolean=false;
	public  TLChloreLVL: string="";
	public  TLPHLVL: string="";
	public  TLWaterMeter: string="";
	public  TLClockSetting: boolean=false;
	public  TLFiltrationMode: string="";
	public  TLRobotMode: string="";
	public  TLProjectorMode: string="";
	public  TLProjectorWater: string="";
	public  TLCleaningRoom: boolean=false;
	public  PFEDSaltRAS:  boolean=false;
	public  PFEDSaltCell:  boolean=false;
	public  PFEDSaltDescalingCell: boolean=false;
	public  PFEDSaltOtherProb: string="";
	public  PFEDChloraRAS:boolean=false;
	public  PFEDChloraFaulty: boolean=false;
	public  PFEDPHFaulty:boolean=false;
	public  PFEDUVRAS: boolean=false;
	public  PFEDUVCell: boolean=false;
	public  PFEDUVOtherProb: string="";
	public  PFEDPH2WaterTemp: string="";
	public  PFEDPH2RAS:boolean=false;
	public  PFEDPH2Faulty: boolean=false;
	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}
export class Observation{
	public waterGoodClarity:boolean=false;
	public algeaOnWall:boolean=false;
	public brossage: boolean=false;
	public otherObservation: string;
	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}
export class Technique{
	public chlore: string="";
	public PH: string="";
	public stabilisant: string="";
	public TAC: string="";
	public sel: string="";
	public productChlore: string="";
	public productPH: string="";
	public productGalet: string="";
	public productSel: string="";
	public productFloculent: string="";
	public productOther: string;
	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}