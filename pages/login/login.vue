<template>
	<view class="iphone">
		<view class="iphoneBlock">
			<view class="backg1"></view>
			<view class="backg2"></view>
			<view class="login">
				<view class="fontBold">您好，</view>
				<view>欢迎登录。</view>
			</view>
			<form class="form">
				<view class="cu-form-group">
					<radio-group class="radioBlock" @change="radioChange">
						<view class="teacher">
							<radio class='radio' :checked="form.type == '' ? true : false" value=""></radio>
							教师
						</view>
						<view class="student">
							<radio class='radio' :checked="form.type == 1? true : false" value="1"></radio>
							学生
						</view>
					</radio-group>
				</view>
				<view class="cu-form-group">
					<input placeholder="请输入用户名" v-model="form.userNo" name="input"></input>
				</view>
				<view class="cu-form-group">
					<input type="password" v-model="form.password" placeholder="请输入密码" name="input"></input>
				</view>
			</form>
			<button class="button" @click="sumbit" type="primary">登录</button>
		</view>
		
		<belong></belong>
	</view>
</template>

<script>
	import belong from '../../components/belong/belong.vue';

	export default {
		data() {
			return {
				form: {
					type: '',
					userNo: '',
					password: ''
				}
			}
		},
		
		components: {
			belong
		},
		
		methods: {
			radioChange(mp) {
				this.form.type = mp.detail.value;
			},
			
			 /**
			 *	登录
			 */
			async sumbit() {
				if(this.form.userNo && this.form.password) {
					const url = this.address.main + this.api.login.login;
					let	result = await this.request.post(url, this.form);
					uni.clearStorage();
					uni.setStorage('user', result.data)			
					// 存储用户数据
					this.$store.dispatch('login', result.data).then(res => {
						uni.showToast({
						    title: '登录成功',
								icon: 'none',
						    duration: 1000
						})
						
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/menuList/menuList'
							});
						}, 1000)
					})
				}else {
					let msg = '';
					if(this.form.userNo == '') {
						msg = '请输入用户名'
					}else {
						msg = '请输入密码'
					}
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-form-group {
		border-bottom: 1px solid #F1F1F3;
	}
	
	.iphone {
		height: 100vh;
		padding-top:var(--status-bar-height);
		.login {
			margin-top: 250upx;
			margin-left: 80upx;
			view {
				font-size: 48upx;
			}
			.fontBold {
				font-weight: bold;
			}
		}
		
		.backg1 {
			background: url('/static/images/loginBack.png');
			background-repeat: no-repeat;
			background-size: 100%;
			width: 430upx;
			height: 230upx;
			position: absolute;
			right: 0;
			top: 0;
		}
		.backg2 {
			background: url('/static/images/loginBack1.png');
			width: 220upx;
			background-size: 100%;
			background-repeat: no-repeat;
			height: 210upx;
			position: absolute;
			left: 0;
			bottom: -20upx;
		}
		.button {
			width: 630upx;
			margin: 180upx auto 0;
		}
		.form {
			width: 630upx;
			display: block;
			overflow: hidden;
			margin: 140upx auto 0;
			.radioBlock {
				.teacher {
					width: 150upx;
					text-align: left;
					margin-right: 15upx;
					float: left;
				}
				.student {
					width: 150upx;
					text-align: left;
					margin-right: 0;
					float: left;
				}
				.radio {
					margin-right: 10upx;
				}
			}
		}
	}
</style>
