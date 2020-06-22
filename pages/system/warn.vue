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
			预警
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt marginT20">
			<view class="qiun-title-major-light leftBlock">专业发展预警</view>
			<view class="rightBlock">
				<image class="titleIcon" src="/static/images/majorTitle2.png"></image>{{deveArray[0].resultValue}}
			</view>
		</view>
		
		<!--
			搜索
		-->
		<view class="search">
			<view class="searchItem">
				<picker @change="bindDepPickerChange" :value="departmentIndex" :range="departmentArray">
						<view class="uni-input overLabel">{{departmentArray[departmentIndex]}}<text class="lg text-gray cuIcon-triangledownfill"></text></view>
				</picker>
			</view>
			<view class="searchItem">
				<picker @change="bindSysPickerChange" :value="sysIndex" :range="sysArray">
						<view class="uni-input overLabel">{{sysArray[sysIndex]}}<text class="lg text-gray cuIcon-triangledownfill"></text></view>
				</picker>
			</view>
			<view class="searchItem">
				<picker @change="bindPickerChange" :value="index" :range="yearArray">
						<view class="uni-input overLabel">{{yearArray[index]}}<text class="lg text-gray cuIcon-triangledownfill"></text></view>
				</picker>
			</view>
			<button class="searchBtn" @click="initData" type="primary">查看</button>
		</view>
		
		<scroll-view scroll-x class="bg-white nav marginTop20" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item overviewCss" v-if="index > 0" v-for="(item,index) in deveArray" :key="index" :data-id="index">
				<view class="title">{{item.chainName}}</view>
				<view class="number">{{item.resultValue}}</view>
			</view>
		</scroll-view>
	
		<!--
			预警分布
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt marginT20">
			<view class="qiun-title-major-light leftBlock">总分预警项数分布</view>
		</view>
		<canvas canvas-id="canvasWarnPie" id="canvasWarnPie" class="charts" @touchstart="touchPie"></canvas>
		
		<!--
			专业发展状况
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt marginT20">
			<view class="qiun-title-major-light leftBlock">专业发展状况</view>
		</view>
		<canvas canvas-id="canvasLineWarn" id="canvasLineWarn" class="charts" style="height: 430upx;" @touchstart="touchLine"></canvas>
	
		<!--
			预警信息
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-major-light leftBlock">预警信息</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view 
				class="cu-item" 
				:class="index==tabActiveIndex?'text-system cur activeCur':''" 
				v-for="(item,index) in tabArr" 
				:key="index" 
				@tap="warnTabSelect(item, index)" 
				:data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<!--
			系部
		-->
		<view class="listView">
			<view class="child paddingLeft20">
				系部
			</view>
			<view class="child">
				人数
			</view>
			<view class="child">
				百分比
			</view>
		</view>
		<view class="listView childContent" v-show="facultyBtn ? index < 5: true" :key="index" v-for="(item, index) in tabListData.facultyWarnInfo">
			<view class="child">
				<view class="rank" :class="{rankTop: index + 1 < 4}">
					{{index + 1}}
				</view>
				{{item.chainName}}
			</view>
			<view class="child">
				{{item.majorNum}}人
			</view>
			<view class="child">
				{{item.warnPercent}}%
			</view>
		</view>
		<button v-show="facultyBtn" @click="facultyClick" class="lookMoreBtn">查看更多</button>
		
		<!--
			专业
		-->
		<view class="listView">
			<view class="child paddingLeft20">
				专业
			</view>
			<view class="child">
			</view>
			<view class="child">
				是否预警
			</view>
		</view>
		<view class="listView childContent" v-show="sysBtn ? index < 5: true" :key="index+ 'ts'" v-for="(item, index) in tabListData.majorWarnInfo">
			<view class="child">
				<view class="rank" :class="{rankTop: index + 1 < 4}">
					{{index + 1}}
				</view>
				{{item.chainName}}
			</view>
			<view class="child">
			</view>
			<view class="child">
				{{item.whetherWarn}}
			</view>
		</view>
		<button v-show="sysBtn" @click="sysClick" class="lookMoreBtn">查看更多</button>
		
		<!--
			易犯错考核项分布分析
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-major-light leftBlock">易犯错考核项分布分析</view>
		</view>
		<canvas canvas-id="canvasWarnPieEnd" id="canvasWarnPieEnd" class="charts" @touchstart="touchPieEnd"></canvas>
		
	</view>
</template>

