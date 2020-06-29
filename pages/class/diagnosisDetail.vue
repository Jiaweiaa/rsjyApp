<template>
	<view class="diagnosisDetail">
		<cu-custom bgColor="bg-gradual-class" class="viewHeader bg-gradual-class" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">课程层面诊断平台</block>
		</cu-custom>
		<view class="diagnosisDetailPageContent">
			<view class="title">
				<view class="titleName">{{pageData.title.name}}</view>
				<view class="titleCode">{{pageData.title.code}}</view>
			</view>
			<view class="page-content">
				<tabNav
					@menuChange="menuChange"
					:tabList="tabList" 
					:menuOpen="menuOpen" 
					:barFixed="barFixed" 
					:iconShow="iconShow" 
					:barHeight="barHeight" 
					:barTop="barTop" 
					:barId="barId" 
					ref="barTabNav">
					<view v-for="(item, index) in pageData.list" :key="index" :id="`item${index + 1}`"  class="tabbody">
						<view class="itemTitle" :class="{'index3Title': index == 3 }">
							{{item.title}}
						</view>
						<view class="childBlock" :key="childIndex" v-for="(childItem, childIndex) in item.data">
							<view class="childTitle" v-show="index == 0 || index == 1">
								<view class="borderLeft"></view>
								<view class="childTitleText">{{childItem.title}}</view>
							</view>
							<view class="childContent">
								<view class="childView" :class=" {'selfChild' :(index == 0 && childIndex == 0)}" :key="labelIndex" v-for="(itemLabel, labelIndex) in childItem.infoData">
									<!--
										第一块第一部分
									-->
									<view class="labelIndex0" v-show="childIndex == 0 && index == 0">
										<view class="childLabel">
											{{itemLabel.label}}
										</view>
										<view class="childValue">
											{{itemLabel.value}}
										</view>
									</view>
									
									<!--
										第一块第二部分
									-->
									<view v-show="childIndex == 1 && index == 0" class="lableIndex1" :key="itemForIndex1" v-for="(itemForData1, itemForIndex1) in itemLabel">
										<view class="childLabel1">
											{{itemForData1.label}}
										</view>	
										<view class="childValue1">
											{{itemForData1.value}}
										</view>	
									</view>
			
									<!-- 
										第一块第三四部分
									-->
									<view  class="lableIndex1" v-show="(childIndex == 2 || childIndex == 3) && index === 0">
										<view class="childLabel1">
											{{itemLabel.label}}
										</view>	
										<view class="childValue1">
											{{itemLabel.value}}
										</view>	
									</view>
								
									<!--
										第一块第五六部分
									-->
									<view  class="lableIndex1End" v-show="childIndex == 4 || childIndex == 5 && index == 0">
										<view class="childLabel1">
											{{itemLabel.label}}
										</view>	
										<view class="childValue1">
											{{itemLabel.value}}
										</view>	
									</view>
								
									<!--
										第二块第一部分
									-->
									<view class="labelIndex0Index1" v-show="childIndex == 0 && index == 1">
										<view class="childLabel">
											{{itemLabel.label}}
										</view>
										<view class="childValue">
											{{itemLabel.value}}
										</view>
										<view v-if="itemLabel.tableData" class="itemTable">
											<view class="tableHeader">
												<view class="header" :key="tableIndex" v-for="(tableItem, tableIndex) in itemLabel.tableData.header">
													{{tableItem}}
												</view>
											</view>
											<view class="tableContent">
												<view class="content" :key="tableIndex" v-for="(tableItem, tableIndex) in itemLabel.tableData.body">
													<view class="tableChildContent" v-for="(tableContent, tableIndex) in tableItem" :key="tableIndex">
														{{tableContent}}
													</view>
												</view>
											</view>
										</view>
									
										<view v-if="itemLabel.progress" class="progressItem">
											<view class="progressOpt" :key="progressIndex" v-for="(progressItem, progressIndex) in itemLabel.progress">
												<view class="progressTitle">
													<view class="type">{{progressItem.name}}</view>
													<view class="number">{{progressItem.value}}</view>
												</view>
												<view class="cu-progress round">
													<view class="bg-gradual-class" :style="[{ width:loading? progressItem.value :''}]">{{progressItem.value}}</view>
												</view>
											</view>
										</view>
									</view>
								
									<!--
										第二块第二，三部分
									-->
									<view  class="labelIndex0Index1" v-show="childIndex == 1 || childIndex == 2 && index == 1">
										<view class="childLabel">
											{{itemLabel.label}}
										</view>	
										<view class="childValue">
											{{itemLabel.value}}
										</view>
									</view>
								
									<!--
										第三块
									-->
									<view class="labelIndex0Index1" v-show="index == 2 || index == 3 || index == 4">
										<view class="childLabel">
											{{itemLabel.label}}
										</view>	
										<view class="childValue">
											{{itemLabel.value}}
										</view>
									</view>	
								</view>
							</view>
						</view>
					</view>
				</tabNav>
			</view>
		</view>

		
		<belong></belong>
	</view>
