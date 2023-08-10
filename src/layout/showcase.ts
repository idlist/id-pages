import m from 'mithril'
import './showcase.sass'
import Header from '@/components/header'
import Nav from '@/components/nav'
import MusicCompose from '@/components/music-compose'
import LogoDesign from '@/components/logo-design'
import BackToTop from '@/components/footer'

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