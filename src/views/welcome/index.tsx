import { FC } from 'react'
import styles from './index.module.less'

const Index: FC = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React18通用后台管理系统</div>
        <div className={styles.desc}>React18 + ReactRouter6.0 + Antd5.4 + Vite + TypeScript5.0实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}

export default Index