</template>
<script>
	import belong from '../../components/belong/belong.vue';
	import tabNav from "@/components/tabNav/tabNav.vue";
	export default {
		components: {
			tabNav,
			belong
		},
		data() {
			return {
				loading: false,
				
				pageData: {
					title: {
						name: '世界建筑史',
						code: '12080301'
					},
					list: [
						{
							title: '一、基本情况',
							data: [
								{
									title: '（一）基本信息',
									infoData: [
										{
											label: '课程名称:',
											value: '世界建筑史'
										},
										{
											label: '类型:',
											value: 'A'
										},
										{
											label: '计划学时:',
											value: '12'
										},
										{
											label: '实际学时:',
											value: '12'
										},
										{
											label: '理论学时:',
											value: '8'
										},
										{
											label: '实践学时:',
											value: '4'
										},
										{
											label: '授课教师:',
											value: '张三'
										},
										{
											label: '课程负责人:',
											value: '李四'
										},
										{
											label: '课程代码:',
											value: '12080301'
										},
										{
											label: '开设学期:',
											value: '2'
										}
									]
								}, {
									title: '（二）性质与目标',
									infoData: [
										[
											{
												label: '1、公告基础课:',
												value: '世界建筑史'
											},
											{
												label: '作用:',
												value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
											},
											{
												label: '精品在线开放课:',
												value: '是'
											},
											{
												label: '等级:',
												value: '2级'
											},
											{
												label: '作用:',
												value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。'
											},
											{
												label: '毕业设计:',
												value: '2xxxxxxxxxx'
											},
											{
												label: '作用:',
												value: '每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。字数不超过500字。'
											},
											{
												label: '顶岗实习:',
												value: '2xxxxxxxxxx'
											},
											{
												label: '作用:',
												value: '自我诊改务必写实，无需等级性结论。'
											},
										],
										[
											{
												label: '2、课程地位:',
												value: 'xxxxxxxxxxx'
											}
										],
										[
											{
												label: '3、课程目标:',
												value: 'xxxxxxxxxx'
											}
										]
									]
								}, {
									title: '（三）教学条件',
									infoData: [
										{
											label: '课程资源数量:',
											value: '---'
										},
										{
											label: '教材建设:',
											value: '---'
										},
										{
											label: '专业配套资源:',
											value: '--'
										}
									]
								}, {
									title: '（四）教学团队',
									infoData: [
										{
											label: '专业带头人:',
											value: '---'
										},
										{
											label: '职称:',
											value: '---'
										},
										{
											label: '年龄:',
											value: '---'
										},
										{
											label: '学历:',
											value: '---'
										},
										{
											label: '团队结构:',
											value: '---'
										},
										{
											label: '教学能力:',
											value: '---'
										}
									]
								}, {
									title: '（五）教学设计',
									infoData: [
										{
											label: '1、课程模式',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '2、教学内容与设计',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '3、教学资源【自行录制、引用资源、购买（版权）】',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										}
									]
								}, {
									title: '（六）教学实施',
									infoData: [
										{
											label: '1、教学模式',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '2、方法与手段',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '3、课外活动',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '4、教学成果',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '5、教学评价',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										}
									]
								},
							]
						},
						{
							title: '二、建设水平',
							data: [
								{
									title: '（一）与校内标准比较',
									infoData: [
										{
											label: '1、建设水平:',
											value: 'xxxxxxxx'
										},
										{
											label: '2、校企合作共同开发:',
											value: '是',
											tableData: {
												header: ['企业名称', '对接人员', '企业投入'],
												body: [
													{
														enterpriseName: '123公司',
														dockingPersonnel: '张三',
														enterpriseInvestment: '100w'
													},
													{
														enterpriseName: '123公司',
														dockingPersonnel: '张三',
														enterpriseInvestment: '100w'
													}
												]
											}
										},
										{
											label: '3、教学方法与手段改革:',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '4、教学考核方式改革:',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问题，原因分析。技术不超过500字。自我诊改务必写实，无需等级性结论。'
										},
										{
											label: '5、教学成果:',
											progress: [
												{
													name: '知识目标达成度',
													value: '50%'
												},
												{
													name: '能力目标达成度',
													value: '10%'
												},
												{
													name: '素质目标达成度',
													value: '70%'
												},
												{
													name: '学生课程达标率 ',
													value: '86.67%'
												}
											]
										}
									]
								},
								{
									title: '（二）与标杆课程比较',
									infoData: [
										{
											label: '课程体系:',
											value: 'xxxxxxxxx'
										},
										{
											label: '教学资源:',
											value: ''
										},
										{
											label: '课外实践:',
											value: ''
										},
										{
											label: '教学成果:',
											value: ''
										}
									]
								},
								{
									title: '（三）课程特色',
									infoData: [
										{
											label: '1、课程特色:',
											value: '诊断与改进工作概述，字数500字以内，报告内容必须真实准确。每项诊断工作的“自我诊断意见”需阐明目标达成程度，主要成绩，存在问'
										}
									]
								}
							]
						},
						{
							title: '三、存在问题',
							data: [
								{
									title: '',
									infoData: [
										{
											label: '1、课程定位是否准确',
											value: '是'
										},
										{
											label: '2、教学模式是否科学',
											value: 'xxxxxxxxxxx'
										},
										{
											label: '3、教学方法与手段是否先进',
											value: 'xxxxxxxx'
										},
										{
											label: '4、教学团队构成是否合理',
											value: 'xxxxxxxx'
										},
										{
											label: '5、实践教学条件是否满足教学要求（按学校标准）',
											value: 'xxxxxxxx'
										},
										{
											label: '6、教学资源建设是否丰富（资源种类+数量+覆盖率的分析）',
											value: 'xxxxxxxx'
										},
										{
											label: '7、课程考核评价是否合理（过程性考核+终结性考核的成绩呈正态分布）',
											value: 'xxxxxxxx'
										},
										{
											label: '8、课程达标率（平时+终结分别在90%以上）',
											value: 'xxxxxxxx'
										},
										{
											label: '9、自我剖析其他方面',
											value: 'xxxxxxxx'
										}
									]
								}
							]
						},
						{
							title: '四、对策及诊改措施',
							data: [
								{
									title: '',
									infoData: [
										{
											label: '1、对策及诊改措施',
											value: '存在问题与原因分析应各占一半左右篇幅。每项诊断工作的“改进措施”需突出针对性、注重可行性，字数不超过200字。'
										}
									]
								}
							]
						},
						{
							title: '五、诊改成效分析',
							data: [
								{
									title: '',
									infoData: [
										{
											label: '1、诊改成效分析',
											value: '存在问题与原因分析应各占一半左右篇幅。每项诊断工作的“改进措施”需突出针对性、注重可行性，字数不超过200字。'
										}
									]
								}
							]
						}
					]
				},
				
				menuOpen: false,
				barFixed: true,
				barHeight: "44",
				barTop: 0,
				iconShow: true,
				barId: "0",
				tabList: [{
					text: "基本情况",
					navTarget: "#item1"
				}, {
					text: "建设水平",
					navTarget: "#item2"
				}, {
					text: "存在问题",
					navTarget: "#item3"
				}, {
					text: "对策及诊改措施",
					navTarget: "#item4"
				}, {
					text: "诊改成效分析",
					navTarget: "#item5"
				}]
			};
		},
		onPageScroll: function(e) {
			this.$refs.barTabNav._selectedTab(e.scrollTop);
		},
		onLoad(val) {
			setTimeout(() => {
				this.loading = true
			}, 500)
		},
		methods: {
			menuChange() {
				this.menuOpen = !this.menuOpen;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		position: relative;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
	.diagnosisDetail {
		background: #eaeaea;
	}
	.diagnosisDetailPageContent {
		overflow: hidden;
		background: #fff!important;
		margin-bottom: 20upx;
	}
	.title {
		height: 120upx;
		padding-top: 40upx;
		.titleName {
			width: 100%;
			text-align: center;
			height:34upx;
			font-size:36upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.titleCode {
			width: 100%;
			text-align: center;
			margin-top: 16upx;
			font-size:28upx;
			font-weight:bold;
			color:rgba(119,119,119,1);
		}
	}
	.tabbody {
		position: relative;
		width: 100%;
		.itemTitle {
			margin: 40upx auto;
			width: 290upx;
			height:	50upx;
			line-height: 50upx;
			background:	rgba(56,191,177,1);
			border-radius: 25upx;
			font-size: 32upx;
			text-align: center;
			font-weight: bold;
			color:rgba(255,255,255,1);
		}
		.index3Title {
			width: 340upx;
		}
		.childBlock {
			padding: 0 30upx;
			.childTitle {
				display: flex;
				align-items: center;
				justify-content: left;
				margin: 10upx 0;
				.borderLeft {
					width:10upx;
					height:30upx;
					background:rgba(56,191,177,1);
					border-radius:5px;
				}
				.childTitleText {
					font-size:	32upx;
					font-weight:bold;
					color:rgba(51,51,51,1);
				}
			}
			.childContent {
				display: block;
				overflow: hidden;
				.childView {
					overflow: hidden;
					width: 100%;
					.lableIndex1 {
						width: 100%;
						margin: 10upx 0;
						display: flex; 
						.childLabel1 {
							flex: 2;
							text-align: right;
							margin-right: 10upx;
							font-size:	26upx;
							font-weight: bold;
							color:rgba(85,85,85,1);
						}
						.childValue1 {
							flex: 5;
							font-size: 26upx;
							font-weight:400;
							color:rgba(119,119,119,1);
						}
					}
					.lableIndex1End {
						display: block;
						.childLabel1 {
							font-size: 26upx;
							font-weight:bold;
							color:rgba(85,85,85,1);
						}
						.childValue1 {
							padding: 10upx;
							margin: 10upx 0;
							font-size: 26upx;
							font-weight:400;
							color:rgba(119,119,119,1);
							border-bottom: 1px solid #ccc;
						}
					}
					.labelIndex0Index1 {
						.childLabel {
							font-size: 26upx;
							font-weight:bold;
							color:rgba(85,85,85,1);
						}
						.childValue {
							padding: 10upx;
							margin: 10upx 0;
							font-size: 26upx;
							font-weight:400;
							color:rgba(119,119,119,1);
						}
						.itemTable {
							border: 1px solid #ccc;
							border-right: none;
							margin-bottom: 20upx;
							.tableHeader {
								display: flex; 
								background: #DDD;
								color: #333;
								height: 52upx;
								font-size: 26upx;
								line-height: 52upx;
								text-align: center;
								.header:nth-child(1) {
									flex: 3;
								}
								.header {
									flex: 1;
									border-right: 1px solid #ccc;
								}
							}
							.tableContent {
								text-align: center;
								font-size: 26upx;
								line-height: 52upx;
								color: #777;
								.content {
									border-top: 1px solid #ccc;
									display: flex;
									.tableChildContent:nth-child(1) {
										flex: 3;
									}
									.tableChildContent {
										flex: 1;
										border-right: 1px solid #ccc;
									}
								}
							}
						}
						.progressItem {
							display: flex;
							flex-wrap: wrap;
							margin-bottom: 30upx;
							.progressOpt {
								width: 50%;
								margin-bottom: 10upx;
								padding: 0 20upx;
								.progressTitle {
									display: flex;
									.type {
										flex: 2;
									}
									.value {
										flex: 1;
									}
								}
							}
						}
					}
				}
				.selfChild {
					width: 50%;
					float: left;
					.labelIndex0 {
						margin: 6upx 0;
						display: flex;
						.childLabel {
							flex: 4;
						}
						.childValue {
							flex: 5;
						}
					}
				}
			}
		}
	}
</style>
