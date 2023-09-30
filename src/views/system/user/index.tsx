import { Button, Form, Input, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import api from '@/api'
import { User } from '@/types/api.ts'
import {formatDate} from "@/utils";

const UserList = () => {
  const [data, setData] = useState<User.UserItem[]>([])
  useEffect(() => {
    getUserList()
  }, [])
  const getUserList = async () => {
    const data = await api.getUserList()
    setData(data.list)
    console.log(data.list)
  }

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          1: '超级管理员',
          2: '普通用户',
          3: '体验管理员',
          4: '普通用户'
          // 本质是[role]是访问对象的属性，所以可以用[]来访问
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '试用期',
          3: '离职'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
			render: (createTime: string) => {
				return formatDate(createTime)
			}
    },
    // {
    //   title: '最后登录时间',
    //   dataIndex: 'lastLoginTime',
    //   key: 'lastLoginTime'
    // },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: () => {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div className='userList'>
      <Form className='searchForm' layout='inline' initialValues={{ state: 1 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>试用期</Select.Option>
            <Select.Option value={3}>离职</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary'>搜索</Button>
            <Button type='default'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Space>
              <Button type='primary'>新增</Button>
              <Button type='primary' danger>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <div className='tableWrapper'>
          <Table bordered rowSelection={{ type: 'checkbox' }} dataSource={data} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export default UserList
