import m from 'mithril'
import './showcase.sass'
import Header from '@/sections/header'
import Nav from '@/sections/nav'
import MusicCompose from '@/sections/music-compose'
import LogoDesign from '@/sections/logo-design'
import BackToTop from '@/sections/footer'

const Showcase: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('div', { class: 'container' }, [
          m(Header),
          m(Nav),
          m(MusicCompose),
          m(LogoDesign),
          m(BackToTop),
        ]),
      ]
    },
  }
}

export default Showcase