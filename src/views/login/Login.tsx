import { useState } from 'react'
import styles from './index.module.less'
import { Input, Button, Form, App } from 'antd'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage.ts'
import { useStore } from '@/store'

export default function LoginFC() {
  const updateToken = useStore(state => state.updateToken)
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      // 发送登录请求
      const data: any = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登录成功')
      // URLSearchParams是一个内置对象，可以用来获取url中的参数
      // location.search获取到的是url中?后面的参数
      const params = new URLSearchParams(location.search)
      // 通过requestAnimationFrame来实现延迟跳转
      requestAnimationFrame(() => {
        // 如果url中有callback参数，则跳转到callback指定的页面，否则跳转到welcome页面
        location.href = params.get('callback') || '/welcome'
      })
    } catch (e) {
      // 如果登录失败，则提示错误信息,并且关闭loading
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: '请输入您的用户名' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '请输入您的密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
