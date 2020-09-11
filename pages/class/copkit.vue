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
				<view class="title">{{item.name}}</view>
				<view class="number">{{item.num}}</view>
			</view>
		</scroll-view>
		
		
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">“十二五”以来，每百名专任教师出版国家级规划教材的数(同类学院)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineA" canvas-id="canvaLineA" id="canvaLineA" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">“十二五”以来，每百名专任教师公开出版的校企合作开发教材数(同类学院)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineB" canvas-id="canvaLineB" id="canvaLineB" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">当年校企合作开发课程数(同类学院)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineC" canvas-id="canvaLineC" id="canvaLineC" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">近五年获批省级以上精品课程数(同类学院)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineD" canvas-id="canvaLineD" id="canvaLineD" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		
		
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">“十二五”以来，每百名专任教师公开出版的校企合作开发教材数(各系部)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineE" canvas-id="canvaLineE" id="canvaLineE" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">“十二五”以来，每百名专任教师出版国家级规划教材的数(各系部)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineF" canvas-id="canvaLineF" id="canvaLineF" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">近五年获批省级以上精品课程数(各系部)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineG" canvas-id="canvaLineG" id="canvaLineG" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">校企合作课程数(各系部)</view>
		</view>
		<view class="qiun-charts major">
			<canvas @touchstart="touchLineH" canvas-id="canvaLineH" id="canvaLineH" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>

		
	</view>
</template>

<script>
	import uCharts from '../../components/echarts/echarts.js';
	var canvaLineA=null;
	var canvaLineB=null;
	var canvaLineC=null;
	var canvaLineD=null;
	var canvaLineE=null;
	var canvaLineF=null;
	var canvaLineG=null;
	var canvaLineH=null;
	
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
				listData: [
					{
						name: '“十二五”以来，每百名专任教师公开出版的校企合作开发教材数',
						num: 61
					},
					{
						name: '“十二五”以来，每百名专任教师出版国家级规划教材的数',
						num: 54
					},
					{
						name: '近五年获批省级以上精品课程数',
						num: 75
					},
					{
						name: '当年校企合作开发课程数',
						num: 324
					},
					{
						name: '校企合作共同开发课程门数占开设课程总门数比例',
						num: 482
					}
				],
				colorArr: ['rgb(89, 135, 206)', 'rgb(235, 172, 80)', 'rgb(245, 118, 118)'],
				chartDataA: {
					categories: ['辽宁城建', '辽农职院', '辽宁医药', '辽宁铁道', '辽宁林业', '沈职院', '渤海船舶','辽宁石化', '辽宁交专','辽宁机电', '辽宁建筑'],
					series: [{
						name: '2017-2018',
						data: [35, 20, 25, 37, 4, 20, 15,22,11,32, 13],
						color: 'rgb(89, 135, 206)'
					}, {
						name: '2018-2019',
						data: [13, 25, 12, 4, 6, 71,24, 17 , 29,25, 23],
						color: 'rgb(235, 172, 80)'
					}, {
						name: '2019-2020',
						data: [15, 30, 45, 57, 14, 15, 25,32, 41,52, 63],
						color: 'rgb(245, 118, 118)'
					}]
				},
				
				chartDataB: {
					categories: ['基础教学部', '思想政治教学部', '建筑工程系', '建筑设备系', '建筑与环境系', '市政工程系', '房产与工程管理系'],
					series: [{
						name: '2017-2018',
						data: [35, 20, 25, 37, 4, 20, 15,22,11,32, 13],
						color: 'rgb(89, 135, 206)'
					}, {
						name: '2018-2019',
						data: [13, 25, 12, 4, 6, 71,24, 17 , 29,25, 23],
						color: 'rgb(235, 172, 80)'
					}, {
						name: '2019-2020',
						data: [15, 30, 45, 57, 14, 15, 25,32, 41,52, 63],
						color: 'rgb(245, 118, 118)'
					}]
				}
			}
		},
		mounted() {
			let _this = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_this.pixelRatio =res.pixelRatio;
						_this.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			
			this.showLineA('canvaLineA', this.chartDataA);
			this.showLineB('canvaLineB', this.chartDataA);
			this.showLineC('canvaLineC', this.chartDataA);
			this.showLineD('canvaLineD', this.chartDataA);
			
			
			this.showLineE('canvaLineE', this.chartDataB);
			this.showLineF('canvaLineF', this.chartDataB);
			this.showLineG('canvaLineG', this.chartDataB);
			this.showLineH('canvaLineH', this.chartDataB);
			
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
			
			showLineA(canvasId,chartData){
				let _self = this;
				canvaLineA = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineB(canvasId,chartData){
				let _self = this;
				canvaLineB = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineC(canvasId,chartData){
				let _self = this;
				canvaLineC = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineD(canvasId,chartData){
				let _self = this;
				canvaLineD = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineE(canvasId,chartData){
				let _self = this;
				canvaLineE = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineF(canvasId,chartData){
				let _self = this;
				canvaLineF = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineG(canvasId,chartData){
				let _self = this;
				canvaLineG = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			showLineH(canvasId,chartData){
				let _self = this;
				canvaLineH = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:true,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel: true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			
			touchLineA(e) {
				console.log(e)
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineB(e) {
				canvaLineB.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineC(e) {
				canvaLineC.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineD(e) {
				canvaLineD.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineE(e) {
				canvaLineE.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineF(e) {
				canvaLineF.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineG(e) {
				canvaLineG.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineH(e) {
				canvaLineH.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
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
		width: 300upx;
		margin-bottom: 20upx;
		overflow: hidden;
		padding: 10upx 5upx;
		height: 150upx;
		text-align: center;
		border: 0;
		line-height: 30upx!important;
		border-radius: 10upx;
		border-bottom: none!important;
		position: relative;
		color: #fff;
		.title {
			font-size: 26upx;
			height: 100upx;
			overflow: hidden;
			text-align: center;
			white-space: pre-wrap;
			word-break:break-all;
		}
		.number {
			font-size: 38upx;
		}
	}
	.major {
		margin-top: 30upx;
	}
	.marginT20 {
		margin-top: 20upx;
	}
</style>
