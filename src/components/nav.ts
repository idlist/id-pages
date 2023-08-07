import m from 'mithril'
import './nav.sass'

interface NavItemAttrs {
  name: string
  link: string
}

const NavItem: m.ClosureComponent<NavItemAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m(m.route.Link, { class: 'nav-item', href: attrs.link }, attrs.name),
      ]
    },
  }
}

const NavItemList: NavItemAttrs[] = [
  {
    name: 'home',
    link: '/',
  },
  {
    name: 'showcase',
    link: '/showcase',
  },
  {
    name: 'projects',
    link: '/projects',
  },
]

const Nav: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('hr', { class: 'nav-divider' }),
        m('div', { class: 'nav' }, [
          ...NavItemList.map((i) => m(NavItem, i)),
        ]),
        m('hr', { class: 'nav-divider' }),
        m('div', { class: 'nav-padding' }),
      ]
    },
  }
}

export default Nav