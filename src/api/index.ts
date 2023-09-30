import request from '@/utils/request'
import { DashboardType, Login, ResultData, User } from '@/types/api'

export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  // 获取工作台报表汇总数据
  getReportData() {
    return request.get<DashboardType.ReportData>('/order/dashboard/getReportData')
  },
  // 获取工作台折线图数据
  getLineData() {
    return request.get<DashboardType.LineData>('/order/dashboard/getLineData')
  },
  // 获取城市饼图数据
  getPieCityData() {
    return request.get<DashboardType.PieData[]>('/order/dashboard/getPieCityData')
  },
  // 获取年龄饼图数据
  getPieAgeData() {
    return request.get<DashboardType.PieData[]>('/order/dashboard/getPieAgeData')
  },
  // 获取雷达图数据
  getRadarData() {
    return request.get<DashboardType.RadarData>('/order/dashboard/getRadarData')
  },
  // 获取用户列表
  getUserList() {
    return request.get<ResultData<User.UserItem>>('/users/list')
  }
}
