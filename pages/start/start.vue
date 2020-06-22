<template>
  <div class="start_wrap iphone">
    <div class="bottom">
      <div class="icon"></div>
      <p class="title">{{ title }}</p>
      <p class="copyright">版权所有: 辽宁城市建设职业技术学院</p>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'Start',
  data () {
    return {
      title: ''
    }
  },
	onShow() {
		if(uni.getStorageSync('user')) {	
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/menuList/menuList',
					success: (res) => {
						console.log('跳转成功',res)
					},
					fail: (err) => {
						console.log('跳转失败',err)
					}
				});
			}, 3000)
		}else {
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/login/login',
					success: (res) => {
						console.log('跳转成功',res)
					},
					fail: (err) => {
						console.log('跳转失败',err)
					}
				});
			}, 1500)
		}
	}
}
</script>
<style lang="scss" scoped>
  .start_wrap {
    color: red;
		background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: -128px;
    .text{
      width:70px;
      font-size:36px;
      line-height:50px;
		}
    .bottom {
      position: absolute;
      bottom: 10px;
      line-height:20px;
			.icon {
				background: url('/static/images/logo.jpg');
			  width: 50px;
			  height: 50px;
			  background-size: 50px 50px;
			  margin:10px auto;
			}
			.title {
			  font-weight:bold;
			  font-size:24px;
			  margin-bottom:6px;
			  text-align: center;
			}
			.copyright {
			  color:#666;
			  font-size:12px;
			}
		}
}
</style>