import mutations from './mutations'
import actions from './actions'
import {
	getCookie
} from '../assets/js/common'

const store = new Vuex.Store({
	state: {
		u_sex: getCookie('u_sex') || 0,
		moduleImgLoop: null,
		moduleOne: null,
		moduleTwo: null,
		moduleThree: null,
		moduleFour: null,
		moduleSearch: null,
		moduleChapter: null,
		moduleQrcode: null
	},
	mutations,
	getters: {
		u_sex: function(state) {
			return state.u_sex == 0 ? false : true // 女频 true ，男频 false  默认男频
		},
		sex_color: function(state) {
			return state.u_sex == 0 ? '#52bfbc' : '#ff6060'
		}
	},
	actions
})

export default store