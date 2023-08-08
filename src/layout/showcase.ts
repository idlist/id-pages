import m from 'mithril'
import './showcase.sass'
import Header from '@/components/header'
import Nav from '@/components/nav'
import BackToTop from '@/components/back-to-top'

const Showcase: m.ClosureComponent = () => {
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

export default Showcase