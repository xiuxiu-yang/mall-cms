import { App } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function registerProperies(app: App) {
  app.config.globalProperties.$filter = {
    format(utcString: string, format: string = DEFAULT_DATE_FORMAT) {
      return dayjs.utc(utcString).utcOffset(8).format(format)
    }
  }
}
