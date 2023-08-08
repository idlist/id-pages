import m from 'mithril'
import './nav.sass'

import icon_home from '@/assets/nav/home.svg'
import icon_showcase from '@/assets/nav/showcase.svg'
import icon_projects from '@/assets/nav/projects.svg'

interface NavItemAttrs {
  name: string
  link: string
  icon: string
}

const NavItem: m.ClosureComponent<NavItemAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m(m.route.Link, { class: 'nav-item', href: attrs.link }, [
          m('img', {
            class: 'nav-item-icon',
            src: attrs.icon,
            alt: attrs.icon,
          }),
          attrs.name,
        ]),
      ]
    },
  }
}

const NavItemList: NavItemAttrs[] = [
  {
    name: 'home',
    link: '/',
    icon: icon_home,
  },
  {
    name: 'showcase',
    link: '/showcase',
    icon: icon_showcase,
  },
  {
    name: 'projects',
    link: '/projects',
    icon: icon_projects,
  },
]

const Nav: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('div', { class: 'nav' }, [
          ...NavItemList.map((i) => m(NavItem, i)),
        ]),
      ]
    },
  }
}

export default Nav