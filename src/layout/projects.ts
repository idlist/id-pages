import m from 'mithril'
import './projects.sass'
import Header from '@/sections/header'
import Nav from '@/sections/nav'
import BackToTop from '@/sections/footer'

const Projects: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('div', { class: 'container' }, [
          m(Header),
          m(Nav),
          m(BackToTop),
        ]),
      ]
    },
  }
}

export default Projects