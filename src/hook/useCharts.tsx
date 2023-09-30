import * as echarts from 'echarts'
import { RefObject, useEffect, useRef, useState } from 'react'

// 定义一个echarts的hook
export const useCharts = (): [RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>()
  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLDivElement)
    setChartInstance(chart)
  }, [])
  return [chartRef, chartInstance]
}
