<template>
	<view class="qiun-columns iphone">
		<cu-custom bgColor="bg-gradual-student" class="viewHeader bg-gradual-student" :isBack="true">
			<block class="back" slot="backText">返回</block>
			<block class="title" slot="content">学生发展平台</block>
		</cu-custom>
		
		<view class="tabs">
			<view @tap="activeIndexChange(1)" :class="{active: activeIndex == 1}">
				自我检测
			</view>
			<view @tap="activeIndexChange(2)" :class="{active: activeIndex == 2}">
				发展报告
			</view>
		</view>
		
		<view class="blockRow">
			<testing v-if="activeIndex == 1"></testing>
			<development v-else></development>
		</view>
		<belong></belong>
	</view>
</template>

<script>
	import belong from '../../components/belong/belong.vue';
	import testing from './testing.vue';
	import development from './development.vue';
	
	export default {
		data() {
			return {
				activeIndex: 1
			}
		},
		components: {
			belong,
			testing,
			development
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
			background: #37BD9C;
		}
	}
	.blockRow {
		margin-bottom: 15upx;
	}
}

</style>