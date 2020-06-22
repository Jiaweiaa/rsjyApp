<template>
	<view class="distractionPage">
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-blue" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-blue"></view>
		</view>
		
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">学校概况</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss" v-for="(item,index) in schoolData" :key="index" :data-id="index">
				<view class="title">{{item.name}}</view>
				<view class="number">{{item.num}}</view>
			</view>
		</scroll-view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">专业概况</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss bg88d8d5" v-for="(item,index) in systemData" :key="index" :data-id="index">
					<view class="title">{{item.name}}</view>
					<view class="number">{{item.num}}个</view>
			</view>
		</scroll-view>
		<view class="qiun-charts major">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="mapChart">
			<view class="qiun-title-bar qiun-common-mt" >
				<view class="qiun-title-dot-light">学生总数: {{serverData.cnStuNum}}</view>
			</view>
			<view class="qiun-charts" style="background: none;">
				<canvas canvas-id="canvasMap" id="canvasMap" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchMap"></canvas>
			</view>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">教师概况</view>
		</view>
		<view class="qiun-charts major">
			<canvas canvas-id="canvasColumnTeacher" id="canvasColumnTeacher" class="charts" :style="{'width':cWidth*pixelRatio - 20+'px','height':cHeight*pixelRatio - 20+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">课程概况</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss bg88d8d5 teacherStyle" v-for="(item,index) in teacherData" :key="index" :data-id="index">
					<view class="title">{{item.name}}</view>
					<view class="number">{{item.num}}门</view>
			</view>
		</scroll-view>
		<canvas canvas-id="canvasPieA" id="canvasPieA" class="charts" @touchstart="touchPieA"></canvas>
		<canvas canvas-id="canvasPieB" id="canvasPieB" class="charts" @touchstart="touchPieB"></canvas>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt marginT20" >
			<view class="qiun-title-dot-light">数据预警</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss bg88d8d5 warnChild" v-for="(item,index) in dataWarn" :key="index" :data-id="index">
					<view class="title">{{item.name}}</view>
					<view class="number">{{item.num}}个</view>
			</view>
		</scroll-view>
		<view class="cu-list" style="padding: 0 20upx; margin-top: 20upx;">
			<view class="cu-item" style="margin-bottom: 10upx;">
				<view class="content">
					<view class="text-grey">
						<view class="text-cut" style="color: #385ADB;">2019-11-22 刘文斌</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
						201902班计算机编程课程连续三次考试合格率低于80%				
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item" style="margin-bottom: 10upx;">
				<view class="content">
					<view class="text-grey">
						<view class="text-cut" style="color: #385ADB;">2019-11-22 刘文斌</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
						201902班计算机编程课程连续三次考试合格率低于80%				
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item" style="margin-bottom: 10upx;">
				<view class="content">
					<view class="text-grey">
						<view class="text-cut" style="color: #385ADB;">2019-11-22 刘文斌</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
						201902班计算机编程课程连续三次考试合格率低于80%				
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
				schoolData: [
					{
						name: '机构设置数',
						num: 0
					},
					{
						name: '教学科研仪器设备总值',
						num: 0
					},
					{
						name: '学院生师比（国家平台）',
						num: 0
					},
					{
						name: '毕业生人数',
						num: 0
					},
					{
						name: '校内实践基地',
						num: 0
					}
				],
				systemData: [
					{
						name: '总专业',
						num: 0
					},
					{
						name: '国家重点专业',
						num: 0
					},
					{
						name: '省重点专业',
						num: 0
					}
				],
				teacherData: [
					{
						name: '课程总数',
						num: 0
					},
					{
						name: '精品课程总数',
						num: 0
					}
				],
				dataWarn: [
					{
						name: '优秀项',
						num: 0
					},
					{
						name: '达标项',
						num: 0
					},
					{
						name: '预警项',
						num: 0
					}
				],
				colorArr: ['#37CEAF', '#40B0E6', '#EAB4A7', '#305CD8']
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
			this.getServerData();
		},
		methods: {
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
			
			// 数据总览
			async getData(){
				try {
					const url = this.address.analysis + this.api.analysis.findAll;
					this.LoadProgress();
					let	result = await this.request.post(url, {});
					this.LoadProgress(true);
					this.serverData = Object.assign({}, result.data);
					// 专业
					this.$set(this.systemData[0], 'num',  this.serverData.majorTotalNum)
					this.$set(this.systemData[1], 'num',  this.serverData.majorStateKeyNum)
					this.$set(this.systemData[2], 'num',  this.serverData.majorProvinceKeyNum)
					// 学校
					this.$set(this.schoolData[0], 'num',  this.serverData.orgNum)
					this.$set(this.schoolData[1], 'num',  this.serverData.eduEquipMoney)
					this.$set(this.schoolData[2], 'num',  this.serverData.stuTeaPercent)
					this.$set(this.schoolData[3], 'num',  this.serverData.graduateNum)
					this.$set(this.schoolData[4], 'num',  this.serverData.practiceBaseNum)	
					this.serverData.majorSituationChart.series.forEach((v, index) => {
						v.color = this.colorArr[index]
					})
						
					this.showColumn('canvasColumn', this.serverData.majorSituationChart);

					this.serverData.teaSituationChart.series = [
						{
							name: '专业人数',
							color: this.colorArr[0],
							data: this.serverData.teaSituationChart.seriesData
						}
					];

					this.showColumn('canvasColumnTeacher', this.serverData.teaSituationChart);
					// 教师
					this.$set(this.teacherData[0], 'num',  this.serverData.allClassNum)
					this.$set(this.teacherData[1], 'num',  this.serverData.classicClassNum)
					let pieA = [];
					this.serverData.classPropertyChart.legendData.forEach((v, index) => {
						pieA.push({
							name: v,
							color: this.colorArr[index],
							data: Number(this.serverData.classPropertyChart.seriesData[index].value)
						})
					})
					let pieB = [];
					this.serverData.classTypeChart.legendData.forEach((v, index) => {
						pieB.push({
							name: v,
							color: this.colorArr[index],
							data: Number(this.serverData.classTypeChart.seriesData[index].value)
						})
					})
					this.showPie('canvasPieA', pieA);
					this.showPie('canvasPieB', pieB);
					
					// 数据预警
					this.$set(this.dataWarn[0], 'num',  this.serverData.perfectIndexNum)
					this.$set(this.dataWarn[1], 'num',  this.serverData.standardIndexNum)
					this.$set(this.dataWarn[3], 'num',  this.serverData.warnIndexNum)
				} catch (err) {
					
				}
			},
			
			getServerData(){
				let _self = this;
				// 假地图
				uni.request({
					url: 'https://www.ucharts.cn/map.json',
					success: function(res) {
						let mapData = res.data.features;
						
						for(let i of mapData) {
							i.data = '123'
						}
						
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						_self.showMap("canvasMap",mapData);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
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
			// 地图
			showMap(canvasId,chartData){
				let _self = this;
				canvaMap=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'map',
					fontSize:11,
					padding:[0,0,0,0],
					legend:{
						show:false
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData,
					dataLabel:true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						map: {
							border:true,
							borderWidth:1,
							borderColor:'#666666',
							fillOpacity:0.6
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
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData,
					animation: true,
					width: _self.cWidth,
					height: _self.cHeight,
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
			touchPieA(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
				canvaPie.touchLegend(e,{animation:true});
			},
			
			touchPieB(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
				canvaPie.touchLegend(e,{animation:true});
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

	/* 通用样式 */
	.qiun-charts{
		width: 750upx; 
		height:500upx;
		background-color: #FFFFFF;
	}
	.charts{
		width: 750upx; 
		height:500upx;
		background-color: #FFFFFF;
	}
	
	/* 概况 */
	.nav {
		margin-top: 10upx;
	}
	.overviewCss:first-child {
		background: #A2B9E7;
		margin-left: 20upx;
	}
	.overviewCss {
		width: 220upx;
		margin-bottom: 20upx;
		height: 120upx!important;
		background: red;
		padding: 10upx 5upx;
		text-align: center;
		border: 0;
		line-height: 30upx!important;
		border-radius: 10upx;
		border-bottom: none!important;
		background: #C8D8FA;
		.title {
			margin-top: 15upx;
			margin-bottom: 10upx;
			height: 50upx;
			line-height: 25upx;
			font-size: 24upx;
			width: 180upx;
			white-space: pre-wrap;
			text-align: center;
		}
	}
	.major {
		margin-top: 30upx;
	}
	
	.mapChart {
		background: #EEF1FE;
	}
	
	
	.bg88d8d5 {
		background: #9FE6E3;
		.title {
			width: 100%;
			text-align: center;
		}
	}
	.bg88d8d5:first-child {
		background: #88D8D5;
		margin-left: 20upx;
	}
	.marginT20 {
		margin-top: 20upx;
	}
	
	.teacherStyle {
		width: 45%;
		background: #DCCAF3;
	}
	.teacherStyle:first-child {
		background: #B89DDA;
		margin-left: 20upx;
	}
	.warnChild:first-child {
		background: #37CEAF;
		margin-left: 20upx;
		color: #fff;
	}
	.warnChild:nth-child(2) {
		background: #40B0E6;
		margin-left: 20upx;
		color: #fff;
	}
	.warnChild:nth-child(3) {
		background: #EAB4A7;
		margin-left: 20upx;
		color: #fff;
	}
</style>
