/**
 * 环境配置封装
 */
type ENV = 'dev' | 'stg' | 'prd'

let env: ENV = 'dev'
if (location.host === 'localhost:8080') {
  env = 'dev'
} else if (location.host === 'driver-stg.marsview.cc') {
  env = 'stg'
} else {
  env = 'prd'
}

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/485faea6035c77362cabbaca1701dcc2/api'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/485faea6035c77362cabbaca1701dcc2/api'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/485faea6035c77362cabbaca1701dcc2/api'
  }
}

export default {
  env,
  ...config[env]
}
