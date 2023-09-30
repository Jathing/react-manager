// 接口类型定义
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

// ResultData<T> 用于列表数据, 包含分页信息
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

// 登录接口 namespace是ts的语法糖, 用于定义命名空间,可以避免命名冲突
export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}

export namespace User {
  export interface params {
    userId?: number
    userName?: string
    state?: number
  }

  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    mobile: string
    deptId: string
    deptName: string
    job: string
    state: number
    role: number
    roleList: string
    createId: number
    userImg: string
  }
}

export namespace DashboardType {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }
  export interface PieData {
    value: number
    name: string
  }
  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}
