import 'vue-router'

type ILayout = 'main' | 'auth'

declare module 'vue-router' {
  interface RouteMeta {
    layout: ILayout,
    auth: boolean
  }
}