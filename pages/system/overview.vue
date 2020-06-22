<template>
	<view class="overview">
		<!--
			loading
		-->
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-system" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-system"></view>
		</view>
		
		<!--
			搜索
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-major-light leftBlock">专业发展总览</view>
		</view>
		
		<view class="search">
			<view class="searchItem">
				<picker @change="bindPickerChange" :value="index" :range="yearArray">
						<view class="uni-input">{{yearArray[index]}}<text class="lg text-gray cuIcon-triangledownfill"></text></view>
				</picker>
			</view>
			
			<button class="searchBtn" type="primary" @tap="getMajorAchievingRate">检索</button>
		</view>
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<picker @change="bindPickerSysChange" :value="sysIndex" :range="sysArray">
					<view class="qiun-title-major-light leftBlock">{{sysArray[sysIndex]}}<text class="lg text-gray cuIcon-triangledownfill"></text></view>
			</picker>
			<view class="rightBlock">
				<image class="titleIcon" src="/static/images/majorTitle1.png"></image>{{nowRankData.totalNum}}
			</view>
		</view>
	
		<!--
			滚动
		-->
		<scroll-view scroll-x class="progressBar bg-white nav" style="margin-top: 40upx;;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" v-for="(item,index) in rankData" :key="index" :data-id="index">
				<view class="progressTitle">
					<view class="type" v-html="item.title">{{item.title}}</view>
					<view class="number">{{item.value}}</view>
				</view>
				<view class="cu-progress round">
					<view class="bg-systemPro" :style="[{ width:loading?item.preValue + '%':''}]">{{item.preValue}}%</view>
				</view>
			</view>
		</scroll-view>
		
		<!--
			表
		-->
		<view class="bg-white padding table">
			<view class="flexBlock col-4">
				<view class="header hColor more">
					<view class="row1">
						专业名称
					</view>
				</view>
				<view class="header hColor">
					是否达成优秀
				</view>
				<view class="header hColor">
					是否达成良好
				</view>
				<view class="header hColor">
					是否达成合格
				</view>
			</view>
			
			<view class="flexBlock col-4" :key="index" v-for="(item, index) in nowRankData.majorAchievingRateList">
				<view class="header more">
					<view class="rank" :class="{rankTop: index + 1 < 4}">
						{{index + 1}}
					</view>
					{{item.majorName}}
				</view>
					<view class="header">
					{{item.perfectValue == '是' ?item.perfectValue  : '-'}}
				</view>
				<view class="header">
					{{item.goodValue == '是' ?item.goodValue : '-'}}
				</view>
				<view class="header">
					{{item.passValue  == '是' ? item.passValue: '-' }}
				</view>
			</view>
		</view>
		<canvas @touchstart="touchRadar" canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
	</view>
</template>

