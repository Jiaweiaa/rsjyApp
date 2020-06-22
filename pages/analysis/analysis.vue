<template>
	<view class="qiun-columns iphone">
		<cu-custom bgColor="bg-gradual-blue" class="viewHeader bg-gradual-blue" :isBack="true">
			<block class="back" slot="backText">返回</block>
			<block class="title" slot="content">诊改决策分析平台</block>
		</cu-custom>
		
		<view class="tabs">
			<view @tap="activeIndexChange(1)" :class="{active: activeIndex == 1}">
				诊改决策分析平台
			</view>
			<view @tap="activeIndexChange(2)" :class="{active: activeIndex == 2}">
				预警分析
			</view>
		</view>
		
		<view class="blockRow">
			<diagonsis v-if="activeIndex == 1"></diagonsis>
			<warn v-else></warn>
		</view>
		<belong></belong>
	</view>
</template>

<script>
	import belong from '../../components/belong/belong.vue';
	import diagonsis from './diagnosis.vue';
	import warn from './warn.vue';
	
	export default {
		data() {
			return {
				activeIndex: 1
			}
		},
		components: {
			belong,
			diagonsis,
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
		.back {
			background: yellow;
			display: inline-block;
			overflow: hidden;
		}
		.title {
			background: green;
			display: inline-block;
			overflow: hidden;
		}
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
			background: #385ADB;
		}
	}
	
	.blockRow {
		margin-bottom: 15upx;
	}
}

</style>