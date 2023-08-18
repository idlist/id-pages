import m from 'mithril'
import './outer-link.sass'

import icon_link from '@/assets/outer-link.svg'

interface OuterLinkAttrs {
  link: string
}

const OuterLink: m.ClosureComponent<OuterLinkAttrs> = () => {
  return {
    view({ attrs, children }) {
      const hasChildren = (children as m.ChildArray).length != 0

      return [
        m('a', {
          class: 'outer-link',
          href: attrs.link,
          target: '_blank',
          rel: 'noopener noreferer',
        }, [
          m('img', {
            class: 'outer-link-icon',
            src: icon_link,
            alt: 'outer link',
          }),
          m('span', hasChildren ? children : attrs.link),
        ]),
      ]
    },
  }
}

export default OuterLink