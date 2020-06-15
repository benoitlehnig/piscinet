import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppConstants {
	public appAdminPages = [

	{
		title: 'Customers',
		url: 'customers',
		icon: 'person'
	},
	{
		title: 'Visits',
		url: 'visits',
		icon: 'shield-checkmark'
	},
	{
		title: 'Employes',
		url: 'employees',
		icon: 'people-circle'
	},
	{
		title: 'Alarms',
		url: 'alarms',
		icon: 'notifications'
	},
	{
		title: 'Admin',
		url: 'admin',
		icon: 'settings'
	}
	];
	public appCustomerPages = [
	{
		title: 'myPools',
		url: 'myPools',
		icon: 'tablet-landscape'
	},
	{
		title: 'MyProfile',
		url: 'myProfile',
		icon: 'person'
	}
	];
	public appEmployeePages = [
	{
		title: 'Customers',
		url: 'customers',
		icon: 'person'
	},

	{
		title: 'Visits',
		url: 'visits',
		icon: 'shield-checkmark'
	}
	];

}
