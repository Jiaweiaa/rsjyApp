<template>
	<view class="developmentBlock">
		<!--
			loading
		-->
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress != 0 ? 'show' : 'hide'" :style="[{ top: CustomBar + 'px' }]">
			<view class="load-progress-bar bg-student" :style="[{ transform: 'translate3d(-' + (100 - loadProgress) + '%, 0px, 0px)' }]"></view>
			<view class="load-progress-spinner text-student"></view>
		</view>

		<!--
			本学期各维度统计雷达图
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-student-light leftBlock margin20">各学期得分详情</view></view>
		<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn" id="deveCanvasColumn" class="charts" @touchstart="touchColumn"></canvas></view>
		<view class="qiun-charts"><canvas canvas-id="canvasDeveRadar" id="canvasDeveRadar" class="charts"></canvas></view>
		<view class="testTableDate">
			<view class="viewTitle"></view>
			<view class="viewTitle">{{ deveTableDate[0] }}</view>
			<view class="viewTitle">{{ deveTableDate[2] }}</view>
		</view>
		<view class="testTable">
			<view class="viewTitle" v-for="(item, index) in deveTable" :key="index">{{ item.name }}</view>
		</view>
		<view class="testTable backFFF" :key="index" v-for="(item, index) in deveTableData">
			<view class="viewTitle" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
		</view>
		<template>
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-student-light leftBlock margin20">1.师德表现（{{ sdbx }}分）</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn1" id="deveCanvasColumn1" class="charts" @touchstart="touchColumnOne"></canvas></view>
			<view class="DrawerClose">
				<view class="testTableDateTwo">
					<view class="viewTitle"></view>
					<view class="viewTitle">{{ deveTableDate[0] }}</view>
					<view class="viewTitle">{{ deveTableDate[2] }}</view>
				</view>
				<view class="testTableTwo">
					<view class="viewTitleTwo" v-for="(item, index) in deveTableTwo" :key="index">{{ item.name }}</view>
				</view>
				<view class="testTableTwo backFFF" :key="index" v-for="(item, index) in tableDataOne">
					<view class="viewTitleTwo" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
				</view>
			</view>
		</template>
		<template>
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-student-light leftBlock margin20">2.教学教研（{{ jxjy }}分）</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn2" id="deveCanvasColumn2" class="charts" @touchstart="touchColumnTwo"></canvas></view>
			<view class="DrawerClose">
				<view class="testTableDateTwo">
					<view class="viewTitle"></view>
					<view class="viewTitle">{{ deveTableDate[0] }}</view>
					<view class="viewTitle">{{ deveTableDate[2] }}</view>
				</view>
				<view class="testTableTwo">
					<view class="viewTitleTwo" v-for="(item, index) in deveTableTwo" :key="index">{{ item.name }}</view>
				</view>
				<view class="testTableTwo backFFF" :key="index" v-for="(item, index) in tableDataTwo">
					<view class="viewTitleTwo" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
				</view>
			</view>
		</template>
		<template>
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-student-light leftBlock margin20">3.专业发展（{{ zyfz }}分）</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn3" id="deveCanvasColumn3" class="charts" @touchstart="touchColumnThree"></canvas></view>
			<view class="DrawerClose">
				<view class="testTableDateTwo">
					<view class="viewTitle"></view>
					<view class="viewTitle">{{ deveTableDate[0] }}</view>
					<view class="viewTitle">{{ deveTableDate[2] }}</view>
				</view>
				<view class="testTableTwo">
					<view class="viewTitleTwo" v-for="(item, index) in deveTableTwo" :key="index">{{ item.name }}</view>
				</view>
				<view class="testTableTwo backFFF" :key="index" v-for="(item, index) in tableDataThree">
					<view class="viewTitleTwo" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
				</view>
			</view>
		</template>
		<template>
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-student-light leftBlock margin20">4.科研水平（{{ kysp }}分）</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn4" id="deveCanvasColumn4" class="charts" @touchstart="touchColumnFour"></canvas></view>
			<view class="DrawerClose">
				<view class="testTableDateTwo">
					<view class="viewTitle"></view>
					<view class="viewTitle">{{ deveTableDate[0] }}</view>
					<view class="viewTitle">{{ deveTableDate[2] }}</view>
				</view>
				<view class="testTableTwo">
					<view class="viewTitleTwo" v-for="(item, index) in deveTableTwo" :key="index">{{ item.name }}</view>
				</view>
				<view class="testTableTwo backFFF" :key="index" v-for="(item, index) in tableDataFour">
					<view class="viewTitleTwo" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
				</view>
			</view>
		</template>
		<template>
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-student-light leftBlock margin20">5.社会服务（{{ shfw }}分）</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn5" id="deveCanvasColumn5" class="charts" @touchstart="touchColumnFive"></canvas></view>
			<view class="DrawerClose">
				<view class="testTableDateTwo">
					<view class="viewTitle"></view>
					<view class="viewTitle">{{ deveTableDate[0] }}</view>
					<view class="viewTitle">{{ deveTableDate[2] }}</view>
				</view>
				<view class="testTableTwo">
					<view class="viewTitleTwo" v-for="(item, index) in deveTableTwo" :key="index">{{ item.name }}</view>
				</view>
				<view class="testTableTwo backFFF" :key="index" v-for="(item, index) in tableDataFive">
					<view class="viewTitleTwo" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
				</view>
			</view>
		</template>
		<template>
			<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-student-light leftBlock margin20">6.工作业绩（{{ gzyj }}分）</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="deveCanvasColumn6" id="deveCanvasColumn6" class="charts" @touchstart="touchColumnSix"></canvas></view>
			<view class="DrawerClose">
				<view class="testTableDateTwo">
					<view class="viewTitle"></view>
					<view class="viewTitle">{{ deveTableDate[0] }}</view>
					<view class="viewTitle">{{ deveTableDate[2] }}</view>
				</view>
				<view class="testTableTwo">
					<view class="viewTitleTwo" v-for="(item, index) in deveTableTwo" :key="index">{{ item.name }}</view>
				</view>
				<view class="testTableTwo backFFF" :key="index" v-for="(item, index) in tableDataSix">
					<view class="viewTitleTwo" :key="childIndex" v-for="(child, childIndex) in item">{{ child }}</view>
				</view>
			</view>
		</template>
	</view>
