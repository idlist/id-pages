import m from 'mithril'
import './about.sass'
import SectionTitle from '@/components/section-title'

import icon_un1c0de from '@/assets/links/un1c0de.png'

interface LinksListItem {
  site: string,
  icon: string,
  link: string
}

const LinksList: LinksListItem[] = [
  {
    site: 'UN1C0DE',
    icon: icon_un1c0de,
    link: 'https://un1c0de.xyz/',
  },
]

const About: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'About' }),
        m('div', { class: 'about-links' }, [
          m('div', { class: 'title' }, 'Links'),
          m('div', { class: 'contents' }, [
            ...LinksList.map((item) => [
              m('a', {
                class: 'contents-link',
                href: item.link,
                title: item.site,
                target: '_blank',
                rel: 'noopener noreferer',
              }, [
                m('img', {
                  class: 'contents-link-image',
                  src: item.icon,
                  alt: item.site,
                }),
              ]),
            ]),
          ]),
        ]),
      ]
    },
  }
}

export default About