import m from 'mithril'
import './root.sass'
import Header from '@/components/header'
import Nav from '@/components/nav'
import MasteryTree from '@/components/mastery-tree'
import SkillWishlist from '@/components/skill-wishlist'
import About from '@/components/about'

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
        ]),
      ]
    },
  }
}

export default Root