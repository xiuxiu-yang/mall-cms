import { App } from 'vue'

import { registerElement } from './register-element'
import { registerProperies } from './register-properies'

import 'element-plus/dist/index.css'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperies)
}
