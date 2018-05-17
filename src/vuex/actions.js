import {
	getTemplates
} from '../api/api'

const actions = {
	getImgLoop({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'top'
		}).then(res => {
			commit('updateModuleImgLoop', res.data)
		})
	},
	getModuleOne({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'recommend'
		}).then(res => {
			commit('updateModuleOne', res.data)
		})
	},
	getModuleTwo({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'hot'
		}).then(res => {
			commit('updateModuleTwo', res.data)
		})
	},
	getModuleThree({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'short'
		}).then(res => {
			commit('updateModuleThree', res.data)
		})
	},
	getModuleFour({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'new'
		}).then(res => {
			commit('updateModuleFour', res.data)
		})
	},
	getModuleSearch({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'other'
		}).then(res => {
			commit('updateModuleSearch', res.data)
		})
	},
	getModuleChapter({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'chapter'
		}).then(res => {
			let returnArr = [],
				tempArr = res.data
			for (let i = 0; i < 3; i++) {
				let number = Math.floor(Math.random() * tempArr.length)
				returnArr[i] = tempArr[number]
				tempArr.splice(number, 1)
			}
			commit('updateModuleChapter', returnArr)
		})
	},
	getQrcode({
		state,
		commit
	}) {
		getTemplates({
			sex: state.u_sex,
			template_name: 'code'
		}).then(res => {
			commit('updateModuleQrcode', res.data)
		})
	}
}
export default actions