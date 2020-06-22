<template>
	<view class="listMenu">
		<view class="iphoneBlock">
			<view class="title">
				<view class="fontBold">您好，</view>
				<view>请选择您要查询的平台。</view>
			</view>
			<view class="Menu">
				<view class="childMenu" @tap="menuClick(item, index)" :class="{activeIndex: activeIndex == index}" v-for="(item, index) in listData" :key="index">
					 <view class="imageWarp" :style="{background: `url(${item.imgSrc})`}"></view>
					 <view class="title">
							{{item.title}}
					 </view>
				</view>
			</view>
		</view>
		
		<belong></belong>
	</view>
</template>

<script>
	import belong from '../../components/belong/belong.vue';
	export default {
		data() {
			return {
				activeIndex: 0,
				listData: [
					{
						imgSrc: '/static/images/diagnosis.png',
						title: '诊改决策分析平台',
						moduleCode: 'analysis',
						url: '/pages/analysis/analysis'
					},
					{
						imgSrc: '/static/images/teacher.png',
						title: '教师发展平台',
						moduleCode: 'teacher',
						url: '/pages/teacher/teacher'
					},
					{
						imgSrc: '/static/images/student.png',
						title: '学生发展平台',
						moduleCode: 'student',
						url: '/pages/student/student'
					},
					{
						imgSrc: '/static/images/class.png',
						title: '课程层面诊断平台',
						moduleCode: 'class',
						url: ''
					},
					{
						imgSrc: '/static/images/system.png',
						title: '专业层面诊断平台',
						moduleCode: 'majorDiagnose',
							url: '/pages/system/system'
					}
				]
			}
		},
		
		onLoad() {
		},
		
		components: {
			belong
		},
		
		methods: {
			// 目录点击
			async menuClick(item, index) {
				this.activeIndex = index;
				let params  = {
					userId: this.$store.getters.user.userId,
					moduleCode: item.moduleCode,
					userType: this.$store.getters.user.userType
				}
			
				const url = this.address.main + this.api.login.findUserCanViewModule;
				let	result = await this.request.post(url, params);
			 if (result.status === 'SUCCESS') {
					uni.navigateTo({
						url: item.url
					})
				}
			} 
		}
	}
</script>

<style lang="scss" scoped>
	.listMenu {
		.title {
			margin-top: 250upx;
			margin-left: 80upx;
			view {
				font-size: 48upx;
			}
			.fontBold {
				font-weight: bold;
			}
		}
		
		.Menu {
			width: 630upx;
			display: block; 
			margin: 70upx auto 30upx;
			overflow: hidden;
			.childMenu {
				width: 100%;
				height: 180upx;
				position: relative;
				margin-bottom: 20upx;
				border-radius: 15upx;
				background: #C5C8D8;
				margin-bottom: 30upx;
				overflow: hidden;
				.imageWarp {
					width: 116upx;
					height: 128upx;
					margin: 10px 10px;
					background-position: center!important;
					background-size: 100% 100% !important;
					position: absolute;
					left: 59upx;
					top: 13upx;
				}
				.title {
					font-size: 36upx;
					color: #fff;
					width: 100%;
					height: 40upx;
					line-height: 40upx;
					position: absolute;
					left: 140upx;
					top: -180upx;
				}
			}
			.activeIndex {
				background: #385ADB!important;
			}
		}
	}
</style>
