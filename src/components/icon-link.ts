import m from 'mithril'
import './icon-link.sass'

interface IconLinkAttrs {
  icon: string
  name: string
  link: string
}

const IconLink: m.ClosureComponent<IconLinkAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('a', {
          class: 'icon-link',
          href: attrs.link,
          rel: 'noopener noreferer',
        }, [
          m('img', {
            class: 'icon-link-icon',
            src: attrs.icon,
            alt: attrs.name,
          }),
          m('span', attrs.name),
        ]),
      ]
    },
  }
}

export default IconLink
export { IconLinkAttrs }