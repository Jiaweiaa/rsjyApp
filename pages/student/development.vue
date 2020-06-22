<template>
	<view class="developmentBlock">
		<!--
			loading
		-->
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-student" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-student"></view>
		</view>
		
		<!--
			本学期各维度统计雷达图
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-student-light leftBlock margin20">各学期得分详情</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="deveCanvasColumn" id="deveCanvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasDeveRadar" id="canvasDeveRadar" class="charts"></canvas>
		</view>
		
		<view class="testTable">
			<view class="viewTitle" v-for="(item, index) in deveTable" :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="testTable backFFF" :key="index" v-for="(item, index) in deveTableData">
			<view class="viewTitle" :key="childIndex" v-for="(child, childIndex) in item">
				{{child}}
			</view>
		</view>	
		
	</view>
</template>
<script>
	import uCharts from '../../components/echarts/echarts.js';
	var canvaColumn = null;
	var canvaRadar = null;
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
						name: '第三学期'
					},
					{
						name: '第四学期'
					},
					{
						name: '第五学期'
					},
					{
						name: '第六学期'
					},
					{
						name: '平均得分'
					}
				],
				deveTableData: []
			}
		},
		mounted() {
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getDevelopmentReport();
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
			async getDevelopmentReport() {
				this.LoadProgress();
				const url = this.address.student + this.api.student.getDevelopmentReport;
				let	result = await this.request.post(url, {});
				let resultData = result.data;
				this.LoadProgress(true);
				// 名称
				let nameTabel = [...resultData.dimensionList, ...['总分', '班级排名', '系排名', '学院排名']];
				// 公民基本素养
				let basicCivicQuality = [];
				// 通用职业素养
				let generalProfessionalQuality = [];
				// 专业职业素养
				let professionalAccomplishment = [];
				// 通用知识能力
				let generalKnowledgeCapacity = [];
				// 专业知识能力
				let professionalKnowledgeAbility = [];
				// 实践操作能力
				let practicalAbility = [];
				// 总分
				let integrateScore = [];
				// 班级排名
				let classRanking = [];
				// 系排名
				let facultyRanking = [];
				// 学院排名
				let collegeRanking = [];
				resultData.tableStatistics.map((item, index) => {
					basicCivicQuality.push(item.basicCivicQuality);
					generalProfessionalQuality.push(item.generalProfessionalQuality);
					professionalAccomplishment.push(item.professionalAccomplishment);
					generalKnowledgeCapacity.push(item.generalKnowledgeCapacity);
					professionalKnowledgeAbility.push(item.professionalKnowledgeAbility);
					practicalAbility.push(item.practicalAbility);
					integrateScore.push(item.integrateScore);
					classRanking.push(item.classRanking);
					facultyRanking.push(item.facultyRanking);
					collegeRanking.push(item.collegeRanking);
				});
				let tableData = [
					[nameTabel[0],...basicCivicQuality],
					[nameTabel[1],...generalProfessionalQuality],
					[nameTabel[2],...professionalAccomplishment],
					[nameTabel[3],...generalKnowledgeCapacity],
					[nameTabel[4],...professionalKnowledgeAbility],
					[nameTabel[5],...practicalAbility],
					[nameTabel[6],...integrateScore],
					[nameTabel[7],...classRanking],
					[nameTabel[8],...facultyRanking],
					[nameTabel[9],...collegeRanking]
				];
				this.deveTableData = tableData;
				// 柱状图数据
				let columnData = {
					categories: [],
					series: []
				};
				for(let i of resultData.semesterList) {
					columnData.categories.push(`第${i}学期`)
				}
				resultData.dimensionList.forEach((item, index) => {
					columnData.series.push({
						name: item,
						color: this.colorArray[index],
						data: resultData.highDataList[index]
					})
				});
				this.showColumn('deveCanvasColumn', columnData);
				
				// 雷达图
				let radarData = {
					categories: resultData.dimensionList,
					series: []
				};
				resultData.datasList.forEach((val, index) => {
					radarData.series.push({
						name: `第${index + 1}学期`,
						color: this.colorArray[index],
						data: val
					})
				});
				this.showRadar("canvasDeveRadar", radarData);
			},
			
			// 柱状图
			showColumn(canvasId,chartData){
				let _self = this;
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{show:true},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						format:(val)=>{return val.toFixed(0)}
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					}
				});
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
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
					extra: {}
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
	.developmentBlock {
		padding-bottom: 30upx;
		background: #fff;
		overflow: hidden;
		.margin20 {
			margin: 20upx 0 20upx;
		}
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
				flex: 3;
			}
			.viewTitle:last-child {
				border-right: none;
			}
		}
		.backFFF {
			border-top: none;
			background: #fff!important;
		}
	}
</style>