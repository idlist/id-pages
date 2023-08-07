import m from 'mithril'
import './root.sass'
import Header from '@/components/header'
import MasteryTree from '@/components/mastery-tree'
import SkillWishlist from '@/components/skill-wishlist'
import About from '@/components/about'

const RootLayout: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('div', { class: 'container' }, [
          m(Header),
          m(MasteryTree),
          m(SkillWishlist),
          m(About),
        ]),
      ]
    },
  }
}

export default RootLayout