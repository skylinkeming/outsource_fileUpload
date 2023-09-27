import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import Chart from 'react-apexcharts';
import Highlight from 'react-highlight';
import { AppSettings } from './../../config/app-settings.js';

class ChartApex extends React.Component {
	static contextType = AppSettings;
	
	render() {
		var generateHeatmapData = function(count, yrange) {
			var i = 0;
			var series = [];
			while (i < count) {
				var x = 'w' + (i + 1).toString();
				var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

				series.push({
					x: x,
					y: y
				});
				i++;
			}
			return series;
		}
		
		var generateBubbleChartData = function(baseval, count, yrange) {
			var i = 0;
			var series = [];
			while (i < count) {
				var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
				var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
				var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

				series.push([x, y, z]);
				baseval += 86400000;
				i++;
			}
			return series;
		}
		
		this.globalOptions = {
			grid: {
				borderColor: 'rgba(' + this.context.color.componentColorRgb + ', .15)'
			},
			title: {
				style: {
					color: this.context.color.componentColor
				}
			},
			legend: {
				labels: {
					colors: this.context.color.componentColor
				}
			},
			xaxis: {
				axisBorder: {
					show: true,
					color: 'rgba(' + this.context.color.componentColorRgb + ', .25)',
					height: 1,
					width: '100%',
					offsetX: 0,
					offsetY: -1
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: 'rgba(' + this.context.color.componentColorRgb + ', .25)',
					height: 6,
					offsetX: 0,
					offsetY: 0
				},
				labels: {
					style: {
						colors: this.context.color.componentColor,
						fontSize: this.context.font.size,
						fontFamily: this.context.font.family,
						fontWeight: 400,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: this.context.color.componentColor,
						fontSize: this.context.font.size,
						fontFamily: this.context.font.family,
						fontWeight: 400,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			}
		};
		this.chart = {
			lineChart: {
				options: {
					chart: {
						height: 350,
						type: 'line',
						toolbar: {
							show: false
						}
					},
					title: {
						text: 'Average High & Low Temperature',
						align: 'center',
						style: this.globalOptions.title.style
					},
					colors: [this.context.color.blue, this.context.color.success],
					dataLabels: {
						enabled: true,
						background: {
							borderWidth: 0
						},
					},
					stroke: {
						curve: 'smooth',
						width: 3
					},
					grid: {
						row: {
							colors: ['rgba(' + this.context.color.componentColorRgb + ', .1)', 'transparent'], // takes an array which will be repeated on columns
							opacity: 0.5
						},
						borderColor: this.globalOptions.grid.borderColor
					},
					markers: {
						size: 4
					},
					xaxis: {
						categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: {
						min: 5,
						max: 40,
						labels: this.globalOptions.yaxis.labels
					},
					legend: {
						show: true,
						position: 'top',
						offsetY: -10,
						horizontalAlign: 'right',
						floating: true,
						labels: this.globalOptions.legend.labels
					}
				},
				series: [{
					name: 'High - 2020',
					data: [28, 29, 33, 36, 32, 32, 33]
				}, {
					name: 'Low - 2020',
					data: [12, 11, 14, 18, 17, 13, 13]
				}]
			},
			columnChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'bar'
					},
					title: {
						text: 'Profit & Margin Chart',
						align: 'center',
						style: this.globalOptions.title.style
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '55%',
							endingShape: 'rounded'	
						},
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						width: 2,
						colors: ['transparent']
					},
					colors: ['rgba(' + this.context.color.componentColorRgb + ', .5)', this.context.color.indigo, 'rgba(' + this.context.color.componentColorRgb + ', .25)'],
					xaxis: {
						categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: {
						title: {
							text: '$ (thousands)'
						},
						labels: this.globalOptions.yaxis.labels
					},
					fill: {
						opacity: 1
					},
					legend: this.globalOptions.legend,
					tooltip: {
						y: {
							formatter: function (val) {
								return "$ " + val + " thousands"
							}
						}
					}
				},
				series: [{
					name: 'Net Profit',
					data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
				}, {
					name: 'Revenue',
					data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
				}, {
					name: 'Free Cash Flow',
					data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
				}]
			},
			areaChart: {
				options: {
					grid: this.globalOptions.grid,
					title: this.globalOptions.title,
					chart: {
						height: 350,
						type: 'area',
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						curve: 'smooth',
						width: 3
					},
					colors: [this.context.color.pink, this.context.color.dark],
					xaxis: {
						type: 'datetime',
						categories: ['2019-09-19T00:00:00', '2019-09-19T01:30:00', '2019-09-19T02:30:00', '2019-09-19T03:30:00', '2019-09-19T04:30:00', '2019-09-19T05:30:00', '2019-09-19T06:30:00'],
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: this.globalOptions.yaxis,
					tooltip: {
						x: {
							format: 'dd/MM/yy HH:mm'
						},
					},
					legend: this.globalOptions.legend
				},
				series: [{
					name: 'series1',
					data: [31, 40, 28, 51, 42, 109, 100]
				}, {
					name: 'series2',
					data: [11, 32, 45, 32, 34, 52, 41]
				}]
			},
			barChart: {
				options: {
					grid: this.globalOptions.grid,
					title: this.globalOptions.title,
					chart: {
						height: 350,
						type: 'bar',
					},
					plotOptions: {
						bar: {
							horizontal: true,
							dataLabels: {
								position: 'top',
							},
						}  
					},
					dataLabels: {
						enabled: true,
						offsetX: -6
					},
					colors: [this.context.color.orange, 'rgba(' + this.context.color.componentColorRgb + ', .5)'],
					stroke: {
						show: true,
						width: 1,
						colors: [this.context.color.componentBg]
					},
					xaxis: {
						categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: this.globalOptions.yaxis,
					legend: this.globalOptions.legend
				},
				series: [{
					data: [44, 55, 41, 64, 22, 43, 21]
					},{
					data: [53, 32, 33, 52, 13, 44, 32]
				}]
			},
			mixedChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'line',
						stacked: false
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						width: [0, 0, 3]
					},
					colors: [this.context.color.blue, this.context.color.success, this.context.color.orange],
					title: {
						text: 'XYZ - Stock Analysis (2013 - 2021)',
						align: 'left',
						offsetX: 110,
						style: this.globalOptions.title.style
					},
					xaxis: {
						categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: [{
						axisTicks: {
							show: true,
							color: 'rgba(' + this.context.color.componentColorRgb + ', .15)'
						},
						axisBorder: {
							show: true,
							color: 'rgba(' + this.context.color.componentColorRgb + ', .15)'
						},
						title: {
							text: "Income (thousand crores)",
							style: {
								color: this.context.color.componentColor
							}
						},
						tooltip: {
							enabled: true
						}
					},{
						seriesName: 'Income',
						opposite: true,
						axisTicks: {
							show: true,
							color: 'rgba(' + this.context.color.componentColorRgb + ', .15)'
						},
						axisBorder: {
							show: true,
							color: 'rgba(' + this.context.color.componentColorRgb + ', .15)'
						},
						title: {
							text: "Operating Cashflow (thousand crores)",
							style: {
								color: this.context.color.componentColor
							}
						},
					}, {
						seriesName: 'Revenue',
						opposite: true,
						axisTicks: {
							show: true,
						},
						axisBorder: {
							show: true,
							color: this.context.color.orange
						},
						title: {
							text: "Revenue (thousand crores)",
							style: {
								color: this.context.color.orange
							}
						}
					}],
					tooltip: {
						fixed: {
							enabled: true,
							position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
							offsetY: 30,
							offsetX: 60
						},
					},
					legend: {
						horizontalAlign: 'left',
						offsetX: 40,
						labels: this.globalOptions.legend.labels
					}
				},
				series: [{
					name: 'Income',
					type: 'column',
					data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
				}, {
					name: 'Cashflow',
					type: 'column',
					data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
				}, {
					name: 'Revenue',
					type: 'line',
					data: [20, 29, 37, 36, 44, 45, 50, 58]
				}]
			},
			candlestickChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'candlestick'
					},
					title: {
						text: 'CandleStick Chart',
						align: 'left',
						style: this.globalOptions.title.style
					},
					xaxis: {
						type: 'datetime',
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: {
						tooltip: {
							enabled: true
						},
						labels: this.globalOptions.yaxis.labels
					},
					plotOptions: {
						candlestick: {
							colors: {
								upward: this.context.color.success,
								downward: this.context.color.red
							}
						}
					},
					legend: this.globalOptions.legend
				},
				series: [{
					data: [{
						x: new Date(1538778600000),
						y: [6629.81, 6650.5, 6623.04, 6633.33]
					},
					{
						x: new Date(1538780400000),
						y: [6632.01, 6643.59, 6620, 6630.11]
					},
					{
						x: new Date(1538782200000),
						y: [6630.71, 6648.95, 6623.34, 6635.65]
					},
					{
						x: new Date(1538784000000),
						y: [6635.65, 6651, 6629.67, 6638.24]
					},
					{
						x: new Date(1538785800000),
						y: [6638.24, 6640, 6620, 6624.47]
					},
					{
						x: new Date(1538787600000),
						y: [6624.53, 6636.03, 6621.68, 6624.31]
					},
					{
						x: new Date(1538789400000),
						y: [6624.61, 6632.2, 6617, 6626.02]
					},
					{
						x: new Date(1538791200000),
						y: [6627, 6627.62, 6584.22, 6603.02]
					},
					{
						x: new Date(1538793000000),
						y: [6605, 6608.03, 6598.95, 6604.01]
					},
					{
						x: new Date(1538794800000),
						y: [6604.5, 6614.4, 6602.26, 6608.02]
					},
					{
						x: new Date(1538796600000),
						y: [6608.02, 6610.68, 6601.99, 6608.91]
					},
					{
						x: new Date(1538798400000),
						y: [6608.91, 6618.99, 6608.01, 6612]
					},
					{
						x: new Date(1538800200000),
						y: [6612, 6615.13, 6605.09, 6612]
					},
					{
						x: new Date(1538802000000),
						y: [6612, 6624.12, 6608.43, 6622.95]
					},
					{
						x: new Date(1538803800000),
						y: [6623.91, 6623.91, 6615, 6615.67]
					},
					{
						x: new Date(1538805600000),
						y: [6618.69, 6618.74, 6610, 6610.4]
					},
					{
						x: new Date(1538807400000),
						y: [6611, 6622.78, 6610.4, 6614.9]
					},
					{
						x: new Date(1538809200000),
						y: [6614.9, 6626.2, 6613.33, 6623.45]
					},
					{
						x: new Date(1538811000000),
						y: [6623.48, 6627, 6618.38, 6620.35]
					},
					{
						x: new Date(1538812800000),
						y: [6619.43, 6620.35, 6610.05, 6615.53]
					},
					{
						x: new Date(1538814600000),
						y: [6615.53, 6617.93, 6610, 6615.19]
					},
					{
						x: new Date(1538816400000),
						y: [6615.19, 6621.6, 6608.2, 6620]
					},
					{
						x: new Date(1538818200000),
						y: [6619.54, 6625.17, 6614.15, 6620]
					},
					{
						x: new Date(1538820000000),
						y: [6620.33, 6634.15, 6617.24, 6624.61]
					},
					{
						x: new Date(1538821800000),
						y: [6625.95, 6626, 6611.66, 6617.58]
					},
					{
						x: new Date(1538823600000),
						y: [6619, 6625.97, 6595.27, 6598.86]
					},
					{
						x: new Date(1538825400000),
						y: [6598.86, 6598.88, 6570, 6587.16]
					},
					{
						x: new Date(1538827200000),
						y: [6588.86, 6600, 6580, 6593.4]
					},
					{
						x: new Date(1538829000000),
						y: [6593.99, 6598.89, 6585, 6587.81]
					},
					{
						x: new Date(1538830800000),
						y: [6587.81, 6592.73, 6567.14, 6578]
					},
					{
						x: new Date(1538832600000),
						y: [6578.35, 6581.72, 6567.39, 6579]
					},
					{
						x: new Date(1538834400000),
						y: [6579.38, 6580.92, 6566.77, 6575.96]
					},
					{
						x: new Date(1538836200000),
						y: [6575.96, 6589, 6571.77, 6588.92]
					},
					{
						x: new Date(1538838000000),
						y: [6588.92, 6594, 6577.55, 6589.22]
					},
					{
						x: new Date(1538839800000),
						y: [6589.3, 6598.89, 6589.1, 6596.08]
					},
					{
						x: new Date(1538841600000),
						y: [6597.5, 6600, 6588.39, 6596.25]
					},
					{
						x: new Date(1538843400000),
						y: [6598.03, 6600, 6588.73, 6595.97]
					},
					{
						x: new Date(1538845200000),
						y: [6595.97, 6602.01, 6588.17, 6602]
					},
					{
						x: new Date(1538847000000),
						y: [6602, 6607, 6596.51, 6599.95]
					},
					{
						x: new Date(1538848800000),
						y: [6600.63, 6601.21, 6590.39, 6591.02]
					},
					{
						x: new Date(1538850600000),
						y: [6591.02, 6603.08, 6591, 6591]
					},
					{
						x: new Date(1538852400000),
						y: [6591, 6601.32, 6585, 6592]
					},
					{
						x: new Date(1538854200000),
						y: [6593.13, 6596.01, 6590, 6593.34]
					},
					{
						x: new Date(1538856000000),
						y: [6593.34, 6604.76, 6582.63, 6593.86]
					},
					{
						x: new Date(1538857800000),
						y: [6593.86, 6604.28, 6586.57, 6600.01]
					},
					{
						x: new Date(1538859600000),
						y: [6601.81, 6603.21, 6592.78, 6596.25]
					},
					{
						x: new Date(1538861400000),
						y: [6596.25, 6604.2, 6590, 6602.99]
					},
					{
						x: new Date(1538863200000),
						y: [6602.99, 6606, 6584.99, 6587.81]
					},
					{
						x: new Date(1538865000000),
						y: [6587.81, 6595, 6583.27, 6591.96]
					},
					{
						x: new Date(1538866800000),
						y: [6591.97, 6596.07, 6585, 6588.39]
					},
					{
						x: new Date(1538868600000),
						y: [6587.6, 6598.21, 6587.6, 6594.27]
					},
					{
						x: new Date(1538870400000),
						y: [6596.44, 6601, 6590, 6596.55]
					},
					{
						x: new Date(1538872200000),
						y: [6598.91, 6605, 6596.61, 6600.02]
					},
					{
						x: new Date(1538874000000),
						y: [6600.55, 6605, 6589.14, 6593.01]
					},
					{
						x: new Date(1538875800000),
						y: [6593.15, 6605, 6592, 6603.06]
					},
					{
						x: new Date(1538877600000),
						y: [6603.07, 6604.5, 6599.09, 6603.89]
					},
					{
						x: new Date(1538879400000),
						y: [6604.44, 6604.44, 6600, 6603.5]
					},
					{
						x: new Date(1538881200000),
						y: [6603.5, 6603.99, 6597.5, 6603.86]
					},
					{
						x: new Date(1538883000000),
						y: [6603.85, 6605, 6600, 6604.07]
					},
					{
						x: new Date(1538884800000),
						y: [6604.98, 6606, 6604.07, 6606]
					}]
				}]
			},
			bubbleChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'bubble',
					},
					dataLabels: {
						enabled: false
					},
					colors: [this.context.color.blue, this.context.color.orange, this.context.color.success, this.context.color.pink],
					fill: {
						opacity: 0.8
					},
					title: {
						text: 'Simple Bubble Chart',
						style: this.globalOptions.title.style
					},
					xaxis: {
						tickAmount: 12,
						type: 'category',
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks,
						labels: this.globalOptions.xaxis.labels
					},
					yaxis: {
						max: 70,
						labels: this.globalOptions.yaxis.labels
					},
					legend: this.globalOptions.legend
				},
				series: [{
						name: 'Bubble1',
						data: generateBubbleChartData(new Date('11 Feb 2017 GMT').getTime(), 20, {
							min: 10,
							max: 60
						})
					},
					{
						name: 'Bubble2',
						data: generateBubbleChartData(new Date('11 Feb 2017 GMT').getTime(), 20, {
							min: 10,
							max: 60
						})
					},
					{
						name: 'Bubble3',
						data: generateBubbleChartData(new Date('11 Feb 2017 GMT').getTime(), 20, {
							min: 10,
							max: 60
						})
					},
					{
						name: 'Bubble4',
						data: generateBubbleChartData(new Date('11 Feb 2017 GMT').getTime(), 20, {
							min: 10,
							max: 60
						})
					}
				]
			},
			scatterChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'scatter',
						zoom: {
							enabled: true,
							type: 'xy'
						}
					},
					colors: [this.context.color.blue, this.context.color.orange, this.context.color.success],
					title: this.globalOptions.title,
					xaxis: {
						tickAmount: 10,
						labels: {
							formatter: function(val) {
								return parseFloat(val).toFixed(1)
							},
							color: this.globalOptions.xaxis.labels.color
						},
						axisBorder: this.globalOptions.xaxis.axisBorder,
						axisTicks: this.globalOptions.xaxis.axisTicks
					},
					yaxis: {
						tickAmount: 7,
						labels: this.globalOptions.yaxis.labels
					},
					legend: this.globalOptions.legend
				},
				series: [{
					name: "SAMPLE A",
					data: [
						[16.4, 5.4],
						[21.7, 2],
						[25.4, 3],
						[19, 2],
						[10.9, 1],
						[13.6, 3.2],
						[10.9, 7.4],
						[10.9, 0],
						[10.9, 8.2],
						[16.4, 0],
						[16.4, 1.8],
						[13.6, 0.3],
						[13.6, 0],
						[29.9, 0],
						[27.1, 2.3],
						[16.4, 0],
						[13.6, 3.7],
						[10.9, 5.2],
						[16.4, 6.5],
						[10.9, 0],
						[24.5, 7.1],
						[10.9, 0],
						[8.1, 4.7],
						[19, 0],
						[21.7, 1.8],
						[27.1, 0],
						[24.5, 0],
						[27.1, 0],
						[29.9, 1.5],
						[27.1, 0.8],
						[22.1, 2]
					]
				}, {
					name: "SAMPLE B",
					data: [
						[36.4, 13.4],
						[1.7, 11],
						[5.4, 8],
						[9, 17],
						[1.9, 4],
						[3.6, 12.2],
						[1.9, 14.4],
						[1.9, 9],
						[1.9, 13.2],
						[1.4, 7],
						[6.4, 8.8],
						[3.6, 4.3],
						[1.6, 10],
						[9.9, 2],
						[7.1, 15],
						[1.4, 0],
						[3.6, 13.7],
						[1.9, 15.2],
						[6.4, 16.5],
						[0.9, 10],
						[4.5, 17.1],
						[10.9, 10],
						[0.1, 14.7],
						[9, 10],
						[12.7, 11.8],
						[2.1, 10],
						[2.5, 10],
						[27.1, 10],
						[2.9, 11.5],
						[7.1, 10.8],
						[2.1, 12]
					]
				}, {
					name: "SAMPLE C",
					data: [
						[21.7, 3],
						[23.6, 3.5],
						[24.6, 3],
						[29.9, 3],
						[21.7, 20],
						[23, 2],
						[10.9, 3],
						[28, 4],
						[27.1, 0.3],
						[16.4, 4],
						[13.6, 0],
						[19, 5],
						[22.4, 3],
						[24.5, 3],
						[32.6, 3],
						[27.1, 4],
						[29.6, 6],
						[31.6, 8],
						[21.6, 5],
						[20.9, 4],
						[22.4, 0],
						[32.6, 10.3],
						[29.7, 20.8],
						[24.5, 0.8],
						[21.4, 0],
						[21.7, 6.9],
						[28.6, 7.7],
						[15.4, 0],
						[18.1, 0],
						[33.4, 0],
						[16.4, 0]
					]
				}]
			},
			heatmapChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'heatmap',
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						colors: [this.context.color.componentBg],
						width: 2,
						dashArray: 0
					},
					colors: [this.context.color.blue],
					title: {
						text: 'HeatMap Chart (Single color)',
						style: this.globalOptions.title.style
					},
					legend: this.globalOptions.legend
				},
				series: [{
						name: 'Metric1',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric2',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric3',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric4',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric5',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric6',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric7',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric8',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					},
					{
						name: 'Metric9',
						data: generateHeatmapData(18, {
							min: 0,
							max: 90
						})
					}
				]
			},
			pieChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 365,
						type: 'pie',
					},
					stroke: {
						show: true,
						colors: [this.context.color.componentBg],
						width: 2,
						dashArray: 0
					},
					dataLabels: {
						dropShadow: {
							enabled: false,
							top: 1,
							left: 1,
							blur: 1,
							opacity: 0.45
						}
					},
					colors: [this.context.color.pink, this.context.color.orange, this.context.color.blue, this.context.color.success, this.context.color.indigo],
					labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
					title: {
						text: 'HeatMap Chart (Single color)',
						style: this.globalOptions.title.style
					},
					legend: this.globalOptions.legend
				},
				series: [44, 55, 13, 43, 22]
			},
			radialBarChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 350,
						type: 'radialBar',
					},
					title: this.globalOptions.title,
					plotOptions: {
						radialBar: {
							offsetY: -10,
							startAngle: 0,
							endAngle: 270,
							hollow: {
								margin: 5,
								size: '30%',
								background: 'transparent',
								image: undefined,
							},
							dataLabels: {
								name: {
									show: false,

								},
								value: {
									show: false,
								}
							}
						}
					},
					colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
					labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
					legend: {
						show: true,
						floating: true,
						position: 'left',
						offsetX: 140,
						offsetY: 15,
						labels: {
							useSeriesColors: true,
						},
						markers: {
							size: 0
						},
						formatter: function(seriesName, opts) {
							return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
						},
						itemMargin: {
							horizontal: 1,
						}
					}
				},
				series: [76, 67, 61, 90]
			},
			radarChart: {
				options: {
					grid: this.globalOptions.grid,
					chart: {
						height: 320,
						type: 'radar',
					},
					labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
					plotOptions: {
						radar: {
							size: 140,
							polygons: {
								strokeColor: 'rgba(' + this.context.color.componentColorRgb + ', .15)',
								fill: {
									colors: ['rgba(' + this.context.color.componentColorRgb + ', .05)', 'rgba(' + this.context.color.componentColorRgb + ', .15)']
								}
							}
						}
					},
					title: {
						text: 'Radar with Polygon Fill',
						style: this.globalOptions.title.style
					},
					colors: [this.context.color.blue],
					markers: {
						size: 4,
						colors: [this.context.color.componentBg],
						strokeColor: this.context.color.blue,
						strokeWidth: 2,
					},
					tooltip: {
						y: {
							formatter: function(val) {
								return val
							}
						}
					},
					yaxis: {
						tickAmount: 7,
						labels: {
							formatter: function(val, i) {
								if (i % 2 === 0) {
									return val
								} else {
									return ''
								}
							}
						}
					},
					legend: this.globalOptions.legend
				},
				series: [{
					name: 'Series 1',
					data: [20, 100, 40, 30, 50, 80, 33],
				}]
			}
		};
		
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/chart/apex">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/chart/apex">Chart</Link></li>
					<li className="breadcrumb-item active">Apex Chart</li>
				</ol>
				<h1 className="page-header">Apex Chart <small>header small text goes here...</small></h1>
				<div className="row">
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Line Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									JavaScript Line Charts are a typical pictorial representation that depicts trends and behaviors over time. It is represented by a series of data points connected with a line.
								</p>
								<Chart type="line" options={this.chart.lineChart.options} series={this.chart.lineChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  lineChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        type: \'line\',\n'+
'        height: 350,\n'+
'        shadow: {\n'+
'          enabled: true,\n'+
'          color: \'#2d353c\',\n'+
'          top: 18,\n'+
'          left: 7,\n'+
'          blur: 10,\n'+
'          opacity: 1\n'+
'        },\n'+
'        toolbar: { show: false }\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      name: \'High - 2020\',\n'+
'      data: [28, 29, 33, 36, 32, 32, 33]\n'+
'    }, {\n'+
'      name: \'Low - 2020\',\n'+
'      data: [12, 11, 14, 18, 17, 13, 13]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="line" options={this.chart.lineChart.options} series={this.chart.lineChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Column Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									A JavaScript Column Chart, just like other bar graphs uses vertical bars to display data and is used to compare values across categories.
								</p>
								<Chart type="bar" options={this.chart.columnChart.options} series={this.chart.columnChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  columnChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'bar\'\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      name: \'Net Profit\',\n'+
'      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]\n'+
'    }, {\n'+
'      name: \'Revenue\',\n'+
'      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]\n'+
'    }, {\n'+
'      name: \'Free Cash Flow\',\n'+
'      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="bar" options={this.chart.columnChart.options} series={this.chart.columnChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Area Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									With their mountain-like appearance, JavaScript Area Charts are used to represent quantitative variations.
								</p>
								<Chart type="area" options={this.chart.areaChart.options} series={this.chart.areaChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  areaChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'area\',\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      name: \'series1\',\n'+
'      data: [31, 40, 28, 51, 42, 109, 100]\n'+
'    }, {\n'+
'      name: \'series2\',\n'+
'      data: [11, 32, 45, 32, 34, 52, 41]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'<Chart type="area" options={this.chart.areaChart.options} series={this.chart.areaChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Bar Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									Unlike the Column chart, a JavaScript Bar Chart is oriented in a horizontal manner using rectangular bars. 
								</p>
								<Chart type="bar" options={this.chart.barChart.options} series={this.chart.barChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  barChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'bar\',\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      data: [44, 55, 41, 64, 22, 43, 21]\n'+
'      },{\n'+
'      data: [53, 32, 33, 52, 13, 44, 32]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'<Chart type="bar" options={this.chart.barChart.options} series={this.chart.barChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Mixed Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									A JavaScript Mixed Chart or a Combo Chart is a visualization that allows the combination of two or more distinct graphs. 
								</p>
								<Chart type="line" options={this.chart.mixedChart.options} series={this.chart.mixedChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  mixedChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'line\',\n'+
'        stacked: false\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      name: \'Income\',\n'+
'      type: \'column\',\n'+
'      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]\n'+
'    }, {\n'+
'      name: \'Cashflow\',\n'+
'      type: \'column\',\n'+
'      data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]\n'+
'    }, {\n'+
'      name: \'Revenue\',\n'+
'      type: \'line\',\n'+
'      data: [20, 29, 37, 36, 44, 45, 50, 58]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'<Chart type="line" options={this.chart.mixedChart.options} series={this.chart.mixedChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Candlestick Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									A candlestick chart (also called Japanese candlestick chart) is a style of financial chart used to describe price movements of a security, derivative, or currency. 
								</p>
								<Chart type="candlestick" options={this.chart.candlestickChart.options} series={this.chart.candlestickChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  candlestickChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'candlestick\'\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      data: [{\n'+
'        x: new Date(1538778600000),\n'+
'        y: [6629.81, 6650.5, 6623.04, 6633.33]\n'+
'      },\n'+
'      {\n'+
'        x: new Date(1538780400000),\n'+
'        y: [6632.01, 6643.59, 6620, 6630.11]\n'+
'      },\n'+
'      {\n'+
'        x: new Date(1538782200000),\n'+
'        y: [6630.71, 6648.95, 6623.34, 6635.65]\n'+
'      }]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="candlestick" options={this.chart.candlestickChart.options} series={this.chart.candlestickChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Bubble Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									JavaScript Bubble Charts are useful for showing data in a three-dimensional manner. In a bubble chart, data points are depicted with bubbles.
								</p>
								<Chart type="bubble" options={this.chart.bubbleChart.options} series={this.chart.bubbleChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'function generateBubbleChartData(baseval, count, yrange) {\n'+
'  var i = 0;\n'+
'  var series = [];\n'+
'  while (i < count) {\n'+
'    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;\n'+
'    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;\n'+
'    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;\n'+
'\n'+
'    series.push([x, y, z]);\n'+
'    baseval += 86400000;\n'+
'    i++;\n'+
'  }\n'+
'  return series;\n'+
'}\n'+
'\n'+
'this.state = {\n'+
'  bubbleChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'bubble\',\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'        name: \'Bubble1\',\n'+
'        data: generateBubbleChartData(new Date(\'11 Feb 2017 GMT\').getTime(), 20, {\n'+
'          min: 10,\n'+
'          max: 60\n'+
'        })\n'+
'      },\n'+
'      {\n'+
'        name: \'Bubble2\',\n'+
'        data: generateBubbleChartData(new Date(\'11 Feb 2017 GMT\').getTime(), 20, {\n'+
'          min: 10,\n'+
'          max: 60\n'+
'        })\n'+
'      }\n'+
'    ]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="bubble" options={this.chart.bubbleChart.options} series={this.chart.bubbleChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Scatter Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									For non-linearly related variables, JavaScript Scatter Charts are quite useful when there is a need to graphically establish a relationship between the variables.
								</p>
								<Chart type="scatter" options={this.chart.scatterChart.options} series={this.chart.scatterChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  scatterChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        type: \'scatter\',\n'+
'        height: 350,\n'+
'        zoom: {\n'+
'          enabled: true,\n'+
'          type: \'xy\'\n'+
'        }\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      name: "SAMPLE A",\n'+
'      data: [\n'+
'        [16.4, 5.4],\n'+
'        [21.7, 2],\n'+
'        [25.4, 3]\n'+
'      ]\n'+
'    }, {\n'+
'      name: "SAMPLE B",\n'+
'      data: [\n'+
'        [36.4, 13.4],\n'+
'        [1.7, 11],\n'+
'        [5.4, 8]\n'+
'      ]\n'+
'    }, {\n'+
'      name: "SAMPLE C",\n'+
'      data: [\n'+
'        [21.7, 3],\n'+
'        [23.6, 3.5],\n'+
'        [24.6, 3]\n'+
'      ]\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'<Chart type="scatter" options={this.chart.scatterChart.options} series={this.chart.scatterChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Heatmap Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									A heat map is a two-dimensional representation of data in which values are represented by colors.
								</p>
								<Chart type="heatmap" options={this.chart.heatmapChart.options} series={this.chart.heatmapChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'function generateHeatmapData(count, yrange) {\n'+
'  var i = 0;\n'+
'  var series = [];\n'+
'  while (i < count) {\n'+
'    var x = \'w\' + (i + 1).toString();\n'+
'    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;\n'+
'\n'+
'    series.push({ x: x, y: y  });\n'+
'    i++;\n'+
'  }\n'+
'  return series;\n'+
'}\n'+
'\n'+
'this.state = {\n'+
'  heatmapChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'heatmap\',\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'        name: \'Metric1\',\n'+
'        data: generateHeatmapData(18, {\n'+
'          min: 0,\n'+
'          max: 90\n'+
'        })\n'+
'      }\n'+
'    ]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="heatmap" options={this.chart.heatmapChart.options} series={this.chart.heatmapChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Pie Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									A pie chart (or a circle chart) is a circular statistical graphic, which is divided into slices to illustrate numerical proportion. 
								</p>
								<Chart type="pie" options={this.chart.pieChart.options} series={this.chart.pieChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  pieChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 365,\n'+
'        type: \'pie\',\n'+
'      },\n'+
'      dataLabels: {\n'+
'        dropShadow: {\n'+
'          enabled: false,\n'+
'          top: 1,\n'+
'          left: 1,\n'+
'          blur: 1,\n'+
'          opacity: 0.45\n'+
'        }\n'+
'      },\n'+
'      colors: [\'#fb5597\', \'#f59c1a\', \'#348fe2\', \'#00acac\', \'#8753de\'],\n'+
'      labels: [\'Team A\', \'Team B\', \'Team C\', \'Team D\', \'Team E\'],\n'+
'      title: {\n'+
'        text: \'HeatMap Chart (Single color)\'\n'+
'      }\n'+
'    },\n'+
'    series: [44, 55, 13, 43, 22]\n'+
'  }\n'+
'};\n'+
'\n'+
'<Chart type="pie" options={this.chart.pieChart.options} series={this.chart.pieChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Radial Bar Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									Radial Bar Charts are valuable in showing comparisons between categories by using circularly shaped bars.
								</p>
								<Chart type="radialBar" options={this.chart.radialBarChart.options} series={this.chart.radialBarChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  radialBarChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 350,\n'+
'        type: \'radialBar\',\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [76, 67, 61, 90]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="radialBar" options={this.chart.radialBarChart.options} series={this.chart.radialBarChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Radar Chart</PanelHeader>
							<PanelBody className="p-0">
								<p className="mb-0 p-3">
									Radar chart is a graphical method of displaying two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.
								</p>
								<Chart type="radar" options={this.chart.radarChart.options} series={this.chart.radarChart.series} />
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Chart from \'react-apexcharts\';\n'+
'\n'+
'this.state = {\n'+
'  radarChart: {\n'+
'    options: {\n'+
'      chart: {\n'+
'        height: 320,\n'+
'        type: \'radar\',\n'+
'      },\n'+
'      ...\n'+
'    },\n'+
'    series: [{\n'+
'      name: \'Series 1\',\n'+
'      data: [20, 100, 40, 30, 50, 80, 33],\n'+
'    }]\n'+
'  }\n'+
'}\n'+
'\n'+
'<Chart type="radar" options={this.chart.radarChart.options} series={this.chart.radarChart.series} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
				</div>
			</div>
		)
	}
}

export default ChartApex;