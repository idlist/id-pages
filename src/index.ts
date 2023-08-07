import m from 'mithril'
import './index.sass'
import RootLayout from './layout/root'

const root = document.getElementById('root') as HTMLElement

m.route(root, '/', {
  '/': RootLayout,
})