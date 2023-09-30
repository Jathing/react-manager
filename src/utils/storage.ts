/*
 * localStorage模块封装
 */

export default {
  /*
   * storage存储
   * @param key {String} 参数名称
   * @param value {String} 写入值
   * */
  set(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  /*
   * storage读取
   * @param key {String} 参数名称
   * @returns storage值
   * */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  remove(key: string) {
    return localStorage.removeItem(key)
  },
  clear() {
    return localStorage.clear()
  }
}
