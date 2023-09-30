import React, { useCallback, useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'

const { Sider } = Layout

const App: React.FC = () => {
  const { collapsed, updateUserInfo } = useStore()
  // 获取用户信息,并且更新到store中
  // 使用useCallback来缓存函数，避免每次渲染都创建新的函数
  const getUserInfo = useCallback(async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }, [updateUserInfo])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (
    <Watermark content='React'>
      <Layout>
        <Sider collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.wrapper}>
            <Outlet />
          </div>
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
