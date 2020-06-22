  /**
   *  wjw
	 * 	接口 
   */

export default {

	/*
		 login 登录
		 findUserCanViewModule 有权限进入
	*/
	login: {
		login: '/api/user/login',
		findUserCanViewModule: '/api/user/findUserCanViewModule'
	},
 
 /*
 	 findAll 首页大屏
	 limits 统计
 	 warnAnalysisDetail 预警
	 warnAlarmList 预警条数
 */
  analysis: {
    findAll: '/api/chartInterface/largeScreen',
    limits: '/api/user/findUserCanViewModule',
		warnAnalysisDetail: '/api/chartInterface/warnAnalysisDetail',
		warnAlarmList: '/api/chartInterface/warnAlarmList'
  },
	
	/*
		getSchoolYear 								学年
		getIndex					 						系部类别
		getMajorAchievingRate 				排名
		getStudentAchievingRateRadar  排名维度图
		findDepartment 								获取系部下拉
		findMajor 										获取专业
		getData 											获取专业下列表数据
		getMajorWarnNum 							预警饼图数据
		getMajorDevelopmentConditions 发展情况线形图
		getWarningInfo 								预警信息
		getWarnAnalyze 								考核分析
	*/
	major: {
		getSchoolYear: '/api/cockpit/getSchoolYear',
		getIndex: '/api/developmentSummary/getIndex',
		getMajorAchievingRate: '/api/developmentSummary/getMajorAchievingRate',
		getStudentAchievingRateRadar: '/api/developmentSummary/getStudentAchievingRateRadar',
		findDepartment: '/api/majorSituationList/findDepartment',
		findMajor: '/api/majorSituationList/findMajor',
		getData: '/api/developmentWarn/getData',
		getMajorWarnNum: '/api/developmentWarn/getMajorWarnNum',
		getMajorDevelopmentConditions: '/api/developmentWarn/getMajorDevelopmentConditions',
		getWarningInfo: '/api/developmentWarn/getWarningInfo',
		getWarnAnalyze: '/api/developmentWarn/getWarnAnalyze'
	},
	
	/*
		getSelfTest 		学生自我检测
		getDevelopmentReport 发展报告
	*/
	student: {
		getSelfTest: '/api/selfTest/getSelfTest',
		getDevelopmentReport: '/api/developmentReport/getDevelopmentReport'
	},
	
	/*
		getSelfTest 		教师自我检测
		getDevelopmentReport 发展报告
	*/
	teacher: {
		getSelfTest: '/api/selfTest/getSelfTest',
		getDevelopmentReport: '/api/developmentReport/getDevelopmentReport'
	}
}
