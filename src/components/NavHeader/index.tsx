import { FC } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd'
import styles from './index.module.less'
import { useStore } from '@/store'
import storage from '@/utils/storage.ts'

const NavHeader: FC = () => {
  const { userName, userEmail } = useStore(state => state.userInfo)
  const { collapsed, updateCollapsed } = useStore()
  const breadList = [{ title: '首页' }, { title: '工作台' }]
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱:' + userEmail
    },
    {
      key: 'logout',
      label: '退出登录'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      // 退出登录后，跳转到登录页面，并且将当前页面的url作为参数传递给登录页面
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  const toggleCollapse = () => {
    updateCollapsed()
  }

  return (
    <div className={styles.NavHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapse}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickname}>{userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
