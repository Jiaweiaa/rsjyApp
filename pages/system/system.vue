<template>
	<view class="qiun-columns iphone">
		<cu-custom bgColor="bg-gradual-system" class="viewHeader bg-gradual-system" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">专业层面诊断平台</block>
		</cu-custom>
		
		<view class="tabs">
			<view @tap="activeIndexChange(1)" :class="{active: activeIndex == 1}">
				发展总览
			</view>
			<view @tap="activeIndexChange(2)" :class="{active: activeIndex == 2}">
				发展预警
			</view>
		</view>
		
		<view class="blockRow">
			<overview v-if="activeIndex == 1"></overview>
			<warn v-else></warn>
		</view>
		<belong></belong>
	</view>
</template>

<script>
	import belong from '../../components/belong/belong.vue';
	import overview from './overview.vue';
	import warn from './warn.vue';

	export default {
		data() {
			return {
				activeIndex: 1
			}
		},
		components: {
			belong,
			overview,
			warn
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
			background: #616B89;
		}
	}
	
	.blockRow {
		margin-bottom: 15upx;
	}
}

</style>