import './index.sass'
import m from 'mithril'
import Main from './main'

m.route.prefix = '#'

const root = document.getElementById('root') as HTMLElement
m.mount(root, Main)