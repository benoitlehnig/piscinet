import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppConstants {
	public appAdminPages = [

	{
		title: 'Customers',
		url: 'piscinistPortal/customers',
		icon: 'person'
	},
	{
		title: 'Visits',
		url: 'piscinistPortal/visits',
		icon: 'shield-checkmark'
	},
	{
		title: 'Employes',
		url: 'piscinistPortal/employees',
		icon: 'people-circle'
	},
	{
		title: 'Alarms',
		url: 'piscinistPortal/alarms',
		icon: 'notifications'
	},
	{
		title: 'Admin',
		url: 'piscinistPortal/admin',
		icon: 'hammer'
	}
	];
	public appASuperAdminPages = [

	{
		title: 'Customers',
		url: 'piscinistPortal/customers',
		icon: 'person'
	},
	{
		title: 'Visits',
		url: 'piscinistPortal/visits',
		icon: 'shield-checkmark'
	},
	{
		title: 'Employes',
		url: 'piscinistPortal/employees',
		icon: 'people-circle'
	},
	{
		title: 'Alarms',
		url: 'piscinistPortal/alarms',
		icon: 'notifications'
	},
	{
		title: 'Admin',
		url: 'piscinistPortal/admin',
		icon: 'hammer'
	},
	{
		title: 'SuperAdmin',
		url: 'piscinistPortal/super-admin',
		icon: 'barbell'
	}
	];
	public appCustomerPages = [
	{
		title: 'MyProfile',
		url: 'customerPortal/profile',
		icon: 'person'
	},
	{
		title: 'myPools',
		url: 'customerPortal/pools',
		icon: 'tablet-landscape'
	},
	{
		title: 'Contact',
		url: 'customerPortal/contact',
		icon: 'chatbox-ellipses' 
	}
	];
	public appEmployeePages = [
	{
		title: 'Customers',
		url: 'piscinistPortal/customers',
		icon: 'person'
	},

	{
		title: 'Visits',
		url: 'piscinistPortal/visits',
		icon: 'shield-checkmark'
	}
	];

	public chloreSteps=[{
		value:0.1,
		color:'#FFFFFF',
		backgroundColor:'#C6C5D5',
	},
	{
		value:0.3,
		color:'#FFFFFF',
		backgroundColor:'#D0B0C8',
	},
	{
		value:0.6,
		color:'#FFFFFF',
		backgroundColor:'#CEA1C2',
	},
	{
		value:1,
		color:'#FFFFFF',
		backgroundColor:'#D790BC',
	},
	{
		value:1.5,
		color:'#FFFFFF',
		backgroundColor:'#E561AC',
	},
	{
		value:2,
		color:'#FFFFFF',
		backgroundColor:'#EE4CA1',
	},
	{
		value:3,
		color:'#FFFFFF',
		backgroundColor:'#F226A3',
	},
	];
	public PHSteps=[{
		value:6.8,
		color:'#FFFFFF',
		backgroundColor:'#D2AE64',
	},
	{
		value:7,
		color:'#FFFFFF',
		backgroundColor:'#D2AE64',
	},
	{
		value:7.2,
		color:'#FFFFFF',
		backgroundColor:'#E09F65',
	},
	{
		value:7.4,
		color:'#FFFFFF',
		backgroundColor:'#E8825A',
	},
	{
		value:7.6,
		color:'#FFFFFF',
		backgroundColor:'#ED5C69',
	},
	{
		value:7.8,
		color:'#FFFFFF',
		backgroundColor:'#F03B72',
	},
	{
		value:8.2,
		color:'#FFFFFF',
		backgroundColor:'#F743A4',
	},
	]
	public sandfilterPressureSteps=[{
		value:0,
		color:'#FFFFFF',
		backgroundColor:'#2dd36f',
	},
	{
		value:0.2,
		color:'#FFFFFF',
		backgroundColor:'#2dd36f',
	},
	{
		value:0.4,
		color:'#FFFFFF',
		backgroundColor:'#2dd36f',
	},
	{
		value:0.6,
		color:'#FFFFFF',
		backgroundColor:'#2dd36f',
	},
	{
		value:0.8,
		color:'#FFFFFF',
		backgroundColor:'#2dd36f',
	},
	{
		value:1,
		color:'#FFFFFF',
		backgroundColor:'#ffc409',
	},
	{
		value:1.2,
		color:'#FFFFFF',
		backgroundColor:'#ffc409',
	},
	{
		value:1.4,
		color:'#FFFFFF',
		backgroundColor:'#eb445a',
	},
	{
		value:1.6,
		color:'#FFFFFF',
		backgroundColor:'#eb445a',
	},
	]
}