<script>
	import uCharts from '../../components/echarts/echarts.js';
	var _self;
	var canvaRadar = null;
	let canvaPie = null;
	var canvaLineA=null;
	export default {
		data() {
			return {
				facultyBtn: true,
				sysBtn: true,
				
				tabActiveIndex: 0,
				tabArr: [
					{
						name: "教学环境与文化建设"
					},
					{
						name: "人才培养模式"
					},
					{
						name: "课程体系构建与核心课程建设"
					},
					{
						name: "师资队伍"
					},
					{
						name: "实习实训基地"
					},
					{
						name: "社会服务能力建设"
					},
					{
						name: "国际交流合作"
					},
					{
						name: "校企合作机制体制改革"
					},
					{
						name: "招生与就业"
					}
				],
				tabListData: {},
			
				CustomBar: this.CustomBar,
				loadProgress: 0,
				isLoading: true,
				scrollLeft: 0,
				
				colorArray: ['#2EC8CA', '#B6A2DF', '#5BB1EE', '#FFB483', '#D57885', '#8C98B2', '#AEBBD9', '#E99DB0', '#E7D388'],
				yearArray: [],
				sysArray: ['请选择专业'],
				departmentArray: [],
				index: 0,
				sysIndex: 0,
				departmentIndex: 0,
				loading: false,
				nowRankData: {},
				
				deveArray: [{}]
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
			this.getIndex();
		},
		methods: {
			// 初始数据
			initData() {
				this.getData();
				this.getMajorWarnNum();
				this.getMajorDevelopmentConditions();
				this.getWarningInfo(this.tabArr[0].name);
				this.getWarnAnalyze();
			},
			
			// 查看更多
			facultyClick() {
				this.facultyBtn = false;
			},
			sysClick() {
				this.sysBtn = false;
			},
			
			// 列表点击
			warnTabSelect(val, index) {
				this.facultyBtn = true;
				this.sysBtn = true;
				this.tabActiveIndex = index;
				this.getWarningInfo(val.name);
			},
			
			async getWarningInfo(indexName) {
				let params = {
					schoolYear: this.yearArray[this.index],
					facultyName: this.departmentIndex == 0 ? '' : this.departmentArray[this.departmentIndex],
					majorName: this.sysIndex == 0 ? '' : this.sysArray[this.sysIndex],
					indexName
				}
				const url = this.address.major + this.api.major.getWarningInfo;
				let	result = await this.request.post(url, params);
				this.tabListData = result.data;
			},
			
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
			// 获取筛选数据
			getIndex() {
				// 获取学年专业
				this.LoadProgress();
				this.getSchoolYear();
				this.findDepartment();
			},
			// 学年下拉 获取学年之后在获取页面数据
			async getSchoolYear() {
				const url = this.address.major + this.api.major.getSchoolYear;
				let	result = await this.request.post(url, {});
				this.yearArray = result.data;
				this.initData();
			},
			
			// 系部更改
			async findDepartment() {
				const url = this.address.major + this.api.major.findDepartment;
				let	result = await this.request.post(url, {});
				this.departmentArray = ['请选择系部'];
				for(let i of result.data) {
					this.departmentArray.push(i);
				}
			},
			// 系部更改
			bindDepPickerChange(e) {
				this.departmentIndex = e.detail.value;
				this.findMajor(this.departmentArray[this.departmentIndex])
			},
			// 获取专业
			async findMajor(faculty) {
				this.sysArray = ['请选择专业'];
				this.sysIndex = 0;
				let params = {
					faculty
				}
				const url = this.address.major + this.api.major.findMajor;
				let	result = await this.request.post(url, params);
				for(let i of result.data) {
					this.sysArray.push(i);
				}
			},
			// 专业变更
			bindSysPickerChange(e) {
				this.sysIndex = e.detail.value;
			},
			// 学年修改
			bindPickerChange(e) {
				this.index = e.detail.value;
			},
			
			// 获取发展预警数据
			async getData() {
				let params = {
					schoolYear: this.yearArray[this.index],
					facultyName: this.departmentIndex == 0 ? '' : this.departmentArray[this.departmentIndex],
					majorName: this.sysIndex == 0 ? '' : this.sysArray[this.sysIndex]
				}
				const url = this.address.major + this.api.major.getData;
				let	result = await this.request.post(url, params);
				this.deveArray = result.data;
			},
			// 饼图数据
			async getMajorWarnNum() {
				let params = {
					schoolYear: this.yearArray[this.index],
					facultyName: this.departmentIndex == 0 ? '' : this.departmentArray[this.departmentIndex],
					majorName: this.sysIndex == 0 ? '' : this.sysArray[this.sysIndex]
				}
				const url = this.address.major + this.api.major.getMajorWarnNum;
				let	result = await this.request.post(url, params);
				let resultData = Object.assign({}, result.data);
				let pie = [];
				resultData.legendData.forEach((v, index) => {
					pie.push({
						name: v,
						color: this.colorArray[index],
						data: Number(resultData.seriesData[index].value)
					})
				})
				this.LoadProgress(true);
				this.showPie('canvasWarnPie', pie);
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
						padding: 4,
						lineHeight: 9,
						fontSize: 11,
						margin:2,
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
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
				canvaPie.touchLegend(e,{animation:true});
			},
			touchPieEnd(e) {
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
				canvaPie.touchLegend(e,{animation:true});
			},
			
			// 线形图数据
			async getMajorDevelopmentConditions() {
				let params = {
					facultyName: this.departmentIndex == 0 ? '' : this.departmentArray[this.departmentIndex],
					majorName: this.sysIndex == 0 ? '' : this.sysArray[this.sysIndex]
				}
				const url = this.address.major + this.api.major.getMajorDevelopmentConditions;
				let	result = await this.request.post(url, params);
				let resultData = Object.assign({}, result.data);
				let lineData = {
					categories: resultData.axisData,
					series: [
						{
							name: '发展人数',
							color: this.colorArray[0],
							data: resultData.seriesData
						}
					]
				}
				this.showLine('canvasLineWarn', lineData)
			},
			// 线形图
			showLine(canvasId,chartData){
				let _self = this;
				canvaLineA = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 9,
					legend:{
						show:true,
						fontSize: 10
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
						disableGrid: true,
						dashLength:8,
						fontSize: 11
					},
					yAxis: {
						gridType:'solid',
						gridColor:'#CCCCCC',
						dashLength:8,
						fontSize: 10
					},
					width: _self.cWidth,
					height: _self.cHeight,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			touchLine(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			// 考核分析图
			async getWarnAnalyze() {
				let params = {
					facultyName: this.departmentIndex == 0 ? '' : this.departmentArray[this.departmentIndex],
					majorName: this.sysIndex == 0 ? '' : this.sysArray[this.sysIndex]
				}
				const url = this.address.major + this.api.major.getWarnAnalyze;
				let	result = await this.request.post(url, params);
				let resultData = Object.assign({}, result.data);
				let pie = [];
				resultData.legendData.forEach((v, index) => {
					pie.push({
						name: v,
						color: this.colorArray[index],
						data: Number(resultData.seriesData[index].value)
					})
				})
				this.showPie('canvasWarnPieEnd', pie);
			}
		}
	}
</script>
<style lang="scss" scoped>
	/* 通用样式 */
	.charts{
		width: 750upx; 
		height:600upx;
		background-color: #FFFFFF;
	}

	.overview {
		background: #fff;
		overflow: hidden;
		.marginTop20 {
			margin-top: 20upx;
		}
		.activeCur {
			border-bottom: 8upx solid #F17C67!important;
		}
		.overLabel {
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		
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
				color: #667DB3;
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
			background: #F17C67;
			color: #fff;
			.title {
				height: 50upx;
				line-height: 25upx;
				text-align: center;
				font-size: 24upx;
				width: 180upx;
				margin: 15upx auto 10upx;
				white-space: pre-wrap;
				text-align: center;
			}
		}
		.listView {
			display: flex;
			height: 50upx;
			line-height: 50upx;
			background: #F5F6F8;
			font-size: 24upx;
			margin: 20upx auto 0;
			width: 94%;
			.child {
				flex: 1;
				text-align: center;
			}
			.child:first-child{
				flex: 3;
				text-align: left;
			}
			.paddingLeft20 {
				padding-left: 20upx;
			}
		}
		.childContent {
			margin-top: 0;
			background: #fff;
			.child {
				margin: 10upx 0;
			}
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
			.rankTop {
				background: #F29B76;
				color: #fff;
			}
		}
		.lookMoreBtn {
			width:	630upx;
			height:	50upx;
			line-height: 50upx;
			font-size: 24upx;
			margin: 20upx auto;
			color: #385ADB;
			background:rgba(238,241,254,1);
			border:1px solid rgba(56,90,219,1);
			border-radius:10upx;
		}
	}
</style>
