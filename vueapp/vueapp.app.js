import Vue from 'vue'
import singleSpaVue from 'single-spa-vue'
import Vueapp from './vueapp.vue'

Vue.config.productionTip = false

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vueapp',
    render: (h) => h(Vueapp),
  },
})

export const bootstrap = [vueLifecycles.bootstrap]

export const mount = [vueLifecycles.mount]

export const unmount = [vueLifecycles.unmount]
