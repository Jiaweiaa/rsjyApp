import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: ''
	},
	mutations: {
		login(state, user) {
			state.user = user
			console.log(state.user)
			// 缓存用户信息
			uni.setStorageSync('user', JSON.stringify(user))
		},
		logout(state) {
			state.user = null
			// 清理缓存用户信息
			uni.removeStorageSync('user')
		}
	},
	actions: {
		login({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				commit('login', params)
				resolve()
			})
		},
		logout({
			commit
		}) {
			commit('logout')
		}
	},
	getters: {
		user: state => {
			let user = uni.getStorageSync('user')
			return JSON.parse(user)
		}
	}
})

export default store;