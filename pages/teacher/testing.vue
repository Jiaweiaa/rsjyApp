<template>
	<view class="testing">
		<!--
			loading
		-->
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-teacher" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-teacher"></view>
		</view>
		
		<!--
			自我检测
		-->
		<scroll-view scroll-x class="bg-student nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss"  v-for="(item,index) in studentTopData" :key="index" :data-id="index">
				<image v-show="index == 0" class="image" src="/static/images/testing.png"></image>
				<view class="title">
					{{item.name}}
				</view>
				<view class="number" :class="{'classTop': index == 2 && item.num > 0, 'classEnd': index ==2 && item.num < 0}">{{index > 0 ?  `${item.num}分` : `(${item.num})`}}</view>
			</view>
		</scroll-view>
	
		<!--
			分列数据
		-->
		<scroll-view scroll-x class="bg-student nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewNavCss"  v-for="(item,index) in studentData" :key="index" :data-id="index">
				<view class="title">
					{{item.name}}
				</view>
				<view :class="{'classTop': index == 1 && item.num > 0, 'classEnd': index ==1 && item.num < 0}" class="number">{{ item.num }}名</view>
			</view>
		</scroll-view>
		
		
		<view class="bg-student twoBlock">
			<view class="topEndNav">
				本学期预警数量
				<view class="classEnd inlineBlock">{{warnNum}}个</view>
			</view>
			<view  class="topEndNav">
				当前出勤率
				<view class="color8DC153 inlineBlock">{{outPre}}%</view>
			</view>
		</view>
		
		<!--
			一级指标的各维度统计表
		-->
		<view class="tableContent">
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-teacher-light leftBlock margin20">一级指标的各维度统计表</view>
			</view>
			<view class="testTable" style="border-bottom: none;">
				<view class="viewTitle" v-for="(item, index) in testTable" :key="index">
					{{item.name}}
				</view>
			</view>
			<view class="testTable backFFF" :key="index" v-for="(item, index) in testTableData">
				<view class="viewTitle">
					{{item.targetName}}
				</view>
				<view class="viewTitle">
					{{item.score}}
				</view>
				<view class="viewTitle">
					{{item.compareLastSemesterScore}}
				</view>
				<view class="viewTitle">
					{{item.departmentRank}}
				</view>
				<view class="viewTitle">
					{{item.schoolRank}}
				</view>
			</view>	
		</view>
	
	
		<!--
			本学期各维度统计雷达图
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-teacher-light leftBlock margin20">本学期各维度统计雷达图</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasTestRadar" id="canvasTestRadar" class="charts"></canvas>
		</view>
		
		<!--
			各学期发展趋势图
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-teacher-light leftBlock margin20">各学期发展趋势图</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasTestLint" id="canvasTestLint" class="charts"  @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>
<script>
	import uCharts from '../../components/echarts/echarts.js';
	var canvaRadar=null;
	var canvaLineA=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				
				CustomBar: this.CustomBar,
				loadProgress: 0,
				isLoading: true,
				scrollLeft: 0,
				colorArray: ['#2EC7C9', '#B6A2DE', '#5AB1EF', '#FFB980', '#D87A80', '#8D98B3'],
				studentTopData: [
					{
						name: '教师自我检测',
						num: '0'
					},
					{
						name: '当前得分',
						num: '0'
					},
					{
						name: '整体得分较上学期',
						num: '0'
					}
				],
				studentData: [
					{
						name: '总分数的系排名',
						num: '0'
					},
					{
						name: '系排名较上学期',
						num: '0'
					},
					{
						name: '总分数在全院排名',
						num: '0'
					}
				],
				
				testTable: [
					{
						name: '维度名称'
					},
					{
						name: '得分'
					},
					{
						name: '与上学期得分比较'
					},
					{
						name: '本系排名'
					},
					{
						name: '本院排名'
					}
				],
				testTableData: [],
				
				warnNum: '',
				outPre: ''
			}
		},
		mounted() {
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getSelfTest();
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
			
			// 获取数据
			async getSelfTest() {
				this.LoadProgress();
				const url = this.address.teacher + this.api.teacher.getSelfTest;
				let	result = await this.request.post(url, {});
				this.LoadProgress(true);
				
				this.warnNum = result.data.warningNumber;
				this.outPre = result.data.attendanceRate;
				
				this.studentTopData =  [
					{
						name: '教师自我检测',
						num: result.data.semesterStr
					},
					{
						name: '当前得分',
						num: result.data.nowScore
					},
					{
						name: '整体得分较上学期',
						num: result.data.compareLastSemesterScore
					}
				];
				this.studentData = [
					{
						name: '总分数的系排名',
						num: result.data.departmentRank
					},
					{
						name: '系排名较上学期',
						num: result.data.departmentRankCompareLastSemester
					},
					{
						name: '总分数在全院排名',
						num: result.data.schoolRank
					}
				]
				this.testTableData = result.data.targetStatistical;
				// 雷达图
				let nameArr = result.data.radarMapDimension.map(v => { return v.name });
				let radarData = {
					categories: nameArr,
					series: [{
						name: '个人',
						color: this.colorArray[0],
						data: result.data.radarMapStatistics
					}]
				};
				this.showRadar("canvasTestRadar", radarData);
					
				// 线形图
				let chartData = {
					categories: result.data.lineChartSemesterList,
					series: []
				}
				result.data.lineChartStatistics.forEach((i, index) => {
					chartData.series.push({
						name: i.name,
						color: this.colorArray[index],
						data: i.scoreList
					})
				})
				this.showLineA("canvasTestLint", chartData);
			},
			
			// 雷达图
			showRadar(canvasId,chartData){
				let _self = this;
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						// radar: {
						// 	max: 100//雷达数值的最大值
						// }
					}
				});
			},
			// 线形图
			showLineA(canvasId,chartData){
				let _self = this;
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
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
						rotateLabel: true,
						dashLength:8
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
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
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.title {
		width: 100%;
	}
	
	.testing {
		.margin20 {
			margin: 30upx 0 20upx;
		}
		.tableContent {
			background: #fff;
			.testTable {
				border: 1px solid #DDD;
				display: flex;
				width: 96%;
				margin: 0 auto;
				background: #F5F6F8;
				.viewTitle {
					font-size: 24upx;
					text-align: center;
					flex: 1;
					display: flex;
					border-right: 1px solid #DDD;
					height: 80upx;
					align-items: center;
					justify-content: center;
				}
				.viewTitle:nth-child(1) {
					flex: 1.5;
				}
				.viewTitle:nth-child(3) {
					flex: 1.5;
				}
				.viewTitle:nth-child(5) {
					flex: 1.5;
				}
				.viewTitle:last-child {
					border-right: none;
				}
			}
		}
		.inlineBlock {
			display: inline-block;
			margin-left: 10upx;
			font-size: 32upx;
		}
		.classTop {
			color: #8DC153!important;
		}
		.classEnd {
			color: #ED5564 !important;
		}
		.color8DC153 {
			color: #8DC153 !important;
		}
		.backFFF {
			border-top: none;
			background: #fff!important;
		}
		.image {
			width: 59upx;
			height: 64upx;
			position: absolute;
			left: 12upx;
			top: 22upx;
		}
		.overviewCss {
			height: 120upx;
			overflow: hidden;
			border-radius: 15upx;
			background: #fff;
			padding: 0 20upx;
			margin: 20upx 10upx;
			width: auto;
			position: relative;
		}
		.overviewCss {
			.title {
				font-size: 24upx;
				height: 60upx;
				line-height: 80upx;
				text-align: center;
				width: 100%;
				text-align: center;
			}
			.number {
				height: 60upx;
				width: 100%;
				line-height: 40upx;
				text-align: center;
				font-size: 32upx;
				color: #5D9CEC;
			}
			.classTop {
				color: #8DC153;
			}
			.classEnd {
				color: #ED5564;
			}
		}
		.overviewCss:first-child {
			background: none;
			width: 250upx;
			padding-right: 20upx;
			.title {
				margin-left: 40upx;
				font-size: 28upx;
			}
			.number {
				margin-left: 40upx;
				font-size: 28upx;
				color: #666;
			}
		}

		.overviewNavCss {
			background: #fff;
			height: 120upx;
			width: 230upx;
			border-radius: 20upx;
			.title {
				width: 100%;
				height: 50upx;
				line-height: 40upx;
				margin-top: 20upx;
				text-align: center;
				white-space:normal; 
				font-size: 24upx;
				word-break:break-all;
				overflow: hidden;
			}
			.number {
				height: 50upx;
				line-height: 30upx;
				font-size: 32upx;
				color: #5D9CEC;
				text-align: center;
			}
		}
		.twoBlock {
			display: flex;
			align-items: center;
			justify-content: center;
			.topEndNav {
				width: 340upx;
				height: 60upx;
				text-align: center;
				line-height: 64upx;
				font-size: 24upx;
				background: #fff;
				border-radius: 10upx;
				margin:20upx 20upx 20upx 0;
			}
		}
	}
</style>