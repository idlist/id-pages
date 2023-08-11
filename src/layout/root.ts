import m from 'mithril'
import './root.sass'
import Header from '@/sections/header'
import Nav from '@/sections/nav'
import MasteryTree from '@/sections/mastery-tree'
import SkillWishlist from '@/sections/skill-wishlist'
import About from '@/sections/about'
import BackToTop from '@/sections/footer'

const Root: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('div', { class: 'container' }, [
          m(Header),
          m(Nav),
          m(MasteryTree),
          m(SkillWishlist),
          m(About),
          m(BackToTop),
        ]),
      ]
    },
  }
}

export default Root