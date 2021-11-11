import { registerApplication, start } from 'single-spa'

registerApplication(
  'vue',
  () => import('./vueapp/vueapp.app'),
  () => true,
)

registerApplication(
  'react',
  () => import('./src/index'),
  (location) => location.pathname.startsWith('/'),
)

start()
