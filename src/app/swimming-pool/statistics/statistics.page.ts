import { Component, OnInit ,ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import { VisitServicesService } from '../../services/visit-services.service';
import { DataSharingService } from '../../services/data-sharing.service'
import { PoolServicesService } from '../../services/pool-services.service';
import * as moment from 'moment';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.page.html',
	styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

	@ViewChild('temperatureChart') temperatureChart;
	@ViewChild('phChart') phChart;
	@ViewChild('chloreChart') chloreChart;
	@ViewChild('TACChart') TACChart;
	bars: any;
	colorArray: any;
	poolData:any;
	uid:string="";
	poolId:string="";

	chloreDataArray={
		labels:[],
		data:[]
	};
	temperatureDataArray={
		labels:[],
		data:[]
	}
	PHDataArray={
		labels:[],
		data:[]
	}
	TACArray={
		labels:[],
		data:[]
	}


	constructor(
		public visitServicesService: VisitServicesService,
		public dataSharingService:DataSharingService,
		public poolServicesService: PoolServicesService

		) { }

	ngOnInit() {
	}

	ionViewDidEnter() {
		let sub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				if(data){
					this.poolData = data.swimmingPool;
					this.uid = data.uid;
					this.poolId = data.poolId;
					this.poolServicesService.getSwimmingPoolStatistics(this.poolId,"chlore").subscribe(
						data=>{ 
							this.chloreDataArray ={	labels:[],data:[]};
							data.forEach((obj,index) =>{
								this.chloreDataArray.labels.push(moment(obj.label).format('DD-MMM-YY'));
								this.chloreDataArray.data.push(obj.value);
							});
							this.createBarChart(this.chloreChart,"chlore",this.chloreDataArray);
						})
					this.poolServicesService.getSwimmingPoolStatistics(this.poolId,"temperature").subscribe(
						data=>{ 
							this.temperatureDataArray ={	labels:[],data:[]};

							data.forEach((obj,index) =>{
								this.temperatureDataArray.labels.push(moment(obj.label).format('DD-MMM-YY'));
								this.temperatureDataArray.data.push(obj.value);
							});
							this.createBarChart(this.temperatureChart, "temperature", this.temperatureDataArray);
						})
					this.poolServicesService.getSwimmingPoolStatistics(this.poolId,"PH").subscribe(
						data=>{
							this.PHDataArray ={	labels:[],data:[]};
							data.forEach((obj,index) =>{
								this.PHDataArray.labels.push(moment(obj.label).format('DD-MMM-YY'));
								this.PHDataArray.data.push(obj.value);
							});
							this.createBarChart(this.phChart, "PH", this.PHDataArray);
						})
					this.poolServicesService.getSwimmingPoolStatistics(this.poolId,"TAC").subscribe(
						data=>{
							this.TACArray ={	labels:[],data:[]};
							data.forEach((obj,index) =>{
								this.TACArray.labels.push(moment(obj.label).format('DD-MMM-YY'));
								this.TACArray.data.push(obj.value);
							});
							this.createBarChart(this.TACChart, "TAC", this.TACArray);
						})
					
				}
			});
		
	}

	createBarChart(chart,label,array) {
		console.log(label);
		this.bars = new Chart(chart.nativeElement, {
			type: 'line',
			data: {
				labels: array.labels,
				datasets: [{
					label: label,
					data: array.data,
					borderColor: 'rgb(56, 128, 255)',// array should have same number of elements as number of dataset
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				},
				annotation: {
					annotations: [{
						type: 'line',
						mode: 'horizontal',
						value: 5,
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 4,
						label: {
							enabled: false,
							content: 'Test label'
						}
					}]
				}
			}
		});
	}

}
