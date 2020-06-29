<template>
	<view class="qiun-columns iphone">
		<cu-custom bgColor="bg-gradual-class" class="viewHeader bg-gradual-class" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">课程层面诊断平台</block>
		</cu-custom>
		
		<view class="tabs">
			<view @tap="activeIndexChange(1)" :class="{active: activeIndex == 1}">
				驾驶舱
			</view>
			<view @tap="activeIndexChange(2)" :class="{active: activeIndex == 2}">
				诊改报告
			</view>
		</view>
		
		<view class="blockRow">
			<copkit v-if="activeIndex == 1"></copkit>
			<diagnosis v-else></diagnosis>
		</view>
		<belong></belong>
	</view>
</template>

<script>
	import belong from '../../components/belong/belong.vue';
	import copkit from './copkit.vue';
	import diagnosis from './diagnosis.vue';

	export default {
		data() {
			return {
				activeIndex: 1
			}
		},
		components: {
			belong,
			copkit,
			diagnosis
		},
		methods: {
			activeIndexChange(val) {
				this.activeIndex = val;
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 750upx;
	overflow-x: hidden; 
	padding-bottom: 20upx;
	.viewHeader {
	  height: var(--status-bar-height);
	  padding-top: 50px;
	}
	.tabs {
		z-index: 999;
		overflow: hidden;
		view {
			width: 50%;
			height: 80upx;
			float: left;
			text-align: center;
			line-height: 80upx;
			font-size: 34upx;
			background: #C5C8D8;
			color: #fff;
		}
		.active {
			background: #4554AF;
		}
	}
	
	.blockRow {
		margin-bottom: 15upx;
	}
}

</style>