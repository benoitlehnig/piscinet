import { Component, OnInit ,ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import { VisitServicesService } from '../../services/visit-services.service';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.page.html',
	styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

	@ViewChild('barChart') barChart;
	bars: any;
	colorArray: any;
	constructor(
		public visitServicesService: VisitServicesService,
		public dataSharingService:DataSharingService
		) { }

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.createBarChart();
	}

	createBarChart() {
		this.bars = new Chart(this.barChart.nativeElement, {
			type: 'line',
			data: {
				labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
				datasets: [{
					label: 'Viewers in millions',
					data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
					backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
					borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
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
				}
			}
		});
	}

}
