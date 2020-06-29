<template>
	<view class="overview">
		<!--
			loading
		-->
		<view class="load-progress" v-if="isLoading == true" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-systemPro" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-systemPro"></view>
		</view>
	
		<!--
			预警
		-->
		<view class="title qiun-bg-white qiun-title-bar qiun-common-mt marginT20">
			<view class="qiun-title-class-light leftBlock">课程信息</view>
		</view>
		
		<!--
			搜索
		-->
		<view class="search">
			<view class="searchItem">
				<input type="text" placeholder="课程代码" v-model="searchForm.data.classCode" />
			</view>
			<view class="searchItem">
				<input type="text" placeholder="承担部门" v-model="searchForm.data.facultyName"/>
			</view>
			<view class="searchItem">
				<input type="text" placeholder="开设专业" v-model="searchForm.data.majorName"/>
			</view>
			<button class="searchBtn" @click="initData" type="primary">查看</button>
		</view>
		
		<!--
			消息
		-->
		<view class="message">
			<view class="child" v-for="(item, index) in listData" :key="index" @tap="toDetail(item)">
				<view class="code">
					{{item.classCode}}
				</view>
				<view class="desc">
					<view class="name">
						{{item.className}}
					</view>
					<view class="full">
						{{item.facultyName}}-{{item.majorName}}
					</view>
				</view>
				<image src="/static/images/lookInfo.png"></image>
			</view>
			<button v-show="listData.length < totalNum" @click="facultyClick" class="lookMoreBtn">查看更多</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadProgress: 0,
				isLoading: true,
				
				// 列表数据 总数
				listData: [],
				totalNum: 0,
				
				searchForm: {
					pageSize: 15,
					pageNum: 1,
					data: {
						classCode: '',
						facultyName: '',
						majorName: ''
					}
				}
			}
		},
		mounted() {
			this.findByPage();
		},
		methods: {
			// 跳转
			toDetail(val) {
				uni.navigateTo({
					url: `/pages/class/diagnosisDetail?data=${JSON.stringify(val)}`
				})
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
			
			// 获取数据
			async findByPage() {
				this.LoadProgress();
				let params = Object.assign({}, this.searchForm);
				params.data = JSON.stringify(params.data);
				const url = this.address.classModel + this.api.classModel.findByPage;
				let	result = await this.request.post(url, params);
				this.LoadProgress(true);
				this.totalNum = result.total;
				this.listData.push(...result.data);
			},
			
			// 搜索
			initData() {
				this.listData = [];
				this.searchForm.pageNum = 1;
				this.findByPage();
			},
			
			// 查看更多
			facultyClick() {
				this.searchForm.pageNum += 1;
				this.findByPage();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.overview {
		background: #fff;
		overflow: hidden;
		.marginTop20 {
			margin-top: 20upx;
		}
		
		.lookMoreBtn {
			width: 90%;
			height:	60upx;
			line-height: 60upx;
			font-size: 28upx;
			margin: 20upx auto;
			color: #385ADB;
			background:rgba(238,241,254,1);
			border:1px solid rgba(56,90,219,1);
			border-radius:10upx;
		}
		.message {
			padding: 10upx 20upx;
			.child {
				display: flex;
				margin: 10upx 0;
				height: 100upx;
				image {
					width: 56upx;
					height: 56upx;
					margin-top: 22upx;
				}
				.code {
					font-size: 32upx;
					font-weight:bold;
					flex: 1;
				}
				
				.desc {
					flex: 4;
					overflow: hidden;
					.name {
						font-size: 30upx;
						font-weight:bold;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.full {
						
					}
				}
			}
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
				color: #777;
				border: 1px solid #ccc;
				input {
					height: 60upx;
					line-height: 60upx;
					text-align: left;
					padding-left: 20upx;
				}
			}
			.searchBtn {
				width: 18%;
				float: left;
				height: 60upx;
				line-height: 60upx;
				margin-left: 10upx;
				font-size: 26upx;
				background: #38BFB1;
			}
		}
		.title {
			font-weight: bold;
			.leftBlock {
				font-size: 32upx;
			}
		}
	}
</style>
