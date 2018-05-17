import { setCookie } from '../assets/js/common'

const mutations = {
	toGirl(state){
		state.u_sex = 1
		setCookie("u_sex",1,60*60*24*365,process.env.BASE_DOMAIN,"/")
	},
	toBoy(state){
		state.u_sex = 0
		setCookie("u_sex",0,60*60*24*365,process.env.BASE_DOMAIN,"/")
	},
	updateModuleImgLoop(state, newData){
		state.moduleImgLoop = newData
	},
	updateModuleOne(state, newData){
		state.moduleOne = newData
	},
	updateModuleTwo(state, newData){
		state.moduleTwo = newData
	},
	updateModuleThree(state, newData){
		state.moduleThree = newData
	},
	updateModuleFour(state, newData){
		state.moduleFour = newData
	},
	updateModuleSearch(state, newData){
		state.moduleSearch = newData
	},
	updateModuleChapter(state, newData){
		state.moduleChapter = newData
	},
	updateModuleQrcode(state, newData){
		state.moduleQrcode = newData
	}
}

export default mutations