import { FC, useEffect, useState } from 'react'
import { Button, Card, Descriptions } from 'antd'
import styles from './index.module.less'
import { useStore } from '@/store'
import { formatMoney, formatNum, formatState } from '@/utils'
import api from '@/api'
import { DashboardType } from '@/types/api.ts'
import { useCharts } from '@/hook/useCharts.tsx'

const Dashboard: FC = () => {
  const [report, setReport] = useState<DashboardType.ReportData>()
  const userInfo = useStore(state => state.userInfo)
  const [lineRef, lineChart] = useCharts()
  const [pieCityRef, pieCityChart] = useCharts()
  const [pieAgeRef, pieAgeChart] = useCharts()
  const [radarRef, radarChart] = useCharts()

  // 加载图表数据,只加载一次,所以第二个参数传空数组
  useEffect(() => {
    renderLineChart()
    renderPieCityChart()
    renderPieAgeChart()
    renderRadarChart()
  }, [lineChart, pieCityChart, pieAgeChart, radarChart])

  // 加载折线图数据
  const renderLineChart = async () => {
    // 如果图表不存在,则不执行
    if (!lineChart) return
    const data = await api.getLineData()
    lineChart?.setOption({
      xAxis: {
        type: 'category',
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        data: ['订单', '流水']
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      series: [
        {
          name: '订单',
          data: data.order,
          type: 'line'
        },
        {
          name: '流水',
          data: data.money,
          type: 'line'
        }
      ]
    })
  }
  // 加载城市饼图数据
  const renderPieCityChart = async () => {
    if (!pieCityChart) return
    const data = await api.getPieCityData()
    pieCityChart?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data
        }
      ]
    })
  }
  // 加载年龄饼图数据
  const renderPieAgeChart = async () => {
    if (!pieAgeChart) return
    const data = await api.getPieAgeData()
    pieAgeChart?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: ['30%', '50%'],
          roseType: 'angle',
          data
        }
      ]
    })
  }
  // 加载雷达图数据
  const renderRadarChart = async () => {
    if (!radarChart) return
    const data = await api.getRadarData()
    radarChart?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      tooltip: {
        trigger: 'item'
      },

      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: '司机模型诊断',
          type: 'radar',
          data: data.data
        }
      ]
    })
  }

  useEffect(() => {
    getReportData()
  }, [])
  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  const hanlefresh = () => {
    renderPieAgeChart()
    renderPieCityChart()
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src={userInfo.userImg} alt='头像未加载' />
        <Descriptions title='欢迎新同学,每天都要进步'>
          <Descriptions.Item label='用户id'>{userInfo.createId}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}人</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{report?.cityNum}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={hanlefresh}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieCityRef} className={styles.itemPie}></div>
            <div ref={pieAgeRef} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
