<template>
	<view :id="'luBarTabNav'+barId" class="lu-bar-tab-nav">
		<view id="luTabStatic" class="inforTab" :style="{height:barHeightStyles}">
			<image @tap="_menuController" class="bokImage" :src="menuOpen ? '/static/images/closeMenu.png': '/static/images/openMenu.png'"></image>
			<view 
				v-show="menuOpen"
				class="lu-tab-item" 
				v-for="(item,index) in tabList" 
				:class="{ 'lu-tab-itemActive' : selectedIndex === index }"
				:key="index" 
				@tap="_scrollToTarget(index)">
				<view v-if="!!iconShow" class="lu-tab-icon"></view>
				<view class="lu-tab-text">{{item.text}}</view>
			</view>
		</view>
		<view class="lu-tab-content"><slot></slot></view>
	</view>
</template>

<script>
	export default {
		name: 'lu-bar-tab-nav',
		props: {
			menuOpen:{
				type: Boolean,
				default:true
			},
			barFixed:{
				type:Boolean,
				default:true
			},
			iconShow:{
				type:Boolean,
				default:false
			},
			transitionShow:{
				type:Boolean,
				default:false
			},
			barHeight:{
				type:[String,Number],
				default:44
			},
			barTop:{
				type:[String,Number],
				default:0
			},
			barId:{
				type:[String,Number],
				default:0
			},
			tabList: {
				type:Array,
				default:function () {
					return [{
						//text:"text",
						//navTarget:"#item1",
						// iconClass:"iconClass"
					}]
				}
			}
			
		},
		data() {
			return {
				barShow:false,
				selectedIndex:0
			};
		},
		computed:{
			barHeightStyles:function () {
				return this.barHeight?this.barHeight+'px':'44px';
			}
		},
		methods: {
			_barInit:async function (index){
				let navTargetTop = [];
				let duration = 0;
				let viewScrollTop = 0;
				let viewHeight = 0;
				for (let i = 0,len=this.tabList.length; i < len; i++) {
					navTargetTop[i]= await this._queryMultipleNodes(this.tabList[i]["navTarget"]).then(res => {
						let navTarget = res[0],
							viewPort = res[1];
						viewHeight = viewPort.height;
						viewScrollTop = viewPort.scrollTop;
						const scrollTop = parseInt(navTarget.top) + viewPort.scrollTop - this.barTop - this.barHeight;
						return scrollTop;
					});
				}
				if (!!this.transitionShow) {
					duration = 200;
				} 
				return {
					navTargetTop:navTargetTop,
					duration:duration,
					viewHeight:viewHeight,
					viewScrollTop:viewScrollTop
				};
			},
			_pageScroll:async function(i){
				const elment = await this._barInit(i);
				let scrollTop = elment["navTargetTop"][i];
				let duration = elment["duration"];
				let viewHeight = elment["viewHeight"];
				let viewScrollTop = elment["viewScrollTop"];
				if (Math.abs(scrollTop-viewScrollTop)>viewHeight) {
					if (scrollTop>viewScrollTop) {
						await uni.pageScrollTo({
							scrollTop:(scrollTop-viewHeight),
							duration:0
						});
					}else{
						await uni.pageScrollTo({
							scrollTop:(scrollTop+viewHeight),
							duration:0
						});
					}
				}
				await uni.pageScrollTo({
					scrollTop:(scrollTop+1),
					duration:duration
				});
				// #ifndef H5
				const view = await this._queryMultipleNodes();
				viewScrollTop = view[0].scrollTop;
				if (scrollTop>viewScrollTop&&duration!==0) {
					uni.pageScrollTo({
						scrollTop:(scrollTop+1),
						duration: 0
					})
				}
				// #endif
			},
			_scrollToTarget:function(i) {
				this._pageScroll(i);
			},
			_queryMultipleNodes:function (e,notThis) {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery();
					if (!!notThis) {
						view.in(this);
					}
					if (!!e) {
						view.select(e).boundingClientRect();
					}
					view.selectViewport().fields({size: true,scrollOffset: true});
					view.exec(function(res) {
						resolve(res);
					});
					
				});
			},
			_showBarFixed:function () {
				this._queryMultipleNodes("#luTabStatic",true).then(res => {
					let tabNav = res[0];
					if (tabNav.top<=this.barTop) {
						this.barShow=true;
					}else{
						this.barShow=false;
					}
				});
			},
			_selectedTab:function (y) {
				this._barInit().then((res)=>{
					let itemIndex = 0;
					for (let i = 0,len=res["navTargetTop"].length; i < len; i++) {
						if (y >=res["navTargetTop"][i]) {
							itemIndex = i;
						}
					}
					this.selectedIndex = itemIndex;
				});
				if (!!this.barFixed) {
					this._showBarFixed();
				}
			},
			_menuController(){
				this.$emit("menuChange")
			}
		}
	};
</script>

<style lang="scss" >
	.lu-bar-tab-nav{
		position:relative;
		width: 100%;
		.inforTab {
			position: fixed;
			top: 250upx;
			right: 0upx;
			z-index: 10;
			height: 800upx;
			text-align: right;
			.bokImage {
				width: 40upx;
				height: 40upx;
				z-index: 20;
				position: relative;
				right: 20upx;
			}
			.lu-tab-item {
				padding: 0 30upx;
				overflow: hidden;
				line-height: 74upx;
				text-align: center;
				height:74upx;
				background:rgba(150,156,189,1);
				border:5upx solid rgba(255,255,255,1);
				box-shadow:0px 0px 10upx 0px rgba(0, 0, 0, 0.5);
				border-radius:37upx;
				color: #fff;
				display: block;
				margin: 20upx 20upx;
			}
			.lu-tab-itemActive {
				background:rgba(69,84,175,1);
				border:5upx solid rgba(255,255,255,1);
			}
		}
		
	}
</style>
