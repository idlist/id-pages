import m from 'mithril'
import './index.sass'
import Root from './layout/root'
import Showcase from './layout/showcase'
import ListOfProjects from './layout/projects'

const root = document.getElementById('root') as HTMLElement

m.route(root, '/', {
  '/': Root,
  '/showcase': Showcase,
  '/projects': ListOfProjects,
})