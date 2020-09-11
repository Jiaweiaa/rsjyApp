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
				nowId: '',
				
				loading: false,
				
				pageData: {
					title: {
						name: '世界建筑史',
						code: '12080301'
					},
					list: [
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
			this.nowId = val.id;
			this.pageData.title.name = val.name;
			this.pageData.title.code = val.code;
			this.getDiagnosticReport();
			setTimeout(() => {
				this.loading = true
			}, 500)
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
			
			// 获取详情
			async getDiagnosticReport() {
				let params = {
					id: this.nowId
				}
				this.LoadProgress();
				const url = this.address.classModel + this.api.classModel.getDiagnosticReport;
				let	result = await this.request.post(url, params);
				this.pageData.list = result.data;
				this.LoadProgress(true);
			},
			
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