</template>
<script>
import uCharts from '../../components/echarts/echarts.js';
var canvaColumn = null;
var canvaColumnOne = null;
var canvaColumnTwo = null;
var canvaColumnThree = null;
var canvaColumnFour = null;
var canvaColumnFive = null;
var canvaColumnSix = null;
var canvaRadar = null;
export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,

			CustomBar: this.CustomBar,
			loadProgress: 0,
			isLoading: true,
			scrollLeft: 0,
			colorArray: ['#2EC7C9', '#B6A2DE', '#5AB1EF', '#FFB980', '#D87A80', '#8D98B3'],

			deveTable: [
				{
					name: '名称'
				},
				{
					name: '第一学期'
				},
				{
					name: '第二学期'
				},
				{
					name: '第一学期'
				},
				{
					name: '第二学期'
				}
			],
			deveTableTwo: [
				{
					name: '分类名称'
				},
				{
					name: '第1学期得分'
				},
				{
					name: '第1学期系排名'
				},
				{
					name: '第1学期学院排名'
				},
				{
					name: '第2学期得分'
				},
				{
					name: '第2学期系排名'
				},
				{
					name: '第2学期学院排名'
				},
				{
					name: '第1学期得分'
				},
				{
					name: '第1学期系排名'
				},
				{
					name: '第1学期学院排名'
				},
				{
					name: '第2学期得分'
				},
				{
					name: '第2学期系排名'
				},
				{
					name: '第2学期学院排名'
				}
			],
			deveTableDate: [],
			deveTableData: [],
			//师德表现
			tableDataOne: [],
			//师德表现分
			sdbx: '',
			//教学教研分
			jxjy: '',
			//教学教研
			tableDataTwo: [],
			//专业发展分
			zyfz: '',
			//专业发展
			tableDataThree: [],
			//科研水平分
			kysp: '',
			//科研水平
			tableDataFour: [],
			//社会服务分
			shfw: '',
			//社会服务
			tableDataFive: [],
			//工作业绩分
			gzyj: '',
			//工作业绩
			tableDataSix: []
		};
	},
	mounted() {
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getDevelopmentReport();
	},
	methods: {
		// 进度条
		LoadProgress(e) {
			if (e) {
				this.loadProgress = 0;
				this.isLoading = false;
			} else {
				let interval = setInterval(() => {
					this.loadProgress = this.loadProgress + 5;
				}, 100);
				if (this.loadProgress > 100) {
					clearInterval(interval);
					this.loadProgress = 0;
				}
			}
		},

		// 获取数据
		async getDevelopmentReport() {
			this.LoadProgress();
			const url = this.address.teacher + this.api.teacher.getDevelopmentReport;
			let result = await this.request.post(url, {});
			let resultData = result.data;
			this.LoadProgress(true);
			// 名称
			let nameTabel = [...resultData.barGraphDimensionName, ...['总分', '系排名', '学院排名']];
			// "师德表现"
			let basicCivicQuality = [];
			// "教学教研"
			let generalProfessionalQuality = [];
			// "专业发展"
			let professionalAccomplishment = [];
			// "科研水平"
			let generalKnowledgeCapacity = [];
			// "社会服务"
			let professionalKnowledgeAbility = [];
			// "工作业绩"
			let practicalAbility = [];
			// 总分
			let integrateScore = [];
			// 系排名
			let facultyRanking = [];
			// 学院排名
			let collegeRanking = [];
			if (resultData.tableStatistics.length === 0) {
				basicCivicQuality.push(0, 0, 0, 0);
				generalProfessionalQuality.push(0, 0, 0, 0);
				professionalAccomplishment.push(0, 0, 0, 0);
				generalKnowledgeCapacity.push(0, 0, 0, 0);
				professionalKnowledgeAbility.push(0, 0, 0, 0);
				practicalAbility.push(0, 0, 0, 0);
				integrateScore.push(0, 0, 0, 0);
				facultyRanking.push(0, 0, 0, 0);
				collegeRanking.push(0, 0, 0, 0);
			} else {
				resultData.tableStatistics.map((item, index) => {
					basicCivicQuality.push(item.teacherMorality);
					generalProfessionalQuality.push(item.teachingAndResearch);
					professionalAccomplishment.push(item.specialtyDevelopment);
					generalKnowledgeCapacity.push(item.scientificResearchLevels);
					professionalKnowledgeAbility.push(item.communityService);
					practicalAbility.push(item.workPerformance);
					integrateScore.push(item.totalScore);
					facultyRanking.push(item.departmentBank);
					collegeRanking.push(item.schoolBank);
					this.deveTableDate.push(item.semesterStr);
				});
			}

			let tableData = [
				[nameTabel[0], ...basicCivicQuality],
				[nameTabel[1], ...generalProfessionalQuality],
				[nameTabel[2], ...professionalAccomplishment],
				[nameTabel[3], ...generalKnowledgeCapacity],
				[nameTabel[4], ...professionalKnowledgeAbility],
				[nameTabel[5], ...practicalAbility],
				[nameTabel[6], ...integrateScore],
				[nameTabel[7], ...facultyRanking],
				[nameTabel[8], ...collegeRanking]
			];
			this.deveTableData = tableData;

			//师德表现
			this.tableDataOne = resultData.teacherDevelopmentReportTreeList[0].tableData;
			//教学教研
			this.tableDataTwo = resultData.teacherDevelopmentReportTreeList[1].tableData;
			//专业发展
			this.tableDataThree = resultData.teacherDevelopmentReportTreeList[2].tableData;
			//科研水平
			this.tableDataFour = resultData.teacherDevelopmentReportTreeList[3].tableData;
			//社会服务
			this.tableDataFive = resultData.teacherDevelopmentReportTreeList[4].tableData;
			// 工作业绩
			this.tableDataSix = resultData.teacherDevelopmentReportTreeList[5].tableData;
			// 柱状图数据
			let columnData = {
				categories: [],
				series: []
			};
			for (let i of resultData.barGraphSemester) {
				columnData.categories.push(i);
			}
			resultData.barGraphDimensionName.forEach((item, index) => {
				columnData.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.barGraphStatistics[index]
				});
			});
			this.showColumn('deveCanvasColumn', columnData);
			//师德表现
			let columnDataOne = {
				categories: [],
				series: []
			};
			for (let i of resultData.teacherDevelopmentReportTreeList[0].barGraphSemesterChildren) {
				columnDataOne.categories.push(i);
			}
			resultData.teacherDevelopmentReportTreeList[0].barGraphDimensionNameChildren.forEach((item, index) => {
				columnDataOne.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.teacherDevelopmentReportTreeList[0].barGraphStatisticsChildren[index]
				});
			});
			this.showColumnOne('deveCanvasColumn1', columnDataOne);
			this.sdbx = resultData.teacherDevelopmentReportTreeList[0].score;
			//教学教研
			let columnDataTwo = {
				categories: [],
				series: []
			};
			for (let i of resultData.teacherDevelopmentReportTreeList[1].barGraphSemesterChildren) {
				columnDataTwo.categories.push(i);
			}
			resultData.teacherDevelopmentReportTreeList[1].barGraphDimensionNameChildren.forEach((item, index) => {
				columnDataTwo.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.teacherDevelopmentReportTreeList[1].barGraphStatisticsChildren[index]
				});
			});
			this.showColumnTwo('deveCanvasColumn2', columnDataTwo);
			this.jxjy = resultData.teacherDevelopmentReportTreeList[1].score;
			//专业发展
			let columnDataThree = {
				categories: [],
				series: []
			};
			for (let i of resultData.teacherDevelopmentReportTreeList[2].barGraphSemesterChildren) {
				columnDataThree.categories.push(i);
			}
			resultData.teacherDevelopmentReportTreeList[2].barGraphDimensionNameChildren.forEach((item, index) => {
				columnDataThree.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.teacherDevelopmentReportTreeList[2].barGraphStatisticsChildren[index]
				});
			});
			this.showColumnThree('deveCanvasColumn3', columnDataThree);
			this.zyfz = resultData.teacherDevelopmentReportTreeList[2].score;
			//科研水平
			let columnDataFour = {
				categories: [],
				series: []
			};
			for (let i of resultData.teacherDevelopmentReportTreeList[3].barGraphSemesterChildren) {
				columnDataFour.categories.push(i);
			}
			resultData.teacherDevelopmentReportTreeList[3].barGraphDimensionNameChildren.forEach((item, index) => {
				columnDataFour.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.teacherDevelopmentReportTreeList[3].barGraphStatisticsChildren[index]
				});
			});
			this.showColumnFour('deveCanvasColumn4', columnDataFour);
			this.kysp = resultData.teacherDevelopmentReportTreeList[3].score;
			//社会服务
			let columnDataFive = {
				categories: [],
				series: []
			};
			for (let i of resultData.teacherDevelopmentReportTreeList[4].barGraphSemesterChildren) {
				columnDataFive.categories.push(i);
			}
			resultData.teacherDevelopmentReportTreeList[4].barGraphDimensionNameChildren.forEach((item, index) => {
				columnDataFive.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.teacherDevelopmentReportTreeList[4].barGraphStatisticsChildren[index]
				});
			});
			this.showColumnFive('deveCanvasColumn5', columnDataFive);
			this.shfw = resultData.teacherDevelopmentReportTreeList[4].score;
			//工作业绩
			let columnDataSix = {
				categories: [],
				series: []
			};
			for (let i of resultData.teacherDevelopmentReportTreeList[5].barGraphSemesterChildren) {
				columnDataSix.categories.push(i);
			}
			resultData.teacherDevelopmentReportTreeList[5].barGraphDimensionNameChildren.forEach((item, index) => {
				columnDataSix.series.push({
					name: item,
					color: this.colorArray[index],
					data: resultData.teacherDevelopmentReportTreeList[5].barGraphStatisticsChildren[index]
				});
			});
			this.showColumnSix('deveCanvasColumn6', columnDataSix);
			this.gzyj = resultData.teacherDevelopmentReportTreeList[5].score;
			// 雷达图
			let radarData = {
				categories: [],
				series: []
			};
			resultData.radarMapStatistics.forEach((val, index) => {
				radarData.series.push({
					name: val.name,
					color: this.colorArray[index],
					data: val.value
				});
			});
			for (let i of resultData.radarMapDimensionName) {
				radarData.categories.push(i.name);
			}
			this.showRadar('canvasDeveRadar', radarData);
		},
		// 柱状图
		showColumn(canvasId, chartData) {
			let _self = this;
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(1);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		// 柱状图
		showColumnOne(canvasId, chartData) {
			let _self = this;
			canvaColumnOne = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(2);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		showColumnTwo(canvasId, chartData) {
			let _self = this;
			canvaColumnTwo = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(1);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		showColumnThree(canvasId, chartData) {
			let _self = this;
			canvaColumnThree = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(1);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		showColumnFour(canvasId, chartData) {
			let _self = this;
			canvaColumnFour = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(0);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		showColumnFive(canvasId, chartData) {
			let _self = this;
			canvaColumnFive = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(1);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		showColumnSix(canvasId, chartData) {
			let _self = this;
			canvaColumnSix = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(1);
					},
					show: false
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						// type:'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.4) / chartData.categories.length
					}
				}
			});
		},
		touchColumn(e) {
			canvaColumn.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		touchColumnOne(e) {
			canvaColumnOne.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		touchColumnTwo(e) {
			canvaColumnTwo.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		touchColumnThree(e) {
			canvaColumnThree.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		touchColumnFour(e) {
			canvaColumnFour.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		touchColumnFive(e) {
			canvaColumnFive.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		touchColumnSix(e) {
			canvaColumnSix.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		},
		// 雷达图
		showRadar(canvasId, chartData) {
			let _self = this;
			canvaRadar = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'radar',
				fontSize: 11,
				legend: { show: true },
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				dataLabel: true,
				categories: chartData.categories,
				series: chartData.series,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {}
			});
		}
	}
};
</script>

<style scoped lang="scss">
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.title {
	width: 100%;
}
.developmentBlock {
	padding-bottom: 30upx;
	background: #fff;
	overflow: hidden;
	.margin20 {
		margin: 20upx 0 20upx;
	}
	.testTable {
		border-left: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		display: flex;
		width: 96%;
		margin: 0 auto;
		background: #f5f6f8;
		.viewTitle {
			font-size: 24upx;
			text-align: center;
			flex: 1;
			display: flex;
			border-right: 1px solid #ddd;
			height: 80upx;
			align-items: center;
			justify-content: center;
		}
		.viewTitle:nth-child(1) {
			flex: 2.97;
			align-items: flex-start;
			border-top: none;
		}
		.viewTitle:last-child {
			border-right: none;
		}
	}
	.DrawerClose {
		overflow-x: scroll;
		width: 367px;
		.testTableTwo {
			border-left: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			border-right: 1px solid #ddd;
			display: flex;
			width: 850px;
			margin: 0 8px;
			background: #f5f6f8;

			.viewTitleTwo {
				font-size: 24upx;
				text-align: center;
				flex: 1;
				display: flex;
				border-right: 1px solid #ddd;
				height: 80upx;
				align-items: center;
				justify-content: center;
			}
		}

		.viewTitleTwo:nth-child(1) {
			flex: 2;
			align-items: flex-start;
			border-top: none;
		}
		.viewTitleTwo:last-child {
			border-right: none;
		}
		.testTableDateTwo {
			border: 1px solid #ddd;
			display: flex;
			width: 850px;
			margin: 0 8px;
			background: #f5f6f8;
			border-bottom: 0;
			.viewTitle {
				font-size: 24upx;
				text-align: center;
				align-items: center;
				justify-content: center;
				display: flex;
				border-right: 1px solid #ddd;
				height: 80upx;
			}
			.viewTitle:nth-child(1) {
				flex: 1.67;
			}
			.viewTitle:nth-child(2) {
				flex: 5.1;
				border-bottom: 1px solid #ddd;
			}
			.viewTitle:nth-child(3) {
				flex: 5.1;
				border-bottom: 1px solid #ddd;
				border-right: none;
			}
		}
	}
	.testTableDate {
		border: 1px solid #ddd;
		display: flex;
		width: 96%;
		margin: 0 auto;
		background: #f5f6f8;
		border-bottom: 0;
		.viewTitle {
			font-size: 24upx;
			text-align: center;
			align-items: center;
			justify-content: center;
			display: flex;
			border-right: 1px solid #ddd;
			height: 80upx;
		}
		.viewTitle:nth-child(1) {
			flex: 2.92;
		}
		.viewTitle:nth-child(2) {
			flex: 2;
			border-bottom: 1px solid #ddd;
		}
		.viewTitle:nth-child(3) {
			flex: 1.99;
			border-bottom: 1px solid #ddd;
			border-right: none;
		}
	}
	.backFFF {
		border-top: none;
		background: #fff !important;
		.viewTitle:nth-child(1) {
			align-items: center !important;
		}
		.viewTitleTwo:nth-child(1) {
			align-items: center !important;
		}
	}
	.qiun-title-student-light {
		border-color: #3f93e9;
	}
}
</style>
