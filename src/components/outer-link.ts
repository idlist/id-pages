import m from 'mithril'
import './outer-link.sass'

import icon_link from '@/assets/outer-link.svg'

interface OuterLinkAttrs {
  link: string
}

const OuterLink: m.ClosureComponent<OuterLinkAttrs> = () => {
  return {
    view({ attrs, children }) {
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
          m('span', children),
        ]),
      ]
    },
  }
}

export default OuterLink