<script>
	import uCharts from '../../components/echarts/echarts.js';
	var _self;
	var canvaRadar=null;
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				loadProgress: 0,
				isLoading: true,
				yearArray: [],
				sysArray: [],
				index: 0,
				sysIndex: 0,
				scrollLeft: 0,
				loading: false,
				rankData: [],
				nowRankData: {},
				colorArray: ['#2EC8CA', '#B6A2DF', '#5BB1EE']
			}
		},
		mounted() {
			let _self = this;
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});

			setTimeout(() => {
				this.loading = true
			}, 500)
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			
			this.getSchoolYear();
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

			// 学年下拉
			async getSchoolYear() {
				const url = this.address.major + this.api.major.getSchoolYear;
				this.LoadProgress();
				let	result = await this.request.post(url, {});
				this.yearArray = result.data;
				this.getIndex();
			},
			
			// 系部更改
			async getIndex() {
				const url = this.address.major + this.api.major.getIndex;
				let	result = await this.request.post(url, {});
				this.sysArray = result.data;
				this.getMajorAchievingRate();
			},
			
			// 排名
			async getMajorAchievingRate() {
				let params = {
					semesterStr: this.yearArray[this.index],
					indexName: this.sysArray[this.sysIndex]
				}
				const url = this.address.major + this.api.major.getMajorAchievingRate;
				let	result = await this.request.post(url, params);
				this.getStudentAchievingRateRadar();
				this.nowRankData = Object.assign({}, result.data);
				this.rankData = [
					{
						title: '优秀',
						value: this.nowRankData.perfectValue,
						preValue: this.nowRankData.perfectValue
					},{
						title: '良好',
						value: this.nowRankData.goodValue,
						preValue: this.nowRankData.goodPercent
					},{
						title: '合格',
						value: this.nowRankData.passValue,
						preValue: this.nowRankData.passPercent
					},{
						// "<image style='width:20upx; height: 20upx;' src='/static/images/warnOver.jpg'></image>"
						title: '警告',
						value: this.nowRankData.warnValue,
						preValue: this.nowRankData.warnPercent
					}
				]
			},
			
			async getStudentAchievingRateRadar() {
				const url = this.address.major + this.api.major.getStudentAchievingRateRadar;
				let params = {
					semesterStr: this.yearArray[this.index],
					indexName: this.sysIndex
				}
				let	result = await this.request.post(url, params);
				this.LoadProgress(true);
				let data = {
					series: [],
					categories: []
				};
				// 处理数据格式
				result.data.seriesData.forEach((i, index) => {
					data.series.push({
						name: i.name,
						color: this.colorArray[index],
						data: i.value
					})	 
				});
				
				for(let i of result.data.radarIndicator) {
					data.categories.push(i.name);
				}
				this.showRadar("canvasRadar", data);
			},

			
			// 时间选择器改变
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			
			// 系部
			bindPickerSysChange(e) {
				this.sysIndex = e.target.value;
				this.getMajorAchievingRate();
			},
			
			// 展示维度图
			showRadar(canvasId,chartData){
				let _self = this;
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize: 7,
					padding:[0,0,0,0],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						fontSize: 10,
						margin:0
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth * _self.pixelRatio * 0.7,
					height: _self.cHeight * _self.pixelRatio * 0.8,
					extra: {
						radar: {
							max: 100//雷达数值的最大值
						}
					}
				});
			},
			touchRadar(e){
				console.log(e)
				canvaRadar.touchLegend(e);
				canvaRadar.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	/* 通用样式 */
	.charts {
		width: calc(100% + 100upx);
		height: 800upx;
		position: relative;
		left: -100upx;
	}
	.overview {
		background: #fff;
		overflow: hidden;
		.search {
			overflow: hidden;
			padding: 30upx 15upx;
			.searchItem {
				width: 25%;
				height: 60upx;
				line-height: 60upx;
				float: left;
				margin-right: 10upx;
				text-align: center;
				border: 1px solid #ddd;
				color: #777;
			}
			.searchBtn {
				width: 18%;
				float: left;
				height: 60upx;
				line-height: 60upx;
				margin-left: 10upx;
				font-size: 26upx;
			}
		}
		.title {
			overflow: hidden;
			font-weight: bold;
			.leftBlock {
				float: left;
				width: 70%;
				font-size: 32upx;
			}
			.rightBlock {
				float: right;
				text-align: right;
				font-size: 32upx;
				width: 30%;
				color: #2ECAC4;
				display: flex;
				align-items: center;
				.titleIcon {
					margin-left: auto;
					display: inline-block;
					width: 32upx;
					height: 32upx;
					margin-right: 10upx;
				}
			}
		}
		.progressBar {
			.cu-item {
				width: 240upx;
				height: 150upx;
				.progressTitle {
					width: 240upx;
					display: flex;
					height:43upx;
					align-items: center;
					vertical-align: center;
					.type {
						height:43upx;
						line-height: 43upx;
						background: #FADCEB;
						color: #E4529A;
						width: 85upx;
						text-align: center;
						overflow: hidden;
						font-size: 26upx;
						border:1px solid rgba(228,82,154,1);
						border-radius:20upx;
					}
					.number {
						font-size: 32upx;
						margin-left: 10upx;
					}
				}
			}
			.cu-item:nth-child(2) {
				.progressTitle{
					.type {
						color: #30A78A;
						background-color: #DAF5EF;
						border:1px solid rgba(48,167,138,1);
					}
				}
			}
			.cu-item:nth-child(3) {
				.progressTitle{
					.type {
						color: #5DA6F1;
						background-color: #DFEDFC;
						border:1px solid rgba(93,166,241,1);
					}
				}
			}
			.cu-item:nth-child(4) {
				.progressTitle{
					.type {
						color: #EB5548;
						background-color: #FBDDDA;
						border:1px solid rgba(235,85,72,1);
					}
				}
			}
		}
		.table {
			padding-top: 0!important;
			.flexBlock {
				display: flex;
				.hColor {
					color: #4B89DC;
				}
				.header {
					margin-bottom: 10upx;
					flex: 3;
					font-size: 24upx;
					font-weight: bold;
					height: 50upx;
					line-height: 50upx;
					text-align: center;
					.rank {
						display: inline-block;
						width: 24upx;
						height: 24upx;
						background: #EBF0F6;
						color: #777;
						line-height: 24upx;
						text-align: center;
						font-size: 24upx;
						margin-right: 10upx;
					}
					.row1 {
						width: 80%;
						height:50upx;
						background:rgba(102,125,179,1);
						border-radius:0px 25upx 25upx 0px;
						color: #fff;
						padding-left: 20upx;
					}
					.rankTop {
						background: #F29B76;
						color: #fff;
					}
				}
				.more {
					text-align: left;
					flex: 5;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
