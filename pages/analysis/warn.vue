<template>
	<view class="distractionPage">
		<!--
			loading
		-->
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-blue" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-blue"></view>
		</view>
		<!--
			顶部预警
		-->
		<scroll-view scroll-x class="bg-white nav" style="margin-top: 40upx;;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss" v-for="(item,index) in listData" :key="index" :data-id="index">
				<view class="imageWarp" :style="{background: `url(${item.imgUrl})`}"></view>
				<view class="title">{{item.name}}</view>
				<view class="number">{{item.num}}</view>
			</view>
		</scroll-view>
		
		<!-- 
			饼图
		-->
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item pieBlock" v-for="(item,index) in pieData" :key="index" :data-id="index">
				<view class="header">
					<view class="headerName">{{item.name}}</view>
				</view>
				<canvas :canvas-id="item.pieId" :id="item.pieId" class="charts"></canvas>
			</view>
		</scroll-view>
	
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">各部门预警情况</view>
		</view>
		<view class="qiun-charts major">
			<canvas canvas-id="canvasColumnWarn" id="canvasColumnWarn" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		
		<view class="cu-list" style="padding: 0 20upx; margin-top: 20upx;">
			<view class="cu-item" style="margin-bottom: 10upx;" :key="index" v-for="(item, index) in pageData">
				<view class="content">
					<view class="text-grey">
						<view class="text-cut" style="color: #385ADB;">
						{{item.department}}-{{item.userName}},{{item.warnAlarmDate}}
						<view style="float: right; color: #999999; display: inline-block;">
							{{item.detailValues}}
						</view>
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
						{{item.warnAlarmDesc}}				
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/echarts/echarts.js';
	var _self;
	var canvaColumn = null;
	var canvaMap = null;
	var canvaPie = null;
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				loadProgress: 0,
				isLoading: true,
				
				TabCur: 0,
				scrollLeft: 0,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:{},
				listData: [
					{
						name: '总体得分',
						num: 0,
						imgUrl: '/static/images/warning1.png'
					},
					{
						name: '指标总数',
						num: 0,
						imgUrl: '/static/images/warning2.png'
					},
					{
						name: '达标数',
						num: 0,
						imgUrl: '/static/images/warning3.png'
					},
					{
						name: '预警数',
						num: 0,
						imgUrl: '/static/images/warning4.png'
					},
					{
						name: '告警数',
						num: 0,
						imgUrl: '/static/images/warning5.png'
					}
				],
				colorArr: ['rgb(89, 135, 206)', 'rgb(235, 172, 80)', 'rgb(245, 118, 118)'],
				
				pieData: [
					{
						name: '院校预警',
						pieId: 'pieA'
					},
					{
						name: '教师预警',
						pieId: 'pieB'
					},
					{
						name: '学生预警',
						pieId: 'pieC'
					},
					{
						name: '专业预警',
						pieId: 'pieD'
					},
					{
						name: '课程预警',
						pieId: 'pieE'
					}
				],
				pageData: []
			}
		},

		mounted() {
			let _self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getData();
			this.getList();
		},
		methods: {
			// 进度条
			LoadProgress(e) {
				if(e) {
					this.loadProgress = 0;
					this.isLoading = false;
				}else {
					let interval = setInterval(() => {
						this.loadProgress = this.loadProgress + 5;
					}, 100)
					if(this.loadProgress > 100) {
						clearInterval(interval);
						this.loadProgress = 0;
					} 
				}
			},
			
			// 底部预警数据
			async getList() {
				const url = this.address.analysis + this.api.analysis.warnAlarmList;
				let result = await this.request.post(url, {
					pageNum: 1,
					pageSize: 999
				});
				this.pageData = Object.assign({}, result.data);
				console.log(this.pageData);
			},
			
			// 数据总览
			async getData(){
				const url = this.address.analysis + this.api.analysis.warnAnalysisDetail;
				this.LoadProgress();
				let	result = await this.request.post(url, {});
				this.LoadProgress(true)
				this.serverData = Object.assign({}, result.data);
		
				// 预警数据
				this.$set(this.listData[0], 'num',  this.serverData.totalScore)
				this.$set(this.listData[1], 'num',  this.serverData.indexTotalNum)
				this.$set(this.listData[2], 'num',  this.serverData.standardNum)
				this.$set(this.listData[3], 'num',  this.serverData.warnNum)
				this.$set(this.listData[4], 'num',  this.serverData.alarmNum)
				
				// 饼图
				let pieA = [];
				this.serverData.collegeWarnChart.legendData.forEach((v, index) => {
					pieA.push({
						name: v,
						color: this.colorArr[index],
						data: Number(this.serverData.collegeWarnChart.seriesData[index].value)
					})
				})
				let pieB = [];
				this.serverData.teacherWarnChart.legendData.forEach((v, index) => {
					pieB.push({
						name: v,
						color: this.colorArr[index],
						data: Number(this.serverData.teacherWarnChart.seriesData[index].value)
					})
				})
				let pieC = [];
				this.serverData.studentWarnChart.legendData.forEach((v, index) => {
					pieC.push({
						name: v,
						color: this.colorArr[index],
						data: Number(this.serverData.studentWarnChart.seriesData[index].value)
					})
				})
				let pieD = [];
				this.serverData.majorWarnChart.legendData.forEach((v, index) => {
					pieD.push({
						name: v,
						color: this.colorArr[index],
						data: Number(this.serverData.majorWarnChart.seriesData[index].value)
					})
				})
				let pieE = [];
				this.serverData.classWarnChart.legendData.forEach((v, index) => {
					pieE.push({
						name: v,
						color: this.colorArr[index],
						data: Number(this.serverData.classWarnChart.seriesData[index].value)
					})
				})
				this.showPie(this.pieData[0].pieId, pieA);
				this.showPie(this.pieData[1].pieId, pieB);
				this.showPie(this.pieData[2].pieId, pieC);
				this.showPie(this.pieData[3].pieId, pieD);
				this.showPie(this.pieData[4].pieId, pieE);
				
				this.serverData.departmentWarnChart.series.forEach((v, index) => {
					v.color = this.colorArr[index]
				})
				// 柱状图
				this.showColumn('canvasColumnWarn', this.serverData.departmentWarnChart);
			},
			
			// 柱状图
			showColumn(canvasId,chartData){
				let _self = this;
				canvaColumn=new uCharts({	
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:true,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.axisData,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
						rotateLabel: true
					},
					yAxis: {
						 type: 'category'
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio - 20,
					height: _self.cHeight*_self.pixelRatio - 20,
					extra: {
						column: {
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.axisData.length
						}
					}
				});
			},

			touchMap(e){
				canvaMap.showToolTip(e, {
					format: function (item) {
						let str = `${item.properties.name}:${item.data}`
						return str
					}
				});
			},
			// 饼状图
			showPie(canvasId,chartData){
				let _self = this;
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					background:'#FFFFFF',
					pixelRatio: 1,
					series: chartData,
					animation: true,
					width: 180,
					height: 180,
					dataLabel: true,
					extra: {
						pie: {
							border:true,
							borderColor:'#FFFFFF',
							borderWidth:3
						}
					},
				});
			},

			
			changeData(){
				canvaColumn.updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.distractionPage {
		overflow: hidden;
		background: #fff;
	}
	.qiun-columns{
		display:flex; 
		flex-direction:column !important;
	}
	.qiun-common-mt{
		margin-top:10upx;
	}
	.qiun-bg-white{
		background:#FFFFFF;
	}
	.qiun-title-bar{
		width:96%; 
		padding:10upx 2%; 
		flex-wrap:nowrap;
	}
	.qiun-title-dot-light{
		border-left: 10upx solid #385ADB; 
		padding-left: 10upx; 
		font-size: 26upx;
		color: #000
	}
	/* 通用样式 */
	.qiun-charts{
		width: 750upx; 
		height:500upx;
		background-color: #FFFFFF;
	}

	
	/* 概况 */
	.nav {
		margin-top: 10upx;
	}
	.overviewCss:first-child {
		background: #826FC9;
		margin-left: 20upx;
	}
	.overviewCss:nth-child(2) {
		background: #5887CD;
		margin-left: 20upx;
	}
	.overviewCss:nth-child(3) {
		background: #7DC559;
		margin-left: 20upx;
	}
	.overviewCss:nth-child(4) {
		background: #EBAD50;
		margin-left: 20upx;
	}
	.overviewCss:nth-child(5) {
		background: rgb(245, 118, 118);
		margin-left: 20upx;
	}
	.overviewCss {
		width: 220upx;
		margin-bottom: 20upx;
		height: 100upx!important;
		background: red;
		padding: 10upx 5upx;
		text-align: center;
		border: 0;
		line-height: 30upx!important;
		border-radius: 10upx;
		border-bottom: none!important;
		position: relative;
		color: #fff;
		.imageWarp {
			width: 48upx;
			height: 48upx;
			background-position: center!important;
			background-size: 100% 100% !important;
			position: absolute;
			top: 26upx;
			left: 19upx;
		}
		.title {
			font-size: 26upx;
			position: absolute;
			left: 86upx;
			top: 54upx;
		}
		.number {
			font-size: 38upx;
			position: absolute;
			left: 86upx;
			top: 21upx;
		}
	}
	.major {
		margin-top: 30upx;
	}
	
	/* 饼图样式 */
	.pieBlock {
		width: 305upx;
		height: 400upx;
		position: relative;
		border:1px solid rgba(234,234,234,1);
		box-shadow:0px 3px 5px 0px rgba(0, 0, 0, 0.2);
		.header {
			width: 100%;
			height: 60upx;
			border-bottom: 1px solid #EBF0F6;
		}
		.headerName {
			margin-top: 10upx;
			height: 40upx;
			line-height: 40upx;
			padding-left: 10upx;
			font-size: 28upx;
			border-left: 8upx solid #385ADB;
		}
		.charts{		
			width: 305upx;
			height: 380upx;
			position: absolute;
			left: -10upx;
		}
	}
	
	.marginT20 {
		margin-top: 20upx;
	}
</style>